import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AppContext } from "../../../contexts/AppContext.jsx";
import RealtimeEntrance from "./realtime.entrance.jsx";
import RealtimeClassroom from "./realtime.classroom.jsx";
import Classroom from "./Classroom/Classroom.js";
import Card from "../../partials/Card.jsx";
import WeissSpinner from "../../partials/WeissSpinner.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";
import View from "../../layout/View.jsx";

import ClassroomSelect from "./ClassroomSelect.page.jsx";

import "./_Realtime.scss";

import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";
import { useQuery, gql } from "@apollo/client";
import { GetSlides } from "../../../gql/queries/GetSlides";
import { GetRooms } from "../../../gql/queries/GetRooms";

import {
	// RecoilRoot,
	// atom,
	// selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import roomsState from "../../../store/rooms.atom.js";
import roomState from "../../../store/room.atom.js";
import socketState from "../../../store/socket.atom.js";
import userState from "../../../store/user.atom.js";
import clientState from "../../../store/client.atom.js";
import socketConnectionState from "../../../store/socketConnection.atom.js";
import { CONNECTION_STATES } from "../../../store/CONNECTION_STATES.js";
import * as io from "socket.io-client";
import { localStorage } from "../../../lib/issy/index.js";

const label = "RealtimeIndex";
const SECTION_ROUTE = `rt/`;
const LOCAL_STORAGE_KEY = "weissClass";

// const _user = {
// 	email: "Jonny-Weiss@protonmail.com",
// 	first_name: "Jonathan",
// 	last_name: "Weiss",
// 	password: "Philo4ce1",
// 	role: "admin",
// };

const getUserFromLocalStorage = () => {
	// localStorage.setObj(LOCAL_STORAGE_KEY, _user);
	const user = localStorage.getObj(`${LOCAL_STORAGE_KEY}__user`);
	return user;
};
const setUserInLocalStorage = (_user) => {
	localStorage.setObj(`${LOCAL_STORAGE_KEY}__user`, _user);
	const user = localStorage.getObj(LOCAL_STORAGE_KEY);
	return user;
};

let isSocketInitialized = false;

const Realtime = (props) => {
	const [appUtils] = useContext(AppContext);
	const { PromiseKeeper, Logger, getUniqueString, CLIENT_ONLY } = appUtils;

	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const refs = useRef({ viewRef: {} });

	const { loading, error, data } = useQuery(GetRooms);

	const setRooms = useSetRecoilState(roomsState);
	const [room, setRoom] = useRecoilState(roomState);
	const setSocket = useSetRecoilState(socketState);
	const setUser = useSetRecoilState(userState);
	const user = useRecoilValue(userState);
	const [client, setClient] = useRecoilState(clientState);

	const getClientIdFromLocalStorage = (clientId) => {
		//pass null to logout
		localStorage.setObj(LOCAL_STORAGE_KEY + "__clientId", user);
	};

	useEffect(() => {
		const localStorageUser = getUserFromLocalStorage();
		setUser(localStorageUser);
	}, []);

	useEffect(() => {
		if (data?.rooms) {
			setRooms(data.rooms);
		}
	}, [data]);

	const initSocket = useCallback(({ user }) => {
		try {
			if (!user) {
				logg(`no user in initsocket(): `, user);
				throw new Error(`no user provided`);
			}
			const { email, password, role, first_name, last_name } = user;

			// setConnecting(true);
			// setFeedbackType("idle");

			const socket = io("/classrooms");

			promiseKeeper.stall(10 * 1000, "connection timeout").then(() => {
				//if connected, this promise will not resolve and the callback will not execute
				// setConnectionStatus(CONNECTION_STATES.IDLE);
				// setServerMsg(
				// 	"Could not connect for some reason. Please check your internet connection and try again."
				// );
			});

			socket.on("userConnectedHandled", (serverMsg) => {
				const { content, sender, id } = serverMsg;
				// setConnectionStatus(CONNECTION_STATES.CONNECTED);
				// animationFrame = window.requestAnimationFrame(() => {
				// 	setServerMsg(content);
				// });
			});

			socket.on("userIsAlreadyConnected", (serverMsg) => {
				const { content, sender, id } = serverMsg;

				// setServerMsg("We're already connected ;) ");
				// setConnectionStatus(CONNECTION_STATES.CONNECTED);
			});

			socket.on("re:client__selectsRoom", ({ classroom }) => {
				if (!classroom) {
					loggError(
						"client__selectsRoom: missing argument for classroom"
					);
					return;
				}

				setRoom(classroom);
			});

			socket.on("server__authedClient", ({ classrooms, clientId }) => {
				logg("server__authedClient", clientId);

				setClient((_client) => ({ ..._client, id: clientId }));
				setRooms(classrooms);
			});

			socket.on("connect", function(msg) {
				const content = `User ${email} has connected to realtime room.`;
				// setConnectionStatus(
				// 	CONNECTION_STATES.CONNECTING_FINAL_STAGE
				// );
				logg(content);

				socket.emit("userConnected", {
					content,
					email,
					password,
					// clientType: clientType.toLowerCase(),
				});

				socket.emit("client__providesCredentials", {
					user: {
						email,
						password,
						first_name,
						last_name,
						role,
					},
					// clientType: clientType.toLowerCase(),
					clientTypes: client.userTypes,
				});
			});

			socket.on("server__admitsToRoom", ({ room }) => {
				debugger;
			});

			socket.on("server__sendsSlideIndex", function(payload) {
				const { currentSlideIndex } = payload;
				const content = "Received slide: " + currentSlideIndex;
				logg(payload);
				debugger;
			});

			socket.on("server__sendsRooms", function(payload) {
				const { rooms } = payload;
				debugger;
				//todo : setRooms
				const content = "Received rooms: ";
				logg(content, rooms);
			});

			socket.on("disconnect", function(msg) {
				logg("Disconnected from realtime room. \n", msg);
				// setConnectionStatus(CONNECTION_STATES.DISCONNECTED);
			});
			socket.on("user joined", function(msg) {
				logg("A user joined the RTEntrance room. \n", msg);
			});

			return socket;
		} catch (err) {
			loggError(err.message);
			console.error(`error in initsocket(): `, err);
		}
	}, []);

	useEffect(() => {
		if (!user || isSocketInitialized) return;
		const socket = initSocket({
			user,
		});
		isSocketInitialized = true;
		setSocket(socket);
	}, [user]);

	const { location, match } = props.route;

	return (
		<Suspense fallback={<WeissSpinner />}>
			<Switch location={location}>
				<Route
					path={`${match.path}rt/classroom-select`}
					render={(route) => <ClassroomSelect route={route} />}
				/>
				<Route
					path={`${match.path}rt/classroom`}
					render={(route) => <Classroom route={route} />}
				/>
				<Route render={(route) => <RealtimeEntrance route={route} />} />
			</Switch>
		</Suspense>
	);
};

export default Realtime;
