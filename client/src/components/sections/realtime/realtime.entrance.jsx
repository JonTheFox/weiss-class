import React, {
	useState,
	useContext,
	useEffect,
	useCallback,
	useRef,
} from "react";
import { AppContext } from "../../../contexts/AppContext.jsx";

//import PropTypes from "prop-types";
import clsx from "clsx";

// import SendIcon from "@material-ui/icons/Send";
import posed, { PoseGroup } from "react-pose";
// import { POSES, BASE_POSES } from "../../constants/poses.js";
// import TextField from "@material-ui/core/TextField";
// import IconButton from "@material-ui/core/IconButton";
// import FlightTakeoff from "@material-ui/icons/FlightTakeoff";

import DURATIONS from "../../../constants/durations.js";
import View from "../../layout/View.jsx";
import PieChart from "../../partials/PieChart.jsx";
import "./_Realtime.scss";

import {
	// RecoilRoot,
	// atom,
	// selector,
	useRecoilState,
	useRecoilValue,
} from "recoil";
import roomsState from "../../../store/rooms.atom.js";
import socketState from "../../../store/socket.atom.js";
import socketConnectionState from "../../../store/socketConnection.atom.js";
import { CONNECTION_STATES } from "../../../store/CONNECTION_STATES.js";

let animationFrame;
let logg;
let socketIOlogg;
let loggError;
let promiseKeeper;
const label = "RTEntrance";

let clientID;

const PIE_ENTER_DURATION = DURATIONS.enter * 2;
const CONNECTION_TIMEOUT_MS = 10 * 1000;

const pieChartPoses = {
	enter: {
		opacity: 1,
		// x: "0vw",
		rotateZ: "0deg",
		//delay: DURATIONS.enter * 4,
		scale: 1,
		transition: {
			duration: PIE_ENTER_DURATION,
			type: "spring",
			damping: 200,
			stiffness: 100,
		},
	},
	exit: {
		opacity: 0,
		// x: "100vw",
		rotateZ: "270deg",
		scale: 0,
		delay: 0,

		transition: {
			duration: DURATIONS.enter,
			type: "spring",
			delay: 0,
		},
	},
};

const PosedPieContainer = posed.div(pieChartPoses);

const titlePoses = {
	enter: {
		opacity: 1,
		x: "0vw",
		scale: 1,
		delay: DURATIONS.enter * 2,
		// scale: 1,
		transition: {
			duration: DURATIONS.enter,
			delay: 0,
			type: "spring",
			stiffness: 100,
			mass: 0.25,
		},
	},
	exit: {
		opacity: 0,
		x: "100vw",
		scale: 0,
		delay: 0,
		transition: {
			duration: DURATIONS.exit,
			delay: 0,
		},
	},
};

const PosedTitle = posed.div(titlePoses);

const feedbackPoses = {
	enter: {
		opacity: 1,
		rotateY: "0deg",
		// scale: 1,
		// scale: 1,
		transition: {
			duration: DURATIONS.enter,
		},
	},
	exit: {
		opacity: 0,
		delay: 0,
		rotateY: "180deg",
		// scale: 0,
		transition: {
			duration: DURATIONS.exit,
			delay: 0,
		},
	},
};

const PosedFeedback = posed.div(feedbackPoses);

const initialPieData = [
	{
		color: "var(--primary)",
		title: "Student",
		value: 50,
	},
	{
		// color: "var(--primary)",
		color: "var(--secondary)",
		title: "Teacher",
		value: 30,
	},

	{
		color: "var(--canvas)",
		title: "Platform",
		value: 20,
	},
];

const CONNECTION_TIMEOUT_LABEL = "connectionTimeout";

