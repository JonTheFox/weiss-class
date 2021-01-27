import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	Suspense,
	useCallback,
	Fragment,
} from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext.jsx";
import ClientTypeSelect from "../../pages/ClientTypeSelect/Realtime.entrance.jsx";
import Classroom from "../Classroom/Classroom.js";
import Card from "../Card/Card.jsx";
import WeissSpinner from "../WeissSpinner/WeissSpinner.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";
import View from "../layout/View.jsx";
import ClassroomSelect from "../../pages/ClassroomSelect/ClassroomSelect.page.jsx";
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
import "./_RealtimeManager.scss";

const CLOUD_VIDEOS = [
	// {
	// 	title: "from Pexels",
	// 	url:
	// 		"https://player.vimeo.com/external/331114247.sd.mp4?s=774a9cd251c1df88f5f031864a7b66dcdd393837&profile_id=164&oauth2_token_id=57447761",
	// 	stopSecond: 10,
	// },
	{
		title: "Flying Above the Clouds",
		url: "https://www.youtube.com/watch?v=6AJl7DsL-1Y",
		startSecond: 15,
		stopSecond: 60 * 5 + 50,
	},

	{
		title: "Flying into clouds, above clouds and around clouds",
		url: "https://www.youtube.com/watch?v=VmMYfAR21KY",
	},
];

const label = "RealtimeIndex";
const SECTION_ROUTE = `rt/`;

let isSocketInitialized = false;

const CLIENT_STORAGE_KEY = `${LOCAL_STORAGE_KEY}__client`;
const USER_STORAGE_KEY = `${LOCAL_STORAGE_KEY}__user`;

const Realtime = (props) => {
	const [appUtils] = useContext(AppContext);
	const { PromiseKeeper, Logger, getUniqueString, CLIENT_ONLY } = appUtils;

	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const refs = useRef({ viewRef: {} });

	// const { loading, error, data } = useQuery(GetRooms);

	const setRooms = useSetRecoilState(roomsState);
	const [room, setRoom] = useRecoilState(roomState);
	const setSocket = useSetRecoilState(socketState);
	const setUser = useSetRecoilState(userState);
	const setLesson = useSetRecoilState(lessonState);
	const user = useRecoilValue(userState);
	const [client, setClient] = useRecoilState(clientState);
	const { slides } = useRecoilValue(lessonState);
	const [video, setVideo] = useState(CLOUD_VIDEOS[0]);

	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (user) return;
		const localStorageUser = localStorage.getObj(USER_STORAGE_KEY);
		setUser(localStorageUser);
		const localStorageClient = localStorage.getObj(CLIENT_STORAGE_KEY);
		setClient(localStorageClient);
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
		try {
			if (isSocketInitialized || !user) return;
			const socket = initSocket({
				user,
			});
			isSocketInitialized = true;
			setSocket(socket);
			console.log("passed without an error!!!!");
		} catch (err) {
			console.log(err);
		}
	}, [user]);

	const { location, match } = props.route;
	return (
		<Fragment>
			<VideoPlayer
				style={{ position: "absolute", zIndex: -1 }}
				controls={false}
				noInteraction={true}
				light={false}
				playing={true}
				muted={true}
				volume={0}
				video={video}
				scaleToFitViewport={true}
				startSecond={video.startSecond || 0}
				stopSecond={video.stopSecond}
				onPlay={() => {
					setIsPlaying(true);
				}}
			></VideoPlayer>
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
					<Route
						render={(route) => <ClientTypeSelect route={route} />}
					/>
				</Switch>
			</Suspense>
		</Fragment>
	);
};

export default Realtime;