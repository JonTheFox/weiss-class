import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";

import PropTypes from "prop-types";
import clsx from "clsx";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import View from "../layout/View.jsx";
import "./_SlideShowPage.scss";
import WeissSpinner from "../partials/WeissSpinner.jsx";

import ImageGallery from "react-image-gallery";

const SLIDE_LAYOUTS = {
	HEADER: "layout-format-header",
};

const renderItem = () => {
	return (
		<div>
			<img
				className={"image-gallery-image"}
				src="https://picsum.photos/id/1018/1000/600/"
				alt=""
			/>

			<div
				className={clsx(
					"slide-overlay fullsize stroke--children",
					SLIDE_LAYOUTS.HEADER
				)}
			>
				{" "}
				<div className="layout--gutter-top"></div>
				<div className={clsx("layout--header")}>
					<h1 className={clsx("slide-title", "present-simple-title")}>
						<span className={"title-present"}>Present</span>
						<span className={"title-space"}> </span>
						<span className={"title-simple"}>Simple</span>
					</h1>
					<h2>
						<span className="inner-text">Introduction</span>
					</h2>
				</div>
				<div className="layout--body inner-text use-cases">
					<p>
						We use this tense to talk about things we do regulary:
					</p>
					<p>our every-day routine,</p>
					<p>our habits & hobbies,</p>
					<p>things that we never do, etc.</p>
				</div>
				<div className="layout--footer inner-text use-cases">
					<p>For example:</p>
					<p>I go to work 5 days a week.</p>
					<p>My elder brother studies Chinese.</p>
					<p>We always try our best.</p>
				</div>
				<div className="layout--gutter-bottom"></div>
			</div>
		</div>
	);
};

class Slide {
	constructor(config = {}) {
		if (!config) {
			const msg = "No config!";
			loggError(msg);
			throw new Error(msg);
		}
		const { original, thumbnail, numSteps } = config;
		this.original = original;
		this.thumbnail = thumbnail;
		this.numSteps = numSteps;
	}
}

const images = [
	{
		original: "https://picsum.photos/id/1018/1000/600/",
		thumbnail: "https://picsum.photos/id/1018/250/150/",
		renderItem,
		numSteps: 3,
		step: 0,
	},
	{
		original: "https://picsum.photos/id/1015/1000/600/",
		thumbnail: "https://picsum.photos/id/1015/250/150/",
	},
	{
		original: "https://picsum.photos/id/1019/1000/600/",
		thumbnail: "https://picsum.photos/id/1019/250/150/",
	},
];

const label = "SlideShowPage";
let animationFrame;
let logg;
let loggError;
let promiseKeeper;

const mapAnimalsToSlides = (items) => {
	const mapped = items.map((item) => {
		return {
			thumbnail: item.small || item.regular || item.imgURL,
			original: item.regular || item.small || item.imgURL,
		};
	});

	return mapped;
};

