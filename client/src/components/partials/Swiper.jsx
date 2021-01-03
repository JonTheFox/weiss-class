import React, {
	useState,
	useContext,
	useEffect,
	useRef,
	useCallback
} from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import posed from "react-pose";

import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
// import View from "../layout/View.jsx";
import DURATIONS from "../../constants/durations.js";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import "./_Swiper.scss";

const titlePoses = {
	visible: {
		transition: { duration: DURATIONS.enter },
		scale: 1,
		delay: 0
	},
	pressable: true,
	init: { scale: 1 },
	press: {
		scale: 0.8,
		duration: DURATIONS.exit * 0.25
	},
	hidden: {
		delay: 0,
		scale: 1,
		transition: { duration: DURATIONS.exit }
	}
};

//promiseLabel;

let animationFrame;
let logg;
let loggError;
let promiseKeeper;
const label = "Swiper";
// let MAX_STEPS_FOR_DOTS = 15;

//defaults
const MAX_STEPS_FOR_DOTS = {
	small: 5,
	normal: 5
};
const MAX_STEPS_FOR_LINEAR = {
	small: 10,
	normal: 10
};

const EMPTY_FUNC = () => {};

const Swiper = React.forwardRef((props, ref) => {
	const {
		items = [],
		mapItem,
		imageSlider,
		noFullscreen,
		justifyContent = "",
		navigationKeys = {},
		className = "",
		wrapSlides = true,
		//index = 0,,
		renderHeader = () => {},
		axis = "x",
		headerClass = "",
		showGotoFirst = true,
		showGotoLast = true,
		onSwitching = EMPTY_FUNC,
		resistance = false,
		onNextClick = EMPTY_FUNC,
		onLastClick = EMPTY_FUNC,
		onBackClick = EMPTY_FUNC,
		onFirstClick = EMPTY_FUNC,
		showHeader
	} = props;

	const size = ["normal", "small", "medium"].includes(props.size)
		? props.size
		: "normal";
	const maxStepsForDots =
		parseInt(props.maxStepsForDots) || MAX_STEPS_FOR_DOTS[size];
	const maxStepsForLinear =
		parseInt(props.maxStepsForLinear) || MAX_STEPS_FOR_LINEAR[size];

	let { sharedRefs } = props;
	if (!sharedRefs || !sharedRefs.current) {
		sharedRefs = useRef({});
	}
	if (!sharedRefs.current.swiper) {
		sharedRefs.current.swiper = {};
	}
	if (!sharedRefs.current.swiper.swipableViews) {
		sharedRefs.current.swiper.swipableViews = {};
	}

	let numItems = items.length || sharedRefs.current.swiper_numItems;
	if (!numItems) numItems = 0;

	const [appUtils] = useContext(AppContext);
	const {
		Logger,
		PromiseKeeper,
		handlePress,
		removePressHandlers,
		synthVoice,
		loadImage,
		scrollTo
	} = appUtils;
	promiseKeeper = promiseKeeper || new PromiseKeeper({ label });

	const [activeStep, setActiveStep] = useState(0);
	const viewedItem = items[activeStep];
	const [firstImgIsLoaded, setFirstImgIsLoaded] = useState(
		props.firstImageIsLoaded || false
	);

	const theme = useTheme();

	const [loadedItems, setLoadedItems] = useState([]);

	const [isFullScreenMode, setIsFullScreenMode] = useState(false);

	const toggleFullScreenMode = () => {
		animationFrame = window.requestAnimationFrame(() => {
			setIsFullScreenMode(prev => !prev);
		});
	};

	const bufferLoad = async (items = []) => {
		if (items.length === 0) return [];
		setLoadedItems(items[0]);
		return new Promise((resolve, reject) => {
			try {
				const completeList = items.reduce((accu, item, i) => {
					accu.push(item);
					if (i % 10 === 0) {
						logg(
							`Updating state to have ${accu.length + 10} items.`
						);
						setLoadedItems(accu);
					}
					return accu;
				}, []);

				return resolve(completeList);
			} catch (err) {
				return reject(err);
			}
		});
	};

	// const handleNext = () => {
	// 	setActiveStep(step => {
	// 		const _numItems =
	// 			sharedRefs.current.swiper_numItems ||
	// 			(props.items && props.items.length) ||
	// 			0;

	// 		if (step + 1 < _numItems) {
	// 			return step + 1;
	// 		}
	// 		return wrapSlides ? 0 : step;
	// 	});
	// };

	const handleStepChange = newStep => {
		//callback invoked by the SwipableViews component itself, and also by hitting the navigation btns
		const _items =
			props.items && props.items.length
				? props.items
				: sharedRefs.current.items || [];

		setActiveStep(newStep);

		if (props.onChangeIndex) {
			props.onChangeIndex({
				step: newStep,
				items: _items,
				item: _items[newStep]
			});
			return;
		}

		if (props.onChange) {
			props.onChange({
				step: newStep,
				items: _items,
				item: _items[newStep]
			});
			return;
		}
	};

	const handleNext = useCallback(() => {
		const _numItems =
			sharedRefs.current.swiper_numItems ||
			(props.items && props.items.length) ||
			0;
		const currentStep = sharedRefs.current.swiper_activeStep;

		const nextStep =
			currentStep + 1 < _numItems
				? currentStep + 1
				: wrapSlides
				? 0
				: currentStep;

		if (nextStep !== currentStep) {
			handleStepChange(nextStep);
		}
	});

	const handleLast = useCallback(() => {
		handleStepChange(props.items.length ? props.items.length - 1 : 0);
	});

	// const handleLast = () => {

	// 	// setActiveStep(step => {
	// 	// 	const _numItems =
	// 	// 		sharedRefs.current.swiper_numItems ||
	// 	// 		(props.items && props.items.length) ||
	// 	// 		0;
	// 	// 	return _numItems - 1;
	// 	// });
	// };

	const handleBack = useCallback(() => {
		const currentStep = sharedRefs.current.swiper_activeStep;
		if (currentStep <= 0) {
			if (wrapSlides) {
				handleStepChange(sharedRefs.current.swiper_numItems - 1);
			}
			return; //stay on the first item
		}
		//go 1 step back
		handleStepChange(currentStep - 1);
	});

	const handleFirst = () => {
		handleStepChange(0);
	};

	const goToStep = useCallback(stepNum => {
		if (
			(stepNum >= 0 && stepNum <= sharedRefs.current.swiper_numItems) ||
			props.items.length
		) {
			logg("swiper_goToStep: moving to step #" + stepNum);
			handleStepChange(stepNum);
		}
	});

	const setDimensionVars = useCallback(
		ev => {
			const swiperRef = sharedRefs?.current?.swiper?.ref;
			if (!swiperRef) return null;
			const swipableViewsRef = swiperRef.querySelector(
				".react-swipeable-view-container"
			);
			if (!swipableViewsRef) return null;

			const { offsetWidth, offsetHeight } = swipableViewsRef;

			const width = offsetWidth + "px";
			const height = offsetHeight + "px";

			swiperRef.style.setProperty("--swipable-views--width", width);
			swiperRef.style.setProperty("--swipable-views--height", height);

			sharedRefs.current.swiper.swipableViews.width = width;
			sharedRefs.current.swiper.swipableViews.height = height;
		},
		[sharedRefs]
	);

	useEffect(() => {
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;

		//

		setDimensionVars();
		window.addEventListener("resize", setDimensionVars);

		let {
			swiper_numItems,
			swiper_activeStep,
			swiper_viewedItem,
			swiper_goToStep
		} = sharedRefs.current;

		swiper_numItems = items.length || 0;
		swiper_activeStep = activeStep || 0;
		swiper_viewedItem = items[activeStep] || {};
		swiper_goToStep = goToStep;

		const {
			prev = { key: props.prevKey || "arrowLeft" },
			next = { key: props.nextKey || "arrowRight" }
		} = navigationKeys;

		promiseKeeper
			.stall(2 * DURATIONS.enter, label + " attachKeyHandlers")
			.then(() => {
				handlePress(prev, handleBack);
				handlePress(next, handleNext);
				// handlePress({ key: "tab", preventDefault: true }, a => {
				// 	// debugger;
				// 	// ev.preventDefault();
				// });
			})
			.catch(reason => {
				loggError(reason);
			});

		if (imageSlider && items && !firstImgIsLoaded) {
			loadImage(items && items[0] && items[0].imgURL).then(() => {
				setFirstImgIsLoaded(true);
			});
		}

		return () => {
			removePressHandlers();
			window.cancelAnimationFrame(animationFrame);

			window.removeEventListener("resize", setDimensionVars, false);
		};
	}, []);

	useEffect(() => {
		sharedRefs.current.swiper_activeStep = activeStep;
		sharedRefs.current.swiper_viewedItem = items[activeStep];
		sharedRefs.current.swiper_goToStep = goToStep;
		logg("activeStep: ", activeStep, "viewedItem: ", viewedItem);
	}, [activeStep]);

	useEffect(() => {
		sharedRefs.current.swiper_numItems = items ? items.length : 0;
		sharedRefs.current.items = items || [];
		bufferLoad(items, setLoadedItems).then(loadedItems => {
			setLoadedItems(loadedItems);
		});
	}, [items]);

	useEffect(() => {
		logg("loadedItems: ", loadedItems);
		sharedRefs.current.swiper_items = loadedItems;
		logg("sharedRefs: ", sharedRefs.current);

		if (props.onItemsLoaded) {
			props.onItemsLoaded();
		}
	}, [loadedItems]);

	return (
		<div
			className={clsx(
				"swiper fullsize",
				className && className,
				`axis-${axis}`,
				theme.direction,
				showGotoLast && "show-last",
				showGotoFirst && "show-first",
				`size-${size}`,
				justifyContent && justifyContent,
				isFullScreenMode && "fullscreen-mode"
			)}
			ref={refoosh => {
				if (refoosh) {
					sharedRefs.current.swiper.ref = refoosh;
				}
			}}
		>
			{showHeader &&
				renderHeader &&
				renderHeader({ activeStep, items, sharedRefs })}

			<SwipeableViews
				axis={axis}
				index={activeStep}
				onChangeIndex={handleStepChange}
				onSwitching={onSwitching}
				resistance={resistance}
				enableMouseEvents
				ref={ref => {
					if (ref) {
						sharedRefs.current.swiper.swipableViews.ref = ref;
					}
				}}
				className={clsx(
					"views",
					isFullScreenMode && "centered",
					imageSlider && "imageSlider"
				)}
			>
				{!mapItem
					? ""
					: (!imageSlider || (imageSlider && firstImgIsLoaded)) &&
					  loadedItems.map(mapItem)}
			</SwipeableViews>
			<MobileStepper
				elevation={0}
				steps={numItems}
				variant={
					numItems <= maxStepsForDots
						? "dots"
						: numItems <= maxStepsForLinear
						? "progress"
						: "text"
				}
				position="static"
				activeStep={activeStep}
				className={"mobile-stepper"}
				nextButton={
					<div className={"next-btns-group"}>
						<Button
							className={`btn btn-next`}
							size="small"
							onClick={handleNext}
							disabled={activeStep === numItems - 1}
							tabIndex={1}
						>
							{size === "small" ? "" : "Next"}
							{theme.direction === "rtl" ? (
								<KeyboardArrowLeft className={`chevron`} />
							) : (
								<KeyboardArrowRight className={`chevron`} />
							)}
						</Button>
						{showGotoLast && (
							<Button
								className={`btn btn-last`}
								size="small"
								onClick={handleLast}
								disabled={activeStep === numItems - 1}
								tabIndex={1}
							>
								{size === "small" ? "" : "Last"}
								{theme.direction === "rtl" ? (
									<FirstPageIcon className={`chevron`} />
								) : (
									<LastPageIcon className={`chevron`} />
								)}
							</Button>
						)}
					</div>
				}
				backButton={
					<div className={"back-btns-group"}>
						{showGotoFirst && (
							<Button
								className={`btn btn-first`}
								size="small"
								tabIndex={3}
								onClick={handleFirst}
								disabled={activeStep === 0}
							>
								{theme.direction === "rtl" ? (
									<LastPageIcon className={`chevron`} />
								) : (
									<FirstPageIcon className={`chevron`} />
								)}
								{size === "small" ? "" : "First"}
							</Button>
						)}

						<Button
							className={`btn btn-back`}
							tabIndex={2}
							size="small"
							onClick={handleBack}
							disabled={activeStep === 0}
						>
							{theme.direction === "rtl" ? (
								<KeyboardArrowRight className={`chevron`} />
							) : (
								<KeyboardArrowLeft className={`chevron`} />
							)}
							{size === "small" ? "" : "Back"}
						</Button>
					</div>
				}
			/>
		</div>
	);
});

