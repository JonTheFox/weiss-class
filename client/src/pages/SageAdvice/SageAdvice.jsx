import React, {
	useState,
	useContext,
	useCallback,
	useEffect,
	forwardRef,
	useRef,
} from "react";

import PropTypes from "prop-types";
import clsx from "clsx";
import SVG from "react-inlinesvg";
import posed from "react-pose";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Color from "color";

import DURATIONS from "../../constants/durations.js";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import FreeSpeechBubble from "../../components/FreeSpeechBubble/FreeSpeechBubble.jsx";
import "./_SageAdvice.scss";

const sagePath = "/characters/OldSageToRight.svg";
const label = "SageAdvice";

let promiseKeeper;
let logg;
let animationFrame;
let now, prevTime, elapsedTime, fpsInterval;
// let startTime;
// let frameCount = 0;

const Sage = forwardRef((props, ref) => (
	<SVG
		ref={ref}
		src={sagePath}
		cacheRequests={true}
		description="Sage Weiss"
		loader={() => <span>...</span>}
		onError={(error) => {
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
		transition: { duration: 400 },
	},
	hidden: {
		// skew: "55deg",
		opacity: 0,

		transition: { duration: 250 },
	},
	left: {
		x: "-200%",
		transition: { duration: DURATIONS.enter },
	},
	pressable: true,
	press: { scale: 0.7, damping: 200 },
};

// const PosedSageWithRef = posed(Sage)(pressablePoses);
const Pressable = posed.div(pressablePoses);

// const speechBubblePoses = {
// 	enter: {
// 		// skew: "0deg",
// 		opacity: 1,
// 		// scale: 1,
// 		// x: "0%",
// 		transition: { duration: 400 }
// 	},
// 	exit: {
// 		// skew: "55deg",
// 		opacity: 0,
// 		// scale: 0,
// 		// x: "-50%",
// 		transition: { duration: 250 }
// 	},
// 	pressable: true,
// 	wiggle: { x: "10%" }
// };
// const AnimatedSpeechBubble = posed.div(speechBubblePoses);

const NUM_COLORS_USED = 5;

let colorIndex = 1;

class ColorSet {
	constructor(config = {}) {
		const _config = config ? config : {};
		if (!_config.label) _config.label = `color${colorIndex}`;

		for (let [key, value] of Object.entries(_config)) {
			if (value) this[key] = value;
		}
		colorIndex++;
	}
}

const sageColors = [
	// { label: "eye", darker: 1, lighter: 0 },
	new ColorSet({
		label: "body",
		darken: { base: "#f3ccc2ff" }, //instead of changing it to a random color
		darker: 3,
		lighter: 3,
		// fixed: true
	}),
	new ColorSet({ label: "robe", darker: 3, lighter: 3 }),
	new ColorSet({ label: "sleeve", darker: 3, lighter: 3 }),
	// new ColorSet({ label: "hair", darker: 3, transparent: 1 }),
	new ColorSet({
		label: "hair",
		darker: 3,
		lighter: 3,
		transparent: 1,
		darken: { base: "rgba(255, 255, 255, 1)" },
	}),

	//rgb(148, 116, 204) primary-base
	new ColorSet({
		label: "primary",
		darken: { base: "#f3ccc2ff" },
		lighter: 3,
		darker: 3,
		fixed: true,
	}),
	// new ColorSet({
	// 	label: "body",
	// 	darken: { base: "rgb(148, 116, 204)" },
	// 	darker: 3
	// }),
	new ColorSet({
		label: "secondary",
		darken: { base: "rgb(68, 221, 238)" },
		lighter: 3,
		darker: 3,
	}),
	new ColorSet({
		label: "red",
		darken: { base: "#e80909" },
		darker: 3,
		lighter: 3,
	}),
	new ColorSet({
		label: "yellow",
		darken: { base: "rgb(255, 255, 170)" },
		darker: 3,
		lighter: 3,
	}),
	new ColorSet({
		label: "green",
		darken: { base: "#d6ffa6" },
		darker: 3,
		lighter: 3,
	}),
	new ColorSet({
		label: "dark-pink",
		darken: { base: "rgb(238, 170, 255)" },
		darker: 3,
		lighter: 3,
	}),
	new ColorSet({
		label: "salmon",
		darken: { base: "rgb(255, 204, 204)" },
		darker: 3,
		lighter: 3,
	}),
];

const attachStyleSheet = () => {
	const styleElem = document.createElement("style");

	// Add a media (and/or media query) here if you'd like!
	// style.setAttribute("media", "screen")
	// style.setAttribute("media", "only screen and (max-width : 1024px)")

	// WebKit hack :(
	styleElem.appendChild(document.createTextNode(""));

	document.head.appendChild(styleElem);
	return styleElem.sheet;
};

const createCSSRuleString = (config = {}) => {
	const {
		selector = ".color-1-base",
		propertyName = "fill",
		propertyValue = "var(--color-1-base)",
		important = false,
	} = config;
	if (!selector || !propertyValue || !propertyValue) return null;
	let cssRule = `${selector} {${propertyName}: ${propertyValue} ${
		important ? "!important" : ""
	};}`;

	return cssRule;
};

const SageAdvice = (props) => {
	const [appUtils] = useContext(AppContext);
	const responsiveData = useContext(DeviceContext);
	const {
		Logger,
		//DEBUGGING,
		alignElements,
		getRandomColor,
		getRandomUpTo,
		PromiseKeeper,
		poseGroup,
	} = appUtils;
	logg = logg || new Logger({ label }).logg;
	promiseKeeper = promiseKeeper || new PromiseKeeper({ label });

	const sageRef = useRef(null);
	const mouthRef = useRef(null);
	const speechBubbleRef = useRef({});
	const [showSpeechBubble, setShowSpeechBubble] = useState(false);
	const [showBubble, setShowBubble] = useState(true);
	const [showMagicField, setShowMagicField] = useState(true);

	const [showSage, setShowSage] = useState(true);
	const [, rerender] = useState();
	const [isStyleSheetAttached, setIsStyleSheetAttached] = useState(false);
	const [whiteoutMode, setWhiteOutMode] = useState("in"); //one of: show-after, fadeout-after, hide-after

	const [speechBubbleAnchor, setSpeechBubbleAnchor] = useState({});

	const $isSagePressed = useRef(false);
	const $isActive = useRef(false);
	const $responsiveData = useRef(false);

	const addDynamicStyleSheet = useCallback(() => {
		if (isStyleSheetAttached) return;
		const styleSheet = attachStyleSheet();
		setIsStyleSheetAttached(true);

		const propertyName = "fill";
		const important = true;

		const cssRules = sageColors.map((colorSet, i) => {
			const { label, darker, lighter, transparent } = colorSet;
			const colorRules = [];

			//first, set the base color
			const shadeGroups = { base: 0, darker, lighter, transparent };

			for (let [shadeType, numShades] of Object.entries(shadeGroups)) {
				let selectorPre = `#root .${label}-`;
				let selector = "";
				let propertyValue = "";
				let shadeRule = "";

				if (shadeType === "base") {
					selector = selectorPre + "base";
					propertyValue = `var(--${label}-base)`;
					shadeRule = createCSSRuleString({
						selector,
						propertyName,
						propertyValue,
						important,
					});
					colorRules.push(shadeRule);
					styleSheet.insertRule(shadeRule);
				} else {
					for (let j = 1; j < 1 + numShades; j++) {
						selector = `${selectorPre}${shadeType}-${j}`;
						propertyValue = `var(--${label}-${shadeType}-${j})`;
						shadeRule = createCSSRuleString({
							selector,
							propertyName,
							propertyValue,
							important,
						});
						colorRules.push(shadeRule);
						styleSheet.insertRule(shadeRule);
					}
				}
			}

			return colorRules;
		});

		logg("Added the following style rules: ", cssRules);
	});

	const changeColors = useCallback((ev) => {
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

	const changeSageColor = (colorSets = {}, config = {}) => {
		const newColors = {};
		colorSets.forEach((part, colorIndex) => {
			const { label, fixed } = part;

			const shades = {};
			const shadeLabel = part.label || `color_${colorIndex}`;
			let baseColor;
			if ((part.darken && part.darken.base) || fixed) {
				const { base, multiplier } = part.darken;
				let _multi;
				if (
					!multiplier ||
					multiplier === "random" ||
					multiplier > 1 ||
					multiplier < -1
				) {
					const rand = getRandomUpTo(5);
					_multi = Number("0." + rand);
				} else {
					_multi = multiplier;
				}
				shades.darken = { base, multiplier: _multi };
				baseColor = Color(base).darken(_multi);
			} else {
				baseColor = Color(part.base || getRandomColor());
			}
			shades.base = baseColor.string();
			//create darker shades
			for (let i = 1; i < 1 + part.darker; i++) {
				const multiplier = part.label === "body" ? 0.025 : 0.1;
				const darkerShade = baseColor.darken((i + 1) * multiplier);
				shades[`darker-${i}`] = darkerShade.string();
			}
			//create lighter shades
			for (let j = 1; j < 1 + part.lighter; j++) {
				const lighterShade = baseColor.lighten((j + 1) * 0.1);
				shades[`lighter-${j}`] = lighterShade.string();
			}
			//create transparent-ish shades
			for (let k = 1; k < 1 + part.transparent; k++) {
				const transparentShade = baseColor.fade((k + 1) * 0.0125);
				shades[`transparent-${k}`] = transparentShade.string();
			}

			//add the new color shades to the newColors object
			newColors[shadeLabel] = shades;
		});

		logg("new sage colors: ", newColors);

		//assign the new colors to their corresponding CSS variables
		const bodyStyles = document.body.style;
		for (let [colorLabel, shades] of Object.entries(newColors)) {
			const pre = `--${colorLabel}-`; // e.g.: "--hair-"
			for (let [shadeName, colorValue] of Object.entries(shades)) {
				const variableName = pre + shadeName; // e.g.: "--hair-darker-1"
				newColors[colorLabel].cssVar = variableName;
				bodyStyles.setProperty(variableName, colorValue);
			}
		}
	};

	const [animationIsStopped, setAnimationIsStopped] = useState(false);

	// const startAnimation = config => {
	// 	const fps = config.DEBUGGING ? 5 : config.fps || 60;
	// 	fpsInterval = 1000 / fps;
	// 	prevTime = Date.now();
	// 	startTime = prevTime;

	// 	logg(
	// 		getFormattedTime(new Date(prevTime)) +
	// 			`: starting animation at ${fps}fps`
	// 	);

	// 	animationFrame = window.requestAnimationFrame(() => {
	// 		loop();
	// 	});
	// };

	const stopAnimation = () => {
		setAnimationIsStopped(true);
	};

	const alignSpeechBubble = () => {
		const { appbarHeight } = $responsiveData.current;
		if (!mouthRef || !mouthRef.current) return;
		alignElements({
			targetElem: mouthRef,
			movingElem: speechBubbleRef,
			top: appbarHeight - 0.66 * speechBubbleRef.current.clientHeight,
		});
	};

	const loop = useCallback(() => {
		if (
			!sageRef.current.getBoundingClientRect ||
			!speechBubbleRef.current.getBoundingClientRect
		)
			return null;

		if (animationIsStopped) return "animation stopped";

		animationFrame = window.requestAnimationFrame(loop);

		// calc elapsed time since last loop
		now = Date.now();
		elapsedTime = now - prevTime;
		if (elapsedTime > fpsInterval) {
			if ($isSagePressed.current) return;
			// Get ready for next frame by setting prevTime = now, but...
			// Also, adjust for fpsInterval not being multiple of 16.67
			prevTime = now - (elapsedTime % fpsInterval);

			//now draw next frame
			alignSpeechBubble();
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
		addDynamicStyleSheet();

		const primaryDarker1 = Color("hsl(261, 46%, 63%)")
			.darken(0.05)
			.string();
		logg("darker 1: ", primaryDarker1);
		const primaryDarker2 = Color("hsl(261, 46%, 63%)")
			.darken(0.1)
			.string();
		logg(primaryDarker2);
		const primaryDarker3 = Color("hsl(261, 46%, 63%)")
			.darken(0.15)
			.string();
		logg(primaryDarker3);
		const primaryDarker4 = Color("hsl(261, 46%, 63%)")
			.darken(0.2)
			.string();
		logg(primaryDarker4);
		const primaryDarker5 = Color("hsl(261, 46%, 63%)")
			.darken(0.25)
			.string();
		logg(primaryDarker5);

		const primaryLighter1 = Color("hsl(261, 46%, 63%)")
			.lighten(0.05)
			.string();
		logg("ligther 1: ", primaryLighter1);
		const primaryLighter2 = Color("hsl(261, 46%, 63%)")
			.lighten(0.1)
			.string();
		logg(primaryLighter2);
		const primaryLighter3 = Color("hsl(261, 46%, 63%)")
			.lighten(0.15)
			.string();
		logg(primaryLighter3);
		const primaryLighter4 = Color("hsl(261, 46%, 63%)")
			.lighten(0.2)
			.string();
		logg(primaryLighter4);
		const primaryLighter5 = Color("hsl(261, 46%, 63%)")
			.lighten(0.25)
			.string();
		logg(primaryLighter5);

		//domRefs require a re-render to trigger their ref callbacks, so....
		promiseKeeper
			.stall(DURATIONS.betweenLevels, "re-render to trigger ref callback")
			.then(() => rerender(1));

		return () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {
		if (sageRef.current && (!mouthRef || !mouthRef.current)) {
			mouthRef.current = sageRef.current.querySelector("rect#mouth");

			// setAnimationIsStopped(false);
			// startAnimation({ DEBUGGING });

			setSpeechBubbleAnchor(mouthRef.current);

			//alignSpeechBubble();
			if (sageRef.current) {
				promiseKeeper
					.stall(DURATIONS.enter * 3, "show speech bubble")
					.then(() => {
						animationFrame = window.requestAnimationFrame(() => {
							//

							setShowSpeechBubble(true);
							$isActive.current = true;
						});
					});
			}

			return;
		}

		return () => {
			window.cancelAnimationFrame(animationFrame);
			stopAnimation();
		};
	}, [sageRef.current]);

	useEffect(() => {
		if (responsiveData) {
			$responsiveData.current = responsiveData;
			alignSpeechBubble();
		}
	}, [responsiveData]);

	return (
		<div
			id={"sage-advice"}
			className={clsx(
				"fullsize gradient-animation-psychedelic root has-after white-out",
				whiteoutMode
			)}
		>
			<div className={clsx("zone character-zone")}>
				<Pressable
					className={clsx("sage-area press-area")}
					onPressStart={() => {
						$isSagePressed.current = true;
					}}
					onPressEnd={() => {
						$isSagePressed.current = false;
						if (!$isActive.current) return;
						$isActive.current = false;
						setShowSpeechBubble(false);
						promiseKeeper
							.stall(DURATIONS.enter, "show white-out")
							.then(() => {
								setWhiteOutMode("show-after");
								promiseKeeper
									.stall(
										DURATIONS["betweenLevels"],
										"whiteOut-after-color-change",
										{
											resolveOnError: true,
										}
									)
									.then(() => {
										//overlay is now covering the entire view. Good time for changing colors, etc.
										// $isSagePressed.current = false;
										changeColors();
										changeSageColor(sageColors);

										window.requestAnimationFrame(() => {
											//now smoothly fadeout the overlay to reveal the new colors
											setWhiteOutMode("fadeout-after");
											promiseKeeper
												.stall(
													DURATIONS.betweenLevels,
													"remove whiteout"
												)
												.then(() => {
													animationFrame = window.requestAnimationFrame(
														() => {
															setWhiteOutMode(
																"hide-after"
															);
															$isActive.current = true;
															alignSpeechBubble();
															promiseKeeper
																.stall(
																	500,
																	"show speech bubble after removal of whiteout"
																)
																.then(() => {
																	setShowSpeechBubble(
																		true
																	);
																});
														}
													);
												});
										});
									});
							});
					}}
					pose={showSage ? "visible" : "hidden"}
					initialPose={"left"}
				>
					<div
						className={clsx(
							"sage-container wobble fill-space has-before before--bubble has-after after--magic-field",
							showBubble ? "show-before" : "hide-before",
							showMagicField ? "show-after" : "hide-after"
						)}
					>
						<Sage className={"sage-svg"} innerRef={sageRef} />
					</div>
				</Pressable>

				<div className={clsx("text-container")}>
					<FreeSpeechBubble
						className={"semi-wobble"}
						anchor={speechBubbleAnchor}
						show={showSpeechBubble}
						onClick={() => {
							setShowSpeechBubble(false);
						}}
						ref={speechBubbleRef}
						Text={
							<>
								<p className={clsx("p readable")}>
									Mistakes are{" "}
									<span className={"bold"}>inevitable</span>.
								</p>
								<p className={clsx("p readable")}>
									Taking your chances is{" "}
									<span className={"bold"}>necessary</span>.
								</p>
							</>
						}
					/>
				</div>
			</div>
			<div className={clsx("zone go-back-zone")}>
				<Button
					className="reload-btn readable"
					variant="contained"
					color="primary"
					size="large"
					onClick={(ev) => window.location.reload()}
				>
					Rock on
				</Button>
			</div>
			<div className={clsx("zone controls-zone")}>
				<ButtonGroup
					fullWidth
					aria-label="full width outlined button group"
					className={"controls btn-group"}
				>
					<Button
						variant="outlined"
						color="primary"
						size="small"
						className={clsx(
							"btn readable",
							showBubble ? "hide" : "show"
						)}
						disabled={!showSage}
						onClick={(ev) => setShowBubble((prev) => !prev)}
					>
						{showBubble ? "Hide bubble" : "Show bubble"}
					</Button>
					<Button
						variant="outlined"
						color="primary"
						size="small"
						className={clsx(
							"btn readable",
							showMagicField ? "hide" : "show"
						)}
						disabled={!showSage}
						onClick={(ev) => setShowMagicField((prev) => !prev)}
					>
						{showMagicField
							? "Hide magic field"
							: "Show magic field"}
					</Button>
					<Button
						variant="outlined"
						color="primary"
						size="small"
						className={clsx(
							"btn readable",
							showSage ? "hide" : "show"
						)}
						onClick={(ev) => setShowSage((prev) => !prev)}
					>
						{showSage ? "Hide Sage" : "Show Sage"}
					</Button>
					<Button
						variant="outlined"
						color="primary"
						size="small"
						className={clsx(
							"btn readable",
							showSpeechBubble ? "hide" : "show"
						)}
						onClick={(ev) => setShowSpeechBubble((prev) => !prev)}
					>
						{showSpeechBubble
							? "Hide speech bubble"
							: "Show speech bubble"}
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};

SageAdvice.propTypes = {
	next: PropTypes.func,
	user: PropTypes.object,
};

export default SageAdvice;

/*
		<AnimatedSpeechBubble
						ref={ref => {
							if (ref) {
								speechBubbleRef.current = ref;
							}
						}}
						className={clsx("speech-bubble")}
						pose={showSpeechBubble ? "enter" : "exit"}
						initialPose={"exit"}
						onPressEnd={ev => setShowSpeechBubble(false)}
					>
						<p className={clsx("p")}>
							Mistakes are{" "}
							<span className={"bold"}>inevitable</span>.
						</p>
						<p className={clsx("p")}>
							Taking your chances is{" "}
							<span className={"bold"}>necessary</span>.
						</p>
					</AnimatedSpeechBubble>
*/
