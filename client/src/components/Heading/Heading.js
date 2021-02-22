import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";

import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import DURATIONS from "../../constants/durations.js";
import SplitText from "react-pose-text";
import { POSES } from "../../constants/poses.js";
import useLogg from "../../hooks/useLogg.jsx";
import {
	Heading1 as StyledHeading1,
	Heading2 as StyledHeading2,
} from "./Heading.styles.js";
import clsx from "clsx";

let animationFrame;
let logg;
let loggError;
let promiseKeeper;
const label = "Header";
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

const HEADER_VARIANTS = ["h1", "h2", "marquee", "sub-marquee"];

const SHADOW_VARIANTS = ["none", "dark"];
const TEXT_LOOKS = ["cloudy", "flat"];

const Header = React.forwardRef(
	(
		{
			h = "1",
			centered = false,
			variant = HEADER_VARIANTS[0],
			shadow = SHADOW_VARIANTS[0],
			textLook = TEXT_LOOKS[0],
			children,
		},
		ref
	) => {
		// const [appUtils] = useContext(AppContext);
		// const { Logger, PromiseKeeper } = appUtils;

		const { logg, loggError } = useLogg({ label });

		const onTitleClick = useCallback((ev) => {
			logg("title clicked");
		}, []);

		const StyledHeading = h == "1" ? StyledHeading1 : StyledHeading2;

		if (!children) return null;

		return (
			<Container
				maxWidth="sm"
				className={`heading-container ${variant} stroke ${
					centered ? "centered" : ""
				}`}
				style={{ overflow: "visible" }}
				onClick={onTitleClick}
			>
				<StyledHeading
					className={`heading heading-${h} h${h} shadow--${shadow} textLook--${textLook} readable`}
				>
					<SplitText
						charPoses={CHAR_POSES}
						wordPoses={POSES.word__draggable}
						className={`letter cursor--grab`}
					>
						{children}
					</SplitText>
				</StyledHeading>
			</Container>
		);
	}
);

Header.propTypes = {
	text: PropTypes.string,
};

export default Header;
