import React, { useState, useEffect, useContext } from "react";
//import PropTypes from "prop-types";
//import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../contexts/AppContext.jsx";
import DURATIONS from "../../constants/durations.js";
import clsx from "clsx";

import styles from "./Prompt.module.scss";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		zIndex: 1001,
		bottom: 0, //too easy :)
		left: 0,
		width: "100%",
		padding: `var(--spacing) 0`,
		margin: 0,
		fontSize: "1.25rem",
		lineHeight: 1,
		overflow: "hidden",
		display: "flex",
		flexFlow: "row nowrap",
		justifyContent: "space-evenly",
		alignItems: "center",
		alignContent: "space-around",
		flexGrow: 1,
		//backgroundColor: theme.palette.background.paper,
		backgroundColor: "var(--white)",
		userSelect: "none",
		height: "auto",
	},
	prompt_phone_landscape: {
		padding: `calc(0.5 * var(--spacing)) 0`,
	},
	instruction: {
		height: "auto",
		margin: "auto",
		marginLeft: "8px",
		padding: 0,
		lineHeight: "1",
		userSelect: "none",
		cursor: "pointer",
		textAlign: "center",
		verticalAlign: "middle",
		overflow: "visible",
	},
	letter: {
		overflow: "hidden",
		lineHeight: 1,
	},
	svg: {
		padding: 0,
		// marginBottom: `${theme.spacing(0.5)}px`,
		paddingBottom: "calc(0.5 * var(--spacing))",
		boxSizing: "border-box",
		width: "36px",
		height: "36px",
		margin: "auto",
		marginRight: "4%",
	},
}));

const EVENT_TYPES = {
	correct: {
		iconName: "check",
		instruction: "Correct!",
	},
	incorrect: {
		iconName: "close",
		instruction: "Incorrect. Try again.",
	},
	touch: {
		iconName: "touch",
		instruction: "Touch your answer!",
	},
	say: {
		iconName: "micIcon",
		instruction: "Touch the record button and speak!",
	},
	listen: {
		iconName: "listen",
		instruction: "Listen",
	},
	done: {
		iconName: "done",
		instruction: "Good Job!",
	},
	allDone: {
		iconName: "done",
		instruction: "Excellent! You are all done!",
	},
};

const svgPaths = {
	//names correspond to those found in Material UI icons.
	// round, 24px x 24px
	check:
		"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z",
	close:
		"M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z",
	listen:
		"M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.32-2.53C9.29 10.98 9 9.93 9 9c0-2.8 2.2-5 5-5 2.56 0 4.63 1.85 4.95 4.31.06.4.41.69.82.69h.34c.5 0 .89-.44.83-.94C20.49 4.59 17.61 2 14 2c-3.93 0-7 3.07-7 7 0 1.26.38 2.65 1.07 3.9.91 1.65 1.98 2.48 2.85 3.15.81.62 1.39 1.07 1.71 2.05.6 1.82 1.37 2.84 2.73 3.55.51.23 1.07.35 1.64.35 1.84 0 3.39-1.24 3.86-2.93.14-.54-.25-1.07-.81-1.07h-.35c-.38 0-.68.27-.81.63-.26.79-1.01 1.37-1.89 1.37zM6.97 1.97c-.43-.43-1.12-.39-1.5.07C3.93 3.94 3 6.36 3 9s.93 5.06 2.47 6.95c.38.46 1.07.5 1.49.08.36-.36.39-.93.07-1.32C5.77 13.16 5 11.17 5 9s.77-4.16 2.04-5.7c.33-.4.29-.97-.07-1.33zM11.5 9c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z",

	done:
		"M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z",
	/* check mark that can be filled
	done:
		"M20.47 5.63c.39.39.39 1.01 0 1.4L9.13 18.37c-.39.39-1.01.39-1.4 0l-4.2-4.2c-.39-.39-.39-1.01 0-1.4.39-.39 1.01-.39 1.4 0l3.5 3.5L19.07 5.63c.39-.39 1.01-.39 1.4 0zm-2.11-2.12l-9.93 9.93-2.79-2.79c-.78-.78-2.05-.78-2.83 0l-1.4 1.4c-.78.78-.78 2.05 0 2.83l5.6 5.6c.78.78 2.05.78 2.83 0L22.59 7.74c.78-.78.78-2.05 0-2.83l-1.4-1.4c-.79-.78-2.05-.78-2.83 0z",
	*/
	micIcon:
		"M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z",
	star:
		"M9 11.3l2.46 1.79c.39.29.92-.1.77-.56l-.94-2.89 2.43-1.73c.4-.28.2-.91-.29-.91h-2.98l-.97-3.02c-.15-.46-.8-.46-.95 0L7.55 7H4.57c-.49 0-.69.63-.29.91l2.43 1.73-.94 2.89c-.15.46.38.84.77.56L9 11.3z",
	touch:
		"M18.12 14.44l-3.24-1.62c1.29-1 2.12-2.56 2.12-4.32C17 5.47 14.53 3 11.5 3S6 5.47 6 8.5c0 2.13 1.22 3.98 3 4.89v3.26l-1.84-.39-.1-.02c-.1-.02-.2-.03-.32-.03-.53 0-1.03.21-1.41.59l-1.4 1.42 5.09 5.09c.43.44 1.03.69 1.65.69h6.3c.98 0 1.81-.7 1.97-1.67l.8-4.71c.22-1.3-.43-2.58-1.62-3.18zM8 8.5C8 6.57 9.57 5 11.5 5S15 6.57 15 8.5c0 .95-.38 1.81-1 2.44V8.5C14 7.12 12.88 6 11.5 6S9 7.12 9 8.5v2.44c-.62-.63-1-1.49-1-2.44zm9.77 8.79l-.8 4.71h-6.3c-.09 0-.17-.04-.24-.1l-3.68-3.68 4.25.89V8.5c0-.28.22-.5.5-.5s.5.22.5.5v6h1.76l3.46 1.73c.4.2.62.63.55 1.06z",
	heart:
		"M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55 C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z",
};

