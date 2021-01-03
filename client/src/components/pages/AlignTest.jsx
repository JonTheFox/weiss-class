import React, {
	useState,
	useContext,
	useCallback,
	useEffect,
	forwardRef,
	useRef
} from "react";

import PropTypes from "prop-types";
import clsx from "clsx";
import SVG from "react-inlinesvg";
import posed from "react-pose";
import Button from "@material-ui/core/Button";

import DURATIONS from "../../constants/durations.js";
import { AppContext } from "../../contexts/AppContext.jsx";

import "./_AlignTest.scss";

const label = "SageAdvice";
let promiseKeeper;
let logg;
let animationFrame;
let now, prevTime, startTime, elapsedTime, fpsInterval;
let frameCount = 0;

const alignElements = ({
	targetElem = {},
	movingElem = {},
	offsets = {},
	line = {}
}) => {
	const _target = targetElem.current;
	if (!_target) return null;
	const _movingElem = movingElem.current;
	if (!_movingElem) return null;
	const _line = line.current;
	if (!_line) return null;

	const movingElemStyle = _movingElem.style;
	const lineStyle = _line.style;

	const targetBox = _target.getBoundingClientRect();
	const movingBox = _movingElem.getBoundingClientRect();
	let targetProp;
	let newPosVal;

	try {
		for (let [offsetName, val] of Object.entries(offsets)) {
			if (!val) return;
			// if (offsetName === "top") targetProp = "height";
			// if (offsetName === "left") targetProp = "width";

			newPosVal =
				targetBox[offsetName] -
				targetBox["height"] -
				movingBox["height"] * 2 +
				"px";

			movingElemStyle[offsetName] = newPosVal;
			lineStyle[offsetName] = newPosVal;
			logg("alignElements(): newPosVal: ", newPosVal);
		}
	} catch (err) {
		return;
	}
};

const sagePath = "/characters/OldSageToRight.svg";
const Sage = forwardRef((props, ref) => (
	<SVG
		ref={ref}
		src={sagePath}
		cacheRequests={true}
		description="Sage Weiss"
		loader={() => <span>...</span>}
		onError={error => {
			logg(error.message);
		}}
		onLoad={(src, hasCache) =>
			logg("Loaded SVG file: ", src, ". Has cache: " + hasCache)
		}
		{...props}
	/>
));
const pressablePoses = {
	visible: {
		// skew: "0deg",
		opacity: 1,
		scale: 1,
		x: "0%",
		transition: { duration: 400 }
	},
	hidden: {
		// skew: "55deg",
		opacity: 0,

		transition: { duration: 250 }
	},
	left: {
		x: "-200%",
		transition: { duration: DURATIONS.enter }
	},
	pressable: true,
	press: { scale: 0.7, damping: 200 }
};

// const PosedSageWithRef = posed(Sage)(pressablePoses);
const Pressable = posed.div(pressablePoses);

const speechBubblePoses = {
	enter: {
		// skew: "0deg",
		opacity: 1,
		scale: 1,
		x: "0%",
		transition: { duration: 400 }
	},
	exit: {
		// skew: "55deg",
		opacity: 0,
		scale: 0,
		transition: { duration: 250 }
	},
	pressable: true,
	wiggle: { x: "10%" }
};
const AnimatedSpeechBubble = posed.div(speechBubblePoses);

const NUM_COLORS_USED = 5;

