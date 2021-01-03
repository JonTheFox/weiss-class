import React, {
	useReducer,
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import useLogg from "../hooks/useLogg.jsx";
import usePromiseKeeper from "../hooks/usePromiseKeeper.jsx";
import View from "../layout/View.jsx";
import Fab from "@material-ui/core/Fab";
import Mic from "@material-ui/icons/Mic";

import "./_ColorRecognizer.scss";

import { POSES } from "../../constants/poses.js";
import DURATIONS from "../../constants/durations.js";
import SplitText from "react-pose-text";

import { useTrail, animated } from "react-spring";

let animationFrame;
const label = "ColorRecognizer";

const CHAR_POSES = {
	exit: {
		opacity: 0,
		x: ({ charInWordIndex, numCharsInWord }) => {
			if (charInWordIndex < numCharsInWord / 2) {
				return "-100%";
			}
			return "100%";
		},

		y: ({ charInWordIndex }) => {
			if (charInWordIndex % 2 === 0) {
				return "-100%";
			}
			return "100%";
		},
		// color: ({ exitColor = COLORS.black }) => exitColor,
		transition: ({
			wordIndex,
			numWords,
			charIndex,
			numChars,
			charInWordIndex,
			numCharsInWord,
		}) => ({
			duration: DURATIONS.exit * 1,
		}),
	},

	enter: {
		opacity: 1,
		x: 0,
		y: 0,
		delay: ({
			wordIndex,
			numWords,
			charIndex,
			speechRate,
			delayPerWord = DURATIONS.enter * 0.1,
		}) => wordIndex * delayPerWord,
		transition: ({
			wordIndex,
			numWords,
			charIndex,
			numChars,
			charInWordIndex,
			numCharsInWord,
			appearDuration = DURATIONS.enter,
		}) => ({
			duration: appearDuration * 3,
			type: "spring",
			mass: 0.5,
		}),
	},
	drag: {
		y: 0,
		transition: ({ charInWordIndex }) => ({
			type: "spring",
			velocity: 150 * Math.sin(1 + charInWordIndex),
			damping: 0,
		}),
		// background: "rgba(257, 20, 0, 0)"
	},
	dragEnd: {
		y: 0,
		x: 0,
		transition: {
			type: "spring",
			damping: 10,
			stiffness: 750,
		},
	},
};

const colorSets = {
	//[dark, regular, light]
	red: { dark: "#990000", regular: "#cc0000", light: "#ff0000" },
	pink: { dark: "#ff30fb", regular: "#ff96fd", light: "#ffc9fe" },
	purple: { dark: "#3A188E", regular: "#7155C5", light: "#bf66ff" },
	blue: { dark: "#002699", regular: "#0040ff", light: "#668cff" },
	// green: { dark: "#00993d", regular: "#00ff66", light: "#66ffa3" },
	green: { dark: "#00993d", regular: "#00ff66", light: "#cfffc9" },
	// green: { dark: "#1afc00", regular: "#73ff63", light: "#cfffc9" },
	yellow: { dark: "#c9cc00", regular: "#fbff00", light: "#fdff66" },
	orange: { dark: "#cc7700", regular: "#ff9500", light: "#ffaa33" },
	gray: { dark: "#6f7173", regular: "#a2a4a6", light: "#d6d7d8" },
	grey: { dark: "#6f7173", regular: "#a2a4a6", light: "#d6d7d8" },

	// black: { dark: "#000000", regular: "#090808", light: "#242020" },
	black: { dark: "#000000", regular: "#2d2d2e", light: "#141414" },
	white: { dark: "#c5c6c7", regular: "#ffffff", light: "#ffffff" },
	brown: { dark: "#321a1a", regular: "#532c2c", light: "#974e4e" },
};

//main blob
const fast = { tension: 1200, friction: 40 };
//trailing blobs
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const COLORS_TYPES = ["dark", "regular", "light"];

const setCssVar = (varName, value) => {
	if (!varName || !value) {
		return "";
	}
	const { style } = document.documentElement;
	style.setProperty(`--${varName}`, value);
};

const setColorSet = (colorName = "") => {
	const colorSet = colorSets[colorName.trim().toLowerCase()];
	if (!colorSet) return "";

	for (let colorType of COLORS_TYPES) {
		if (colorSet[colorType]) {
			setCssVar(`bg-color--${colorType}`, colorSet[colorType]);
		}
	}
};

const BG_COLOR_VAR_NAME = "--recognizedColor";

let speechRecognizer = {};

const ColorRecognizer = React.forwardRef((props, ref) => {
	const { rounds, onCorrect } = props;
	const [appUtils] = useContext(AppContext);
	const { our, request, pickRandomFrom, SpeechRecognizer, setCss } = appUtils;
	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });
	const recognizerRef = useRef({});
	const [transcript, setTranscript] = useState("");
	const [trail, set] = useTrail(3, () => ({
		xy: [0, 0],
		config: (i) => (i === 0 ? fast : slow),
	}));

	const setBgColor = (colorName) => {
		if (!colorName || !colorName.length) return null;
		animationFrame = window.requestAnimationFrame(() => {
			const _colorName = colorName?.trim();

			if (_colorName && colorSets[_colorName.toLowerCase()]) {
				setColorSet(_colorName);
			}
		});
	};

	const createSpeechRecognizer = useCallback(() => {
		const newSpeechRecognizer = new SpeechRecognizer(
			Object.keys(colorSets),
			{
				interimResults: true,
				continuous: true,
				refs: recognizerRef,
				onResult: ({ transcript, confidence }) => {
					const _transcript = transcript.toLowerCase();
					setTranscript(_transcript);
					setBgColor(_transcript);
				},
				onError: (recognition, errReason, err) => {
					loggError(err);
				},
				onSpeechStart: (recognition) => {
					// const msg =
					// 	"SpeechRecognizer has started to recognize speech.";
					// logg("onSpeechStart():", msg);
				},
				onSpeechEnd: (recognition) => {
					// const msg = "User stopped speaking";
					// logg("onSpeechEnd(): ", msg);
				},
				onEnd: (recognition) => {
					// const msg = "SpeechRecognizer has stopped listening.";
					// logg("onEnd(): ", msg);
				},
			}
		);

		return newSpeechRecognizer;
	});

	const startRecognition = useCallback((ev) => {
		// speechRecognizer
		// 	.listenFor({
		// 		onMatch: ({ transcript }) => {
		// 			//on every match

		// 			setBgColor(transcript.trim());
		// 			logg("onMatch: ", transcript);
		// 		},
		// 		onResult: ({ transcript, confidence }) => {
		// 			setTranscript(transcript.trim());
		// 			// setBgColor(transcript);
		// 		},
		// 		words: Object.keys(colorSets),
		// 		continuous: true,
		// 		interimResults: true,
		// 	})
		// 	.then((a, b) => {
		// 		//first match
		// 		logg("First MATCH! promise resolved");
		// 	});

		speechRecognizer.listen();
	});

	useEffect(() => {
		setColorSet("purple");
		setTranscript("purple");

		speechRecognizer = createSpeechRecognizer(SpeechRecognizer);

		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	return (
		<View className={clsx("ColorRecognizer")} ref={ref} id={label}>
			<div className="background fullsize"></div>

			<svg style={{ position: "absolute", width: 0, height: 0 }}>
				<filter id="goo">
					<feGaussianBlur
						in="SourceGraphic"
						result="blur"
						stdDeviation="30"
					/>
					<feColorMatrix
						in="blur"
						values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
					/>
				</filter>
			</svg>
			<div
				className="hooks-main"
				onMouseMove={(e) => set({ xy: [e.clientX, e.clientY] })}
			>
				{trail.map((props, index) => (
					<animated.div
						key={index}
						style={{ transform: props.xy.interpolate(trans) }}
					/>
				))}
			</div>

			{transcript && (
				<h2 className="title--colors centered">
					<SplitText
						charPoses={CHAR_POSES}
						wordPoses={POSES.word__draggable__remain}
						className={"letter stroke cursor--grab"}
					>
						{transcript}
					</SplitText>
				</h2>
			)}

			<Fab
				aria-label={"record-btn"}
				className={"record-btn"}
				color="primary"
				onClick={startRecognition}
			>
				<Mic className={clsx("record-icon", speechRecognizer.state)} />
			</Fab>
		</View>
	);
});

ColorRecognizer.propTypes = {
	rounds: PropTypes.object,
	onCorrect: PropTypes.func,
};

export default ColorRecognizer;
