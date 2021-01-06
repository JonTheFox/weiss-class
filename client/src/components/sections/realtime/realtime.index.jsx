import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useState,
	useCallback,
} from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AppContext } from "../../../contexts/AppContext.jsx";
import RealtimeEntrance from "./realtime.entrance.jsx";
import RealtimeClassroom from "./realtime.classroom.jsx";
import Card from "../../partials/Card.jsx";
import WeissSpinner from "../../partials/WeissSpinner.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";
import View from "../../layout/View.jsx";

import ClassroomSelect from "./ClassroomSelect.page.jsx";

import "./_Realtime.scss";

import { useQuery } from "@apollo/client";
import { GetRooms } from "../../../gql/queries/GetRooms";
import {
	// RecoilRoot,
	// atom,
	// selector,
	useRecoilState,
	useSetRecoilState,
	useRecoilValue,
} from "recoil";
import roomsState from "../../../store/rooms.atom.js";
import socketState from "../../../store/socket.atom.js";
// import { initSocket } from "../realtime/socketIOManager.js";
import * as io from "socket.io-client";
import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";

import socketConnectionState from "../../../store/socketConnection.atom.js";
import { CONNECTION_STATES } from "../../../store/CONNECTION_STATES.js";

let animationFrame;
// let logg;
// let loggError;
// let promiseKeeper;
const label = "RealtimeIndex";
// let socket;
// let clientID;

const SECTION_ROUTE = `classroom-select/`;

const Realtime = (props) => {
	const [appUtils, appState, setAppState] = useContext(AppContext);
	// const { user } = appState;
	// const { PromiseKeeper, Logger} = appUtils;

	//const refs = useRef({ viewRef: {} });

	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const { loading, error, data } = useQuery(GetRooms);
	const setRooms = useSetRecoilState(roomsState);
	const setSocket = useSetRecoilState(socketState);

	const [connectionStatus, setConnectionStatus] = useRecoilState(
		socketConnectionState
	);

	useEffect(() => {
		if (data?.rooms) {
			setRooms(data.rooms);
			logg("rooms:", data.rooms);
		}
	}, [data]);

	const { location, match } = props.route;

	const initSocket = useCallback(({ clientType = "student", user = {} }) => {
		try {
			const { email, password } = user;

			// setConnecting(true);
			// setFeedbackType("idle");
			const socket = io("/room");
			setSocket(socket);

			promiseKeeper.stall(10 * 1000, "connection timeout").then(() => {
				//if connected, this promise will not resolve and the callback will not execute
				setConnectionStatus(CONNECTION_STATES.IDLE);

				// setServerMsg(
				// 	"Could not connect for some reason. Please check your internet connection and try again."
				// );
			});

			socket.on("userConnectedHandled", (serverMsg) => {
				const { content, sender, id } = serverMsg;
				setConnectionStatus(CONNECTION_STATES.CONNECTED);
				animationFrame = window.requestAnimationFrame(() => {
					// setServerMsg(content);
				});
			});

			socket.on("userIsAlreadyConnected", (serverMsg) => {
				const { content, sender, id } = serverMsg;

				// setServerMsg("We're already connected ;) ");
				setConnectionStatus(CONNECTION_STATES.CONNECTED);
			});

			socket.on("connect", function(msg) {
				const content = `User ${email} has connected to realtime room.`;
				setConnectionStatus(CONNECTION_STATES.CONNECTING_FINAL_STAGE);
				logg(content);

				socket.emit("userConnected", {
					content,
					email,
					password,
					clientType: clientType.toLowerCase(),
				});
			});
			socket.on("disconnect", function(msg) {
				logg("Disconnected from realtime room. \n", msg);
				// setConnectionStatus(CONNECTION_STATES.DISCONNECTED);
			});
			socket.on("user joined", function(msg) {
				logg("A user joined the RTEntrance room. \n", msg);
			});
		} catch (err) {
			loggError(err.message);
		}
	}, []);

	useEffect(() => {
		const socket = io("/classrooms");
		appState.socketIO = { socket };
		appState.socket = socket;
		initSocket({ user: appState.user, setAppState });
	}, []);

	return (
		<Suspense fallback={<WeissSpinner />}>
			<Switch location={location}>
				<Route
					path={`/${SECTION_ROUTE}classroom`}
					render={(route) => <ClassroomSelect />}
				/>
				<Route render={(route) => <RealtimeEntrance route={route} />} />
			</Switch>
		</Suspense>
	);
};

export default Realtime;