Swiper.propTypes = {
	sharedRefs: PropTypes.object,
	items: PropTypes.array,
	mapItem: PropTypes.func,
	imageSlider: PropTypes.bool,
	noFullscreen: PropTypes.bool,
	justifyContent: PropTypes.string,
	navigationKeys: PropTypes.objectOf(PropTypes.object),
	className: PropTypes.string,
	wrapSlides: PropTypes.bool,
	renderHeader: PropTypes.func,
	axis: PropTypes.string,
	headerClass: PropTypes.string,
	showGotoFirst: PropTypes.bool,
	showGotoLast: PropTypes.bool,
	size: PropTypes.string,
	onChange: PropTypes.func,
	onChangeIndex: PropTypes.func,
	steps: PropTypes.number,
	onSwitching: PropTypes.func,
	onNextClick: PropTypes.func,
	onLastClick: PropTypes.func,
	onBackClick: PropTypes.func,
	onFirstClick: PropTypes.func,
	resistance: PropTypes.bool,
	nextKey: PropTypes.string,
	prevKey: PropTypes.string
	//index: PropTypes.number
};

export default Swiper;

/*

{!noFullscreen && (
						<Button
							className={"btn btn-fullscreen"}
							size="small"
							onClick={() =>
								sharedRefs.current.swiper_activeStep++
							}
						>
							{isFullScreenMode ? (
								<FullscreenExitIcon
									fontSize={"large"}
									onClick={ev => {
										ev.stopPropagation();
										toggleFullScreenMode();
									}}
								/>
							) : (
								<FullscreenIcon
									fontSize={"large"}
									onClick={ev => {
										ev.stopPropagation();
										toggleFullScreenMode();
									}}
								/>
							)}
						</Button>
					)}
					)}

*/
