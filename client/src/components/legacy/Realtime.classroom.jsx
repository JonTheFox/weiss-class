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
import * as io from "socket.io-client";
// import SendIcon from "@material-ui/icons/Send";
import posed, { PoseGroup } from "react-pose";
// import { POSES, BASE_POSES } from "../../constants/poses.js";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";

import DURATIONS from "../../../constants/durations.js";
import View from "../../layout/View.jsx";
import PieChart from "../../partials/PieChart.jsx";
import "./_Realtime.scss";

let animationFrame;
let logg;
let loggError;
let promiseKeeper;
const label = "RTEntrance";
let socket;
let clientID;

const titlePoses = {
	enter: {
		opacity: 1,
		x: "0vw",
		scale: 1,
		delay: DURATIONS.enter * 0,
		// scale: 1,
		transition: {
			duration: DURATIONS.enter,
		},
	},
	exit: {
		opacity: 0,
		x: "-100vw",
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
		scale: 1,
		// scale: 1,
		transition: {
			duration: DURATIONS.enter,
		},
	},
	exit: {
		opacity: 0,
		delay: 0,
		rotateY: "180deg",
		scale: 0,
		transition: {
			duration: DURATIONS.exit,
			delay: 0,
		},
	},
};

const PosedFeedback = posed.div(feedbackPoses);

const CONNECTION_STATES = {
	IDLE: "isIdle",
	CONNECTING: "isConnecting",
	CONNECTING_FINAL_STAGE: "isEnteringRoom",
	CONNECTED: "isConnected",
	DISCONNECTED: "isDisconnected",
};

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
	} = appUtils;

	const [serverMsg, setServerMsg] = useState("");
	const [connectionStatus, setConnectionStatus] = useState(
		CONNECTION_STATES.IDLE
	);
	const [connecting, setConnecting] = useState(false);
	const [feedbackType, setFeedbackType] = useState("");

	const refs = useRef({ viewRef: {} });

	const navigateToClassroom = useCallback(() => {
		logg("About to navigate to classroom");
		promiseKeeper
			.stall(DURATIONS.exit, "navigate to classroom")
			.then(() => {
				navigateTo(`${match.path}/classroom`, history);
			});
	});

	useEffect(() => {
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;
		promiseKeeper = new PromiseKeeper({ label });
		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {
		logg("Socket connectionStatus: ", connectionStatus);
		if (connectionStatus === CONNECTION_STATES.IDLE) {
			setServerMsg("");
		}
		if (connectionStatus === CONNECTION_STATES.CONNECTING) {
			setServerMsg("Connecting..");
		}
		if (connectionStatus === CONNECTION_STATES.CONNECTING_FINAL_STAGE) {
			setServerMsg("Almost there..");
		}
		if (connectionStatus === CONNECTION_STATES.CONNECTED) {
			setServerMsg("We're online :) ");
			navigateToClassroom();
		}
		if (connectionStatus === CONNECTION_STATES.DISCONNECTED) {
			setServerMsg(`...aaaand we're offline :P `);
		}
	}, [connectionStatus]);

	// useEffect(() => {
	// 	logg("connecting to socket: ", connecting);
	// }, [connecting]);

	return (
		<View
			className={clsx("realtime-classroom", connecting && "connecting")}
			animate={false}
			ref={refs.current.viewRef}
		>
			<div className={clsx("background")}></div>

			<div className={clsx("section section--header flex")}>
				<h1>Real-Time Session</h1>
				<PosedTitle pose={"enter"} initialPose="exit">
					<h2>What kind of user are you?</h2>
				</PosedTitle>
			</div>
			<div className={clsx("section section--pie")}>
				<div>classroom</div>
			</div>
			<div className={clsx("section section--feedback flex")}>
				{serverMsg && (
					<PosedFeedback>
						<div
							className={clsx(
								"server-msg--container",
								connectionStatus
							)}
						>
							{serverMsg}
						</div>
					</PosedFeedback>
				)}
			</div>
		</View>
	);
};

export default RTEntrance;
