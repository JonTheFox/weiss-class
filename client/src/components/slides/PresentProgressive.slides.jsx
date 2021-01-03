import React, {
	useState,
	useContext,
	useEffect,
	useRef,
	//useCallback,
} from "react";
import {
	BlockQuote,
	Anim,
	Cite,
	Deck,
	Heading,
	Image,
	List,
	ListItem,
	Quote,
	Slide,
	Text,
	GoToAction,
	Appear,
} from "spectacle";

import SnobTable from "../pages/PresentSimpleVerbTable.jsx";

/*

<GoToAction slide={4} />
*/

import createTheme from "spectacle/lib/themes/default";
// import Particles from "react-particles-js";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import useLogg from "../hooks/useLogg.jsx";
import usePromiseKeeper from "../hooks/usePromiseKeeper.jsx";
import "./_PresentSimpleSlides.scss";
import PRESENT_SIMPLE_IMAGES from "./PresentSimple.images.js";

import SplitText from "react-pose-text";
import { POSES } from "../../constants/poses.js";

const theme = createTheme(
	{
		primary: "var(--white)", //bg color
		// secondary: "#1F2022",
		secondary: "var(--secondary)",
		// tertiary: "#03A9FC", //blue
		tertiary: "var(--canvas)", //blue
		//navigation
		quaternary: "#CECECE", //dark gray
		// quaternary: "var(--transparent-black)"
		white: "var(--white)",
		canvas: "var(--canvas)",
		transparent_white: "var(--transparent-white)",
		transparent_black: "var(--transparent-black)",
		red_1: "var(--red-1)",
		red_2: "var(--red-2)",
		red_3: "var(--red-3)",
		green: "var(--green)",
		yellow: "var(--yellow)",
		dark_pink: "var(--dark-pink)",
		blue: "var(--eye-base)",
	},
	{
		// primary: "Montserrat",
		primary: "Nunito",
		// secondary: "Helvetica"
		secondary: "Helvetica",
	}
);

const images = [
	{
		original: "https://picsum.photos/id/1018/1000/600/",
		thumbnail: "https://picsum.photos/id/1018/250/150/",
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

const IMAGES = {
	snowyTrees: {
		full:
			"https://images.unsplash.com/photo-1486315266606-d0eba0503f62?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
		regular:
			"https://images.unsplash.com/photo-1486315266606-d0eba0503f62?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
		small:
			"https://images.unsplash.com/photo-1486315266606-d0eba0503f62?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
	},
};

const PresentSimpleHeader = () => {
	return (
		<Heading
			size={3}
			caps
			lineHeight={1}
			textColor="var(--white)"
			className="slide--heading-1"
		>
			<span className={"title-present"}>Present </span>
			<span className={"title-simple"}>Simple</span>
		</Heading>
	);
};

const Subheader = ({ text = "Routine", className = "" }) => {
	return (
		<div>
			<Heading
				size={6}
				className={`slide--heading-2 ${className ? className : ""}`}
				margin="100 100"
				textColor="white"
				size={2}
				bold
			>
				<span className="clear">{text}</span>
			</Heading>
		</div>
	);
};

//let animationFrame;
const label = "PresentSimpleDeck";

const PresentSimpleDeck = React.forwardRef((props, ref) => {
	const { onStateChange, onActives } = props;
	const [appUtils] = useContext(AppContext);
	const { DURATIONS, loadImage } = appUtils;
	const promiseKeeper = usePromiseKeeper({ label });
	const [slide, setSlide] = useState({});
	const [slideStep, setSlideStep] = useState(0);

	const sharedRefs = useRef({});

	const { logg, loggError } = useLogg({ label });

	useEffect(() => {
		Object.values(PRESENT_SIMPLE_IMAGES).map((imageUrls) => {
			const { full } = imageUrls;
			if (full) {
				loadImage(full);
			}
		});
		return () => {
			promiseKeeper.clearAll();
		};
	}, []);

	useEffect(() => {
		const { current } = sharedRefs;
		current.prevSlide = current.slide;
		current.slide = slide;
		logg("current slide: ", slide);
	}, [slide]);

	return (
		<Deck
			theme={theme}
			transition={["fade"]}
			slide--heading-1={500}
			className={"PresentSimpleDeck"}
			onStateChange={(prevState, incomingState) => {
				setSlide(incomingState);
				if (incomingState === "weiss-logo") {
					promiseKeeper.stall(DURATIONS.enter * 2, () => {
						setSlideStep(1);
					});
					promiseKeeper.stall(DURATIONS.enter * 6, () => {
						setSlideStep(2);
					});
				}
			}}
		>
			<Slide
				className={clsx(
					"Present-Simple--slide",
					`${label}--slide`,
					"slide",
					`slide-step--${slideStep}`
				)}
				transition={["fade"]}
				bgColor="black"
				state="weiss-logo"
				onActive={(slideIndex) => {
					logg(`Slide ${slideIndex}`);
				}}
				autoplay={true}
			>
				<Heading
					size={1}
					fit
					caps
					lineHeight={1}
					textColor="var(--white)"
					className="weiss-logo changing-color--primary"
				>
					Weiss
				</Heading>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateX(-200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateX(0%)",
						},
					]}
					easing={"quadInOut"}
					onAnim={(forwards, animIndex) => {
						console.log("forwards ", forwards);
						console.log("animIndex ", animIndex);
					}}
				>
					<div>
						<Text
							className="changing-color--secondary clear-and-nice"
							margin="10px 0 0"
							textColor="white"
							fit
							bold
						>
							<span className="clear">clear</span>
							<span className="ampersand"> & </span>
							<span className="nice">nice</span>
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				className={clsx(`${label}--slide`, `slide-step--${slideStep}`)}
				transition={["slide"]}
				bgColor="secondary"
				bgImage={IMAGES.snowyTrees.full}
			>
				<Heading size={5} fit caps lineHeight={1} textColor="canvas">
					<span className={"title-present"}>Present </span>
					<span
						className={
							"progress-verb title-progressive changing-color--progressive"
						}
					>
						Progressive
					</span>
				</Heading>

				<Appear>
					<Heading
						//fontSize={"2rem"}
						size={5}
						margin="10px 0 0"
						textColor="secondary"
						bold
						fill
						className={"slide--heading-3"}
					>
						<span className={"normal"}>It's snow</span>
						<span>
							<SplitText
								wordPoses={POSES.word__draggable}
								charPoses={POSES.char__wobbling}
								className={"letter changing-color--progressive"}
								initial={"dragEnd"}
								initialPose={"dragEnd"}
							>
								ing!
							</SplitText>
						</span>
					</Heading>
				</Appear>
			</Slide>
		</Deck>
	);
});

PresentSimpleDeck.propTypes = {
	onStateChange: PropTypes.object,
	onActives: PropTypes.func,
};

export default PresentSimpleDeck;

/*

<Appear>
					<Text
						margin="10px 0 0"
						textColor="black"
						className="slide--heading-3"
					>
						Our routine, activities, habits, etc.
					</Text>
				</Appear>
*/
