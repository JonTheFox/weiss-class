import React, { useState, useEffect, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { AppContext } from "../../contexts/AppContext";
import phaseReducer, { initPhaseReducer } from "../../reducers/phaseReducer.js";
import EMOJIS from "../../items/animal-emojis";
import "./_EmojiCarousel.scss";

const emojiPoses = {
	getReady: {
		opacity: 0,
		rotateY: "90deg",
		x: "-50vw",
		rotateZ: 20
	},
	moveRight: {
		opacity: 1,
		x: "0vw",
		rotateY: "180deg",
		transition: {
			type: "tween",
			duration: 500,
			stiffness: 40,
			mass: 1.2
		},
		rotateZ: 0
	},
	turnLeft: {
		x: "10vw",
		rotateY: "0deg",
		transition: {
			type: "spring",
			duration: 400
		},
		rotateZ: 0
	},
	moveLeft: {
		x: "-15vw",
		rotateY: "180deg",
		transition: {
			type: "spring",
			duration: 500,
			stiffness: 40
		},
		rotateZ: 5
	},
	disappear: {
		x: "-50vw",
		rotateY: "70deg",
		opacity: 0,
		duration: 400,
		rotateZ: 10
	}
};
const emojiPhases = Object.keys(emojiPoses);
let PosedEmoji;
const defaultConfig = {
	stayLength: 2000,
	fadeOutLength: 500,
	fadeInLength: 500
};
let promiseKeeper;
const label = "EmojiCarousel";
let skipBeat = false;
let animationFrame;
// let logg;

const EmojiCarousel = props => {
	const { start = true, config = defaultConfig, className } = props;
	const { stayLength, fadeOutLength, fadeInLength } = config;
	const initialPhaseState = { phases: emojiPhases, wrapPhases: true };
	const [phaseState, dispatch] = useReducer(
		phaseReducer,
		initialPhaseState,
		initPhaseReducer
	);
	const { currentPhaseIndex, numPhases } = phaseState;
	const [emojiState, setEmoji] = useState({});
	const [appUtils] = useContext(AppContext);
	const { posed, shuffle, PromiseKeeper } = appUtils;

	const initEmojis = emojis => {
		const shuffledEmojis = shuffle(emojis, 5);
		setEmoji({
			emojis: shuffledEmojis,
			numEmojis: shuffledEmojis.length,
			currentIndex: 0,
			currentEmoji: shuffledEmojis[0]
		});
	};

	const handleClick = ev => {
		dispatch({ type: "goNext" });
		if (currentPhaseIndex + 1 < numPhases) {
			//not final phase
			skipBeat = true;
		}
	};

	const handlePoseComplete = completedPose => {
		if (currentPhaseIndex >= numPhases - 1) {
			//  Final phase's animation has completed. Perfect time for changing appearance, before the start of the next phase cycle.
			setEmoji(prevEmojiState => {
				const { emojis, currentIndex, numEmojis } = prevEmojiState;
				if (!emojis) return null;
				const nextIndex =
					currentIndex + 1 < numEmojis ? currentIndex + 1 : 0;
				return {
					...prevEmojiState,
					currentIndex: nextIndex,
					currentEmoji: emojis[nextIndex]
				};
			});

			dispatch({ type: "goNext" });
		}
	};

	const startInterval = (intervalSpan = 2000) => {
		promiseKeeper.every(
			intervalSpan,
			() => {
				if (skipBeat) {
					skipBeat = false;
					return;
				}
				animationFrame = window.requestAnimationFrame(() => {
					dispatch({ type: "goNext" });
				});
			},
			"emojiStateCycler"
		);
	};

	useEffect(() => {
		// logg = new Logger({ label }).logg;
		PosedEmoji = posed.div(emojiPoses);
		promiseKeeper = new PromiseKeeper({ label });

		return () => {
			// cleanup (on unmount)
			promiseKeeper.clearAll();
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {
		//on new `start` prop value
		const intervalSpan = Math.max(fadeInLength, fadeOutLength, stayLength);

		if (start) {
			initEmojis(EMOJIS);
			startInterval(intervalSpan);
		}
	}, [start]); //

	return (
		<div className={clsx("emoji-carousel", className && className)}>
			{PosedEmoji && emojiState && (
				<PosedEmoji
					pose={phaseState.currentPhase || "getReady"}
					duration
					onPoseComplete={completedPose =>
						handlePoseComplete(completedPose)
					}
					className={"emoji"}
					initialPose={"hidden"}
					onClick={ev => handleClick(ev)}
				>
					{emojiState.currentEmoji}
				</PosedEmoji>
			)}
		</div>
	);
};

EmojiCarousel.propTypes = {
	className: PropTypes.string,
	config: PropTypes.object,
	start: PropTypes.bool
};

export default EmojiCarousel;
