import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	Suspense,
	useCallback,
	Fragment,
	lazy,
} from "react";

import { AppContext } from "../../contexts/AppContext.jsx";

//import PropTypes from "prop-types";
// import clsx from "clsx";

import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";
import { useQuery, gql } from "@apollo/client";
import { GetSlides } from "../../gql/queries/GetSlides";
import { GetRooms } from "../../gql/queries/GetRooms";
import {
	// atom,
	// selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import roomsState from "../../store/rooms.atom.js";
import roomState from "../../store/room.atom.js";
import socketState from "../../store/socket.atom.js";
import userState from "../../store/user.atom.js";
import clientState from "../../store/client.atom.js";
import lessonState from "../../store/lesson.atom.js";
import refsState from "../../store/refs.atom.js";
import socketConnectionState from "../../store/socketConnection.atom.js";
import { CONNECTION_STATES } from "../../store/CONNECTION_STATES.js";
import * as io from "socket.io-client";
import { localStorage } from "../../lib/issy/index.js";
import VideoPlayer from "../VideoPlayer/VideoPlayer.jsx";
import LOCAL_STORAGE_KEY from "../../constants/localStorageKey.js";
import { ParallaxProvider } from "react-scroll-parallax";
import LogoScreen from "../../pages/LogoScreen/LogoScreen.jsx";
import ErrorBoundary from "../../pages/ErrorPage/ErrorPage.jsx";
import "./_RealtimeManager.scss";
import ENDPOINTS from "../../AJAX/ajax-endpoints.js";
import {
	studentActions,
	teacherActions,
	platformActions,
} from "./clientActionTypes";
import { Teacher } from "./clientTypes.js";
import clsx from "clsx";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FavoriteIcon from "@material-ui/icons/Favorite";

import FeedbackContent from "./FeedbackContent.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseRoute = "/";
const label = "RealtimeIndex";
const SECTION_ROUTE = `rt/`;

let isSocketInitialized = false;

const CLIENT_STORAGE_KEY = `${LOCAL_STORAGE_KEY}__client`;
const USER_STORAGE_KEY = `${LOCAL_STORAGE_KEY}__user`;

const Realtime = (props) => {
	const [appUtils] = useContext(AppContext);
	const {
		PromiseKeeper,
		Logger,
		getUniqueString,
		CLIENT_ONLY,
		getRandomUpTo,
		request,
	} = appUtils;

	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const refs = useRef({ viewRef: {} });

	// const { loading, error, data } = useQuery(GetRooms);

	const setRooms = useSetRecoilState(roomsState);
	const [room, setRoom] = useRecoilState(roomState);

	const [socket, setSocket] = useRecoilState(socketState);
	const [user, setUser] = useRecoilState(userState);
	const setLesson = useSetRecoilState(lessonState);
	const [client, setClient] = useRecoilState(clientState);
	const { slides } = useRecoilValue(lessonState);

	const keepServersAwake = useCallback(async (serversUris = []) => {
		try {
			let ninjaCode = 0;
			return promiseKeeper.every(
				5 * 1000,
				() => {
					ninjaCode = getRandomUpTo(100);
					Object.values(serversUris).map(async (serverUri) => {
						const postNinjaCode = await request("POST", serverUri, {
							ninjaCode,
						});
					});
				},
				"keepServerAwake"
			);
		} catch (err) {
			loggError(err);
		}
	}, []);

	const toastNotification = useCallback(
		async ({ actionName, teacher, bodyText, actions }) => {
			const _bodyText = bodyText || actions[actionName]?.bodyText;
			const acts = actions;
			if (!_bodyText) {
				loggError("no body text");
				return null;
			}
			toast(_bodyText, {
				position: "top-left",
				autoClose: 6000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				className: `toast--${actionName}`,
			});
		},
		[]
	);

	useEffect(() => {
		if (user) return;
		const localStorageUser = localStorage.getObj(USER_STORAGE_KEY);
		setUser(localStorageUser);
		const localStorageClient = localStorage.getObj(CLIENT_STORAGE_KEY);
		setClient(localStorageClient);
		const promiseTokeepServerAwake = keepServersAwake([
			ENDPOINTS.ninjaCode.POST.ninjaCodeUser.path,
			ENDPOINTS.ninjaCode.POST.ninjaCodeDomestic.path,
		]);

		return () => {
			promiseTokeepServerAwake.reject("component unmounts");
		};
	}, []);

	useEffect(() => {
		localStorage.setObj(CLIENT_STORAGE_KEY, client);
		refs.current.client = client;
		logg("client: ", client);
	}, [client]);

	useEffect(() => {
		localStorage.setObj(USER_STORAGE_KEY, user);
		refs.current.user = user;
		logg("user: ", user);
	}, [user]);

	useEffect(() => {
		localStorage.setObj("room", room);
		refs.current.room = room;
		logg("room: ", room);
	}, [room]);

	// useEffect(() => {
	// 	if (data?.rooms) {
	// 		setRooms(data.rooms);
	// 		logg("rooms: ", data.rooms);
	// 	}
	// }, [data]);

	const initSocket = useCallback(({ user }) => {
		try {
			if (!user) {
				console.log(`no user in initsocket(): `, user);
				throw new Error(`no user provided`);
			}
			const { email, password, role, first_name, last_name } = user;

			// setConnecting(true);
			// setFeedbackType("idle");

			const socket = io("/classrooms");

			// promiseKeeper.stall(10 * 1000, "connection timeout").then(() => {
			// 	//if connected, this promise will not resolve and the callback will not execute
			// 	// setConnectionStatus(CONNECTION_STATES.IDLE);
			// 	// setServerMsg(
			// 	// 	"Could not connect for some reason. Please check your internet connection and try again."
			// 	// );
			// });

			socket.on("server__failedAuth", ({ error }) => {
				debugger;
				// setConnectionStatus(CONNECTION_STATES.CONNECTED);
				// animationFrame = window.requestAnimationFrame(() => {
				// 	setServerMsg(content);
				// });
			});

			socket.on("re:client__selectsRoom", ({ classroom, lesson }) => {
				if (!classroom) {
					loggError(
						"client__selectsRoom: Did not receive a classroom"
					);
					return;
				}
				setRoom(classroom);
			});

			socket.on("server__authedClient", ({ classrooms, client }) => {
				logg("server__authedClient", client);

				setClient((_client) => ({ ..._client, id: client.id }));
				setRooms(classrooms);
			});

			socket.on("server__setsState", ({ state, stateName }) => {
				switch (stateName) {
					case "lesson":
						setLesson(state);
						break;
					case "rooms":
						setRooms(state);
						break;
					case "room":
						setRoom(state);
						break;
					case "user":
						setUser(state);
						break;
					case "client":
						setClient(state);
						break;
				}
				logg(`server__setsState: ${stateName} state is now ${state}`);
			});

			socket.on("server__teacherSendsAction", (payload) => {
				toastNotification({ ...payload, actions: teacherActions });
			});
			socket.on("server__studentSendsAction", (payload) => {
				toastNotification({ ...payload, actions: studentActions });
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
					clientType: client.type,
				});
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
		try {
			if (isSocketInitialized || !user) return;
			const _socket = initSocket({
				user,
			});
			isSocketInitialized = true;
			setSocket(_socket);
		} catch (err) {
			console.log(err);
		}
	}, [user]);

	return (
		<React.Fragment>
			<ToastContainer
				position="top-left"
				autoClose={6000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			{props.children}
		</React.Fragment>
	);
};

export default Realtime;