const SageAdvice = props => {
	const [appState] = useContext(AppContext);
	const { issy, Logger } = appState;
	logg = logg || new Logger({ label }).logg;
	const { getRandomColor, getRandomUpTo, PromiseKeeper } = issy;
	promiseKeeper = promiseKeeper || new PromiseKeeper({ label });

	const [showSpeechBubble, setShowSpeechBubble] = useState(false);
	const speechBubbleRef = useRef({});
	const sageRef = useRef(null);
	const mouthRef = useRef(null);
	const lineRef = useRef(null);
	const targetRef = useRef(null);
	const [showSage, setShowSage] = useState(true);

	const isSagePressed = useRef(false);

	const changeColors = useCallback(ev => {
		//change ALL colors
		const newColors = [];
		for (let i = 1; i < NUM_COLORS_USED + 1; i++) {
			let newColor;
			newColor = getRandomColor();
			newColors.push({ varIndex: i, color: newColor });
			document.body.style.setProperty(`--color-${i}`, newColor);
		}
		logg("New set of colors: ", newColors);
	});

	const [animationIsStopped, setAnimationIsStopped] = useState(false);

	const startAnimation = (fps = 60) => {
		fpsInterval = 1000 / fps;
		prevTime = Date.now();
		startTime = prevTime;

		animationFrame = window.requestAnimationFrame(() => {
			loop();
		});
	};

	const stopAnimation = () => {
		setAnimationIsStopped(true);
	};

	const loop = useCallback(() => {
		if (
			!targetRef.current.getBoundingClientRect ||
			!lineRef.current.getBoundingClientRect
		)
			return null;

		if (animationIsStopped) return "animation stopped";

		animationFrame = window.requestAnimationFrame(loop);

		// calc elapsed time since last loop
		now = Date.now();
		elapsedTime = now - prevTime;
		if (elapsedTime > fpsInterval) {
			if (isSagePressed.current) return;
			// Get ready for next frame by setting prevTime = now, but...
			// Also, adjust for fpsInterval not being multiple of 16.67
			prevTime = now - (elapsedTime % fpsInterval);

			//now draw next frame
			// const sageElementBox = targetRef.current.getBoundingClientRect();

			alignElements({
				targetElem: targetRef,
				movingElem: lineRef,
				offsets: { top: true },
				line: lineRef
			});

			// const sageSVG = sageRef.current;
			// if (!sageSVG) return;

			//alignElements()

			// const sageElementBox = sageRef.current.getBoundingClientRect();

			//const mouth = sageSVG.querySelector("rect#mouth");
			// const afterMouth = mouth.after;
			// logg("afterMouth: ", afterMouth.style);
			//const mouthBox = mouth.getBoundingClientRect();

			// const mouthTop = mouth.top.toString().split(".")[0];

			// const sageTop = sageElementBox.top.toString().split(".")[0];
			// const mouthBottom = mouthBox.bottom;
			// const mouthBottomValue = `${mouthBottom}px`;
			// speechBubbleRef.current.style.bottom = mouthBottomValue;
			// logg("mouthBottom: ", mouthBottomValue);
			// const speechBubbleElementBox = speechBubbleRef.current.getBoundingClientRect();
			// speechBubbleRef.current.style.top = `${sageTop}px`;

			// TESTING...Report #seconds since start and achieved fps.
			// const sinceStart = now - startTime;
			// const currentFps =
			// 	Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
			// logg(
			// 	"Elapsed time= " +
			// 		Math.round((sinceStart / 1000) * 100) / 100 +
			// 		" secs @ " +
			// 		currentFps +
			// 		" fps."
			// );
		}
	});

	useEffect(() => {
		promiseKeeper.stall(1400).then(() => setShowSpeechBubble(true));

		return () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {
		// if (!sageRef || !sageRef.current) {
		// 	stopAnimation();
		// 	return;
		// }
		if (targetRef.current && (!mouthRef || !mouthRef.current)) {
			mouthRef.current = targetRef.current.querySelector("rect#mouth");
			setAnimationIsStopped(false);
			promiseKeeper.clearAll();
			promiseKeeper.every(1000, () => {
				const newTop =
					getRandomUpTo(
						Math.max(
							document.documentElement.clientWidth,
							window.innerWidth || 0
						)
					) + "px";
				logg("Target top: ", newTop);
				targetRef.current.style.top = newTop;
			});
			startAnimation();
			return;
		}

		return () => {
			window.cancelAnimationFrame(animationFrame);
			stopAnimation();
		};
	}, [sageRef.current]);

	useEffect(() => {
		logg("isSagePressed.current: ", isSagePressed.current);
	}, [isSagePressed.current]);

	return (
		<div id={"align-test"}>
			<div className={"target circle"} ref={targetRef} />
			<div ref={lineRef} className={"line mouth"}>
				----
			</div>
		</div>
	);
};

SageAdvice.propTypes = {
	next: PropTypes.func,
	user: PropTypes.object
};

export default SageAdvice;