const RTEntrance = (props) => {
	const [appUtils, appState, setAppState] = useContext(AppContext);

	const { route } = props;
	const { match, location, history } = route;
	const { user } = appState;
	const {
		PromiseKeeper,
		Logger,
		getUniqueString,
		CLIENT_ONLY,
		navigateTo,
		DEBUGGING,
	} = appUtils;

	const {
		IS_NOT_READY,
		IDLE,
		CONNECTING,
		ENTERING_ROOM,
		ALREADY_INSIDE_ROOM,
		ENTERED_ROOM,
		CONNECTION_FAILED,
		UNAUTHORIZED,
		DISCONNECTED,
	} = CONNECTION_STATES;

	const [feedback, setFeedback] = useState("");
	const [connectionStatus, setConnectionStatus] = useRecoilState(
		socketConnectionState
	);
	const [isPieActive, setIsPieActive] = useState(false);
	const [showRooms, setShowRooms] = useState(false);
	const [showPieChart, setShowPieChart] = useState(true);
	const [pieReveal, setPieReveal] = useState(100);
	const [pieData, setPieData] = useState(props.pieData || initialPieData);
	const [piePaddingAngle, setPiePaddingAngle] = useState(2);

	const refs = useRef({ viewRef: {}, connectionStatus });

	const navigateToClassroom = useCallback((delay = 0) => {
		logg("About to navigate to classroom");
		promiseKeeper.stall(delay, "navigate to classroom").then(() => {
			navigateTo(`/rt/classroom-select`, history);
		});
	});

	useEffect(() => {
		const logger = new Logger({ label });
		logg = logger.logg;
		socketIOlogg = new Logger({
			label: "socketIOlogg",
			stylePreset: "orange",
		}).logg;
		loggError = logger.loggError;
		promiseKeeper = new PromiseKeeper({ label });
		clientID = getUniqueString();
		if (!appState.realtime) {
			loggError("No realtime state..?");
		} else {
			appState.realtime.clientID = clientID;
		}

		promiseKeeper.stall(PIE_ENTER_DURATION).then(() => {
			setConnectionStatus(CONNECTION_STATES.IDLE);
		});

		return () => {
			window.cancelAnimationFrame(animationFrame);
			promiseKeeper.rejectAll();
		};
	}, []);

	useEffect(() => {
		refs.current.connectionStatus = connectionStatus;
		let newFeedback = "";
		switch (connectionStatus) {
			case IS_NOT_READY:
				// setFeedback("");
				newFeedback = "";
				setIsPieActive(false);
				break;
			case IDLE:
				// setFeedback("");
				newFeedback = "";
				setIsPieActive(true);
				break;
			case CONNECTING:
				setIsPieActive(false);
				//setFeedback("Connecting..");
				newFeedback = "Connecting..";
				break;
			case ENTERING_ROOM:
				newFeedback = "Almost there..";
				// setFeedback("Almost there..");
				break;
			case ALREADY_INSIDE_ROOM:
				promiseKeeper.reject(
					CONNECTION_TIMEOUT_LABEL,
					"connection is active."
				);
				newFeedback = "We're already inside :) ";
				promiseKeeper
					.stall(DURATIONS.enter * 3, "hide pie chart")
					.then(() => {
						// setShowPieChart(false);

						// animationFrame = window.requestAnimationFrame(() => {
						navigateToClassroom();
					});

				// });
				return;
				break;
			case ENTERED_ROOM:
				newFeedback = "We're online! :D ";
				promiseKeeper.reject(
					CONNECTION_TIMEOUT_LABEL,
					"connection established"
				);
				// animationFrame = window.requestAnimationFrame(() => {
				// return navigateToClassroom();
				// });
				promiseKeeper
					.stall(DURATIONS.enter * 1, "hide pie chart")
					.then(() => {
						setShowPieChart(false);

						navigateToClassroom(DURATIONS.enter * 1);
					});
				return;
				break;
			case CONNECTION_FAILED:
				// setFeedback(
				// 	"Could not connect. \nPlease check your internet connection and try again."
				// );
				newFeedback =
					"Could not connect. \nPlease check your internet connection and try again.";
				setIsPieActive(true);
				promiseKeeper.stall(12 * 1000).then(() => {
					setConnectionStatus(IDLE);
				});
				break;
			case UNAUTHORIZED:
				newFeedback = "You are not authorized to enter :O ";
				//todo: nav to login page
				setIsPieActive(true);
				promiseKeeper.stall(12 * 1000).then(() => {
					setConnectionStatus(IDLE);
				});
				break;

			case DISCONNECTED:
				// setFeedback("...aaaand we're offline :P \nReconnecting...");
				newFeedback = "Reconnecting...";
				break;
			default:
				loggError("Unsupported connection status!");
				break;
		}
		setFeedback(newFeedback);
	}, [connectionStatus]);

	const rooms = useRecoilValue(roomsState);

	return (
		<View
			className={clsx(
				"realtime-entrance vh-max--portrait---minus-appbar",
				connectionStatus
			)}
			animate={false}
			fullsize={false}
		>
			<div
				className={clsx(
					"background",
					connectionStatus === CONNECTION_STATES.CONNECTING
						? "running"
						: "paused"
				)}
			></div>

			<div className={clsx("section section--header flex")}>
				<PosedTitle pose={"enter"} initialPose="exit">
					<h2>I am a...</h2>
				</PosedTitle>
			</div>
			<div
				className={clsx(
					"section section--room-list",
					showRooms && "showRooms"
				)}
			>
				<div className={clsx("room-list")}></div>
			</div>
			<div className={clsx("section section--pie")}>
				<PosedPieContainer
					className={clsx(
						"pie-container fullsize",
						[ENTERED_ROOM, ALREADY_INSIDE_ROOM].includes(
							connectionStatus
						) && "pause-children"
					)}
					pose={showPieChart ? "enter" : "exit"}
					initialPose="exit"
				>
					<PieChart
						active={isPieActive}
						reveal={pieReveal}
						startReveal={pieReveal}
						paddingAngle={piePaddingAngle}
						className={"stroke--children"}
						animateSelected={Boolean(
							[
								CONNECTING,
								ENTERING_ROOM,
								ENTERED_ROOM,
								ALREADY_INSIDE_ROOM,
							].includes(connectionStatus)
						)}
						showHoverAnimation={Boolean(
							[IDLE].includes(connectionStatus)
						)}
						data={pieData}
						onClick={({ chartData, sectionIndex, title }) => {
							if (
								[ENTERED_ROOM, ALREADY_INSIDE_ROOM].includes(
									connectionStatus
								)
							) {
								return;
							}
							if (!appState.user) {
								loggError(
									"Cannot connect to socket without being logged in. TODO: navigate to login page"
								);
								return;
							}
							logg(
								"initiating socket.io",
								sectionIndex,
								chartData
							);
							logg("selected user type: " + title);
							setAppState((state) => {
								state.realtime.userTypes = [title];
								return state;
							});

							setConnectionStatus(CONNECTION_STATES.ENTERED_ROOM);

							// initSocketIO(title);
						}}
					></PieChart>
				</PosedPieContainer>
			</div>
			<div className={clsx("section section--feedback flex")}>
				<PoseGroup>
					{connectionStatus !== CONNECTION_STATES.IDLE && (
						<PosedFeedback key="server-msg--container">
							<pre
								className={clsx(
									"server-msg--container wrap-entire-lines",
									connectionStatus
								)}
							>
								{feedback}
							</pre>
						</PosedFeedback>
					)}
				</PoseGroup>
			</div>
		</View>
	);
};

export default RTEntrance;