const SlideShowPage = React.forwardRef((props, ref) => {
	const [appUtils] = useContext(AppContext);
	const { Logger, PromiseKeeper, loadImage, handlePress, animals } = appUtils;

	const {
		slides = images ||
			(animals && animals.items && mapAnimalsToSlides(animals.items)) ||
			images,
		navNextKey = "",
	} = props;

	const mediaContext = useContext(DeviceContext);
	const [isFirstItemLoaded, setIsFirstItemLoaded] = useState(false);

	const [step, setStep] = useState(0);
	const [slide, setSlide] = useState(slides[0]);

	const refs = useRef({
		displayedSlideIndex: 0,
		displayedSlide: slides[0],
	});

	const SlideShowPlaceHolder = useCallback(() => (
		<div className={clsx("SlideShowPlaceholder")}>
			<div className={"PlaceHolder"}>
				<WeissSpinner></WeissSpinner>
			</div>
		</div>
	));

	const goNextSlide = useCallback(() => {
		const _imageGallery = refs.current.imageGallery;
		if (!_imageGallery) {
			loggError("imageGallery is not found in refs");
			return null;
		}
		refs.current.imageGallery.slideRight();
	});
	const goPrevSlide = useCallback(() => {
		const _imageGallery = refs.current.imageGallery;
		if (!_imageGallery) {
			loggError("imageGallery is not found in refs");
			return null;
		}
		refs.current.imageGallery.slideLeft();
	});

	const handleSlideMove = useCallback((newSlideIndex) => {
		logg("handleSlideMove: index is now ", newSlideIndex);

		let { displayedSlide, displayedSlideIndex } = refs.current;
		refs.current.displayedSlideIndex = newSlideIndex;
		refs.current.displayedSlide = slides[newSlideIndex];
		setSlide(refs.current.displayedSlide);
	});

	const goNextStep = () => {
		const displayedSlide = refs.current.displayedSlide;
		const { numSteps, step } = displayedSlide;
		if (step + 1 > numSteps) {
			return goNextSlide();
		}
		setStep((currentStep) => currentStep + 1);
	};

	const goPrevStep = useCallback(() => {
		const displayedSlide = refs.current.displayedSlide;
		const { numSteps, step } = displayedSlide;
		if (step <= 0) {
			return goPrevSlide();
		}
		setStep((currentStep) => currentStep - 1);
	});

	const loadFirstItem = useCallback(async (item) => {
		try {
			const { thumbnail, original } = item;
			const result = await promiseKeeper.allCompleted(
				[loadImage(original), loadImage(thumbnail)],
				{
					noRejection: true,
				}
			);
			logg("loadFirstItem result: ", result);
			animationFrame = window.requestAnimationFrame(() => {
				setIsFirstItemLoaded(true);
			});
		} catch (err) {
			loggError(err.message);
			//todo: give feedback to the user
			return err;
		}
	});

	const renderCustomControls = function() {
		return (
			<div className={clsx("progress-bar-container centered-x")}>
				<ProgressBar
					percent={progressPerecent}
					filledBackground="linear-gradient(to right, var(--canvas), var(--secondary))"
				></ProgressBar>
			</div>
		);
	};

	useEffect(() => {
		promiseKeeper = new PromiseKeeper({ label });
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;

		if (
			!slides ||
			!slides[0] ||
			!slides[0].original ||
			!slides[0].thumbnail
		) {
			loggError("No slides provided!");
			return;
		}

		loadFirstItem(slides[0]);
		handlePress({ key: navNextKey || "ArrowUp" }, goNextStep);
		handlePress({ key: navNextKey || "ArrowDown" }, goPrevStep);

		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {
		const newNumSteps = slide.numSteps || 1;
		slide.numSteps = newNumSteps;
		const newStep = slide.step || 0;
		slide.step = newStep;
		refs.current.displayedSlide = slide;
		setStep(newStep);
	}, [slide]);

	useEffect(() => {
		const { numSteps } = refs.current.displayedSlide;
		refs.current.displayedSlide.step = step;
		logg(`step: ${step} / ${numSteps}`);
	}, [step]);

	const progressPerecent =
		(100 / (refs.current.displayedSlide.numSteps || 1)) * step;

	const thumbnailPosition =
		mediaContext.phone.portrait || mediaContext.tablet.portrait
			? "bottom"
			: "left";

	return (
		<View
			className={clsx("slide-show-page")}
			ref={(pageRef) => {
				if (!pageRef) return;
				refs.current.slideShowPage = pageRef;
			}}
		>
			{isFirstItemLoaded ? (
				<ImageGallery
					items={slides}
					showIndex={true}
					onSlide={handleSlideMove}
					refs={refs}
					ref={(i) => {
						if (!i) return;
						refs.current.imageGallery = i;
						const pageRef = refs.current.slideShowPage;
						const slideWrapper = pageRef.querySelector(
							".image-gallery-slide-wrapper"
						);
						if (slideWrapper) {
							const slideWidth = slideWrapper.clientWidth + "px";
							const slideHeight =
								slideWrapper.clientHeight + "px";

							pageRef.style.setProperty(
								"--slide-width",
								slideWidth
							);
							pageRef.style.setProperty(
								"--slide-height",
								slideHeight
							);

							logg(
								"slideWidth: ",
								slideWidth,
								"slideHeight: ",
								slideHeight
							);
						} else {
							loggError(
								"No slideWrapper element found. Cant update CSS var for positioning the progress bar"
							);
						}

						const thumbnailsWrapper = pageRef.querySelector(
							".image-gallery-thumbnails-wrapper"
						);
						if (thumbnailsWrapper) {
							const thumbnailsWidth =
								thumbnailsWrapper.clientWidth + "px";
							const thumbnailsHeight =
								thumbnailsWrapper.clientHeight + "px";

							pageRef.style.setProperty(
								"--thumbnails-width",
								thumbnailsWidth
							);
							pageRef.style.setProperty(
								"--thumbnails-height",
								thumbnailsHeight
							);

							logg(
								"var(--thumbnails-width): ",
								thumbnailsWidth,
								"var(--thumbnails-height): ",
								thumbnailsHeight
							);
						} else {
							loggError(
								"No thumbnailsWrapper element found. Cant update CSS var for positioning the progress bar"
							);
						}

						let smallIcon = pageRef.querySelector(
							".image-gallery-fullscreen-button"
						);
						if (!smallIcon) {
							smallIcon = pageRef.querySelector(
								".image-gallery-play-button"
							);
						}
						if (smallIcon) {
							const smallIconWidth = smallIcon.clientWidth + "px";
							const smallIconHeight =
								smallIcon.clientHeight + "px";

							pageRef.style.setProperty(
								"--small-icon-width",
								smallIconWidth
							);
							pageRef.style.setProperty(
								"--small-icon-height",
								smallIconHeight
							);

							logg(
								"var(--smallIcon-width): ",
								smallIconWidth,
								"var(--smallIcon-height): ",
								smallIconHeight
							);
						} else {
							loggError(
								"No smallIcon element found. Cant update CSS var for positioning the progress bar"
							);
						}
					}}
					thumbnailPosition={thumbnailPosition}
					renderCustomControls={renderCustomControls}
					additionalClass={clsx(
						`thumbnail-position-${thumbnailPosition}`
					)}
				/>
			) : (
				<SlideShowPlaceHolder></SlideShowPlaceHolder>
			)}
		</View>
	);
});

SlideShowPage.propTypes = {
	slides: PropTypes.object,
	navNextKey: PropTypes.string,
};

export default SlideShowPage;
