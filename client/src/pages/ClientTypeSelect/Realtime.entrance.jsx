import React, {
	useState,
	useContext,
	useEffect,
	useCallback,
	useRef,
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import clsx from "clsx";
import posed, { PoseGroup } from "react-pose";
import DURATIONS from "../../constants/durations.js";
import View from "../../components/layout/View.jsx";
import PieChart from "../../components/PieChart/PieChart.jsx";

import { useRecoilState, useRecoilValue } from "recoil";

import userState from "../../store/user.atom.js";
import isSoundOnState from "../../store/isSoundOn.selector.js";
import socketState from "../../store/socket.atom.js";
import socketConnectionState from "../../store/socketConnection.atom.js";
import clientState from "../../store/client.atom.js";
import { CONNECTION_STATES } from "../../store/CONNECTION_STATES.js";

import "./Realtime.entrance.jsx";

import Heading from "../../components/Heading/Heading.js";

import { Howl, Howler } from "howler";
import { mainClickSound } from "../../constants/sounds.js";
import Container from "@material-ui/core/Container";
import "./_ClientTypeSelect.scss";

const scaleInPoses = {
	enter: {
		scale: 1,
		rotateZ: "0deg",
		opacity: 1,
		transition: { duration: 400 },
	},
	exit: {
		scale: 0,
		rotateZ: "12deg",
		opacity: 0,
		transition: { duration: 400 },
	},
};
const ScaleIn = posed.div(scaleInPoses);

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
	const { route } = props;
	const { match, location, history } = route;
	const [appUtils, appState, setAppState] = useContext(AppContext);
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

	const user = useRecoilValue(userState);
	const isSoundOn = useRecoilValue(isSoundOnState);

	const [feedback, setFeedback] = useState("");
	const [connectionStatus, setConnectionStatus] = useRecoilState(
		socketConnectionState
	);
	const [isPieActive, setIsPieActive] = useState(false);
	const [showRooms, setShowRooms] = useState(false);
	const [showPieChart, setShowPieChart] = useState(false);
	const [pieReveal, setPieReveal] = useState(100);
	const [pieData, setPieData] = useState(props.pieData || initialPieData);
	const [piePaddingAngle, setPiePaddingAngle] = useState(2);

	const [client, setClient] = useRecoilState(clientState);

	const socket = useRecoilValue(socketState);

	const [showHeading, setShowHeading] = useState(false);
	const [showGlass, setShowGlass] = useState(false);

	const [animatedSegmentIndex, setAnimatedSegmentIndex] = useState(0);

	const [hideElements, setHideElements] = useState(false);

	// const refs = useRecoilValue(refsState);

	const navigateToClassroomSelect = useCallback((delay = 0) => {
		logg("About to navigate to classroom");
		promiseKeeper.stall(delay, "navigate to classroom").then(() => {
			navigateTo(`/classroom-select`, history);
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

		promiseKeeper.stall(0.5 * 1000, "show PieChart").then(() => {
			setShowPieChart(true);
			promiseKeeper.stall(1 * 1000, "show glass").then(() => {
				setShowGlass(true);
			});
		});

		promiseKeeper.stall(PIE_ENTER_DURATION).then(() => {
			setConnectionStatus(CONNECTION_STATES.IDLE);
		});

		return () => {
			window.cancelAnimationFrame(animationFrame);

			promiseKeeper.rejectAll();
		};
	}, []);

	useEffect(() => {
		// refs.current.connectionStatus = connectionStatus;
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

						debugger;
						// navigateToClassroomSelect();
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
				debugger;

				setShowGlass(true);
				// animationFrame = window.requestAnimationFrame(() => {
				// return navigateToClassroomSelect();
				// });
				promiseKeeper
					.stall(DURATIONS.enter * 1, "hide PieChart")
					.then(() => {
						setShowPieChart(false);
						promiseKeeper
							.stall(1 * 1000, "navigate to classroom")
							.then(() => {
								//debugger;
								// navigateToClassroomSelect(DURATIONS.enter * 1);
							});
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
				<Container maxWidth="sm">
					<ScaleIn
						initialPose="exit"
						pose={hideElements ? "exit" : "enter"}
					>
						<Heading h="1">What are you, exactly?</Heading>
					</ScaleIn>
				</Container>
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
						className={clsx(showGlass && "glass-container")}
						animateSelected={
							animatedSegmentIndex > 0 ||
							Boolean(
								[
									CONNECTING,
									ENTERING_ROOM,
									ENTERED_ROOM,
									ALREADY_INSIDE_ROOM,
								].includes(connectionStatus)
							)
						}
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

							isSoundOn && mainClickSound.play();

							if (!user) {
								loggError(
									"Cannot connect to socket without being logged in."
								);
								return navigateTo("./login", history);
							}

							const type = title?.toLowerCase() ?? "";

							setClient((_client) => ({
								..._client,
								type,
							}));

							//animate the selected section of PieChart
							setAnimatedSegmentIndex(sectionIndex + 1);

							promiseKeeper
								.stall(1000 * 0.2, "hide glass")
								.andThen(() => {
									setShowGlass(false);

									promiseKeeper
										.stall(1 * 1000, "hide pie chart")
										.then(() => {
											setShowPieChart(false);
											setHideElements(true);

											navigateToClassroomSelect(
												DURATIONS.enter * 1
											);
										});
								});

							// setConnectionStatus(CONNECTION_STATES.ENTERED_ROOM);
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