const boxPoses = {
	init: {
		opacity: 0,
		// rotateY: "45deg"
	},
	hidden: {
		opacity: 0,
		//height: 0,
		// rotateY: "45deg"
		//scale: 0.5,
		//borderRadius: "50%"
	},
	visible: {
		opacity: 1,
		//height: "auto",
		// rotateY: "0deg"
		//scale: 1,
		//borderRadius: "0%"
	},
};

const wordPoses = {
	visible: {
		opacity: 1,
	},
	hidden: {
		opacity: 0,
	},
};

const charPoses = {
	hidden: {
		x: -20,
		skewY: "-10deg",
		transition: ({
			wordIndex,
			numWords,
			charIndex,
			numChars,
			charInWordIndex,
			numCharsInWord,
		}) => ({
			duration: DURATIONS.exit,
			type: "spring",
		}),
	},
	visible: {
		x: 1,
		skewY: "0deg",
		delay: ({ wordIndex, numWords }) =>
			(wordIndex + 1) * 150 * (wordIndex >= numWords - 1 ? 1.1 : 1),
		transition: ({
			wordIndex,
			numWords,
			charIndex,
			numChars,
			charInWordIndex,
			numCharsInWord,
		}) => ({
			duration: DURATIONS.exit,
			type: "spring",
		}),
	},
};

const createPoses = (baseConfig = {}, overridingConfig = {}) => {
	const newConfig = { ...baseConfig };
	for (let poseName in overridingConfig) {
		if (baseConfig.hasOwnProperty(poseName)) {
			newConfig[poseName] = {
				...newConfig[poseName],
				...overridingConfig[poseName],
			};
		}
	}
	return newConfig;
};

const label = "Prompt";
//will be assigned a value after initial render
let themedCharPoses;
let MorphingIcon;
let AnimatedBox;
let pathIds = Object.keys(svgPaths);
let svgPoses;
let morphTransition;
let promiseKeeper;
const SHOW_PROMPT_LABEL = "show_prompt_interval";
// let logg;

const Prompt = (props) => {
	const { content, className } = props;
	const [state, setState] = useState({
		isVisible: false,
		withInterval: false,
	});
	const theme = useTheme();
	//const classes = useStyles(theme);

	const [appUtils] = useContext(AppContext);
	const {
		//Logger,
		PromiseKeeper,
		posed,
		tween,
		interpolate,
		SplitText,
	} = appUtils;

	useEffect(() => {
		//on mount
		// logg = new Logger({ label }).logg;
		promiseKeeper = new PromiseKeeper({ label });
		morphTransition = ({ from, to }) =>
			tween({
				from: 0,
				to: 1,
			}).pipe(interpolate(from, to));

		svgPoses = pathIds.reduce((config, id) => {
			config[id] = {
				d: svgPaths[id],
				transition: morphTransition,
			};

			return config;
		}, {});

		MorphingIcon = posed.path(svgPoses);

		themedCharPoses = createPoses(charPoses, {
			visible: {
				// color: theme.palette.primary.main,
				color: "var(--primary)",
			},
			hidden: {
				// color: theme.palette.secondary.main,
				color: "var(--secondary)",
			},
		});

		AnimatedBox = posed.div(boxPoses);

		return () => {
			promiseKeeper.clearAll(); //cleanup
		};
	}, []);

	useEffect(() => {
		//on new content
		if (content) {
			promiseKeeper.every(
				5000,
				async (finalResolve) => {
					setState((prevState) => ({
						...prevState,
						isVisible: !prevState.isVisible,
					}));
				},
				SHOW_PROMPT_LABEL
			);
		} else {
			//
			promiseKeeper.clear("interval", SHOW_PROMPT_LABEL);
		}

		setState((prevState) => ({
			...prevState,
			isVisible: props.content && true,
		}));

		return () => promiseKeeper.clearAll();
	}, [content]); //render dependencies

	const { isVisible } = state;

	const event =
		(content && content.eventType && EVENT_TYPES[content.eventType]) ||
		EVENT_TYPES["listen"];
	const iconName = event.iconName;
	const instruction = (content && content.text) || event.instruction;

	if (!AnimatedBox)
		return (
			<div
				className={clsx(
					""
					//classes.loading
				)}
			/>
		);

	return (
		<AnimatedBox
			className={clsx(
				styles.prompt,
				"prompt unselectable",
				//classes.root,
				className && className
			)}
			pose={isVisible ? "visible" : "hidden"}
			initialPose="hidden"
			animateOnMount={false}
			staggerChildren={1000}
		>
			{MorphingIcon && (
				<svg
					//className={classes.svg}
					className={styles.svg}
					width={`24px`}
					height={`24px`}
					viewBox={"0 0 24 24"}
				>
					<MorphingIcon pose={iconName} initialPose={"listen"} />
				</svg>
			)}

			<div className={clsx(styles.instruction)}>
				<SplitText
					//className={classes.word}
					key={"text"}
					wordPoses={wordPoses}
					charPoses={themedCharPoses || charPoses}
					pose={isVisible ? "visible" : "hidden"}
					initialPose="hidden"
				>
					{instruction}
				</SplitText>
			</div>
		</AnimatedBox>
	);
};

// Prompt.propTypes = {
// 	content: PropTypes.object,
// 	showOnce: PropTypes.bool,
// };

export default Prompt;
