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
	Table,
	TableRow,
	TableHeader,
	TableHeaderItem,
	TableItem,
	TableBody,
} from "spectacle";

import { VERB_GROUPS } from "../../esl/present-simple.verbs.js";

import createTheme from "spectacle/lib/themes/default";
// import Particles from "react-particles-js";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";

import PropTypes from "prop-types";
import clsx from "clsx";
import useLogg from "../hooks/useLogg.jsx";
import usePromiseKeeper from "../hooks/usePromiseKeeper.jsx";
import "./_SleepLessonSlides.scss";
import SLEEP_AND_EMOTIONS_IMAGES from "./SleepAndEmotions.images.js";

import SplitText from "react-pose-text";
import { POSES } from "../../constants/poses.js";

const GLOSSARY = [
	[
		{ word: "seem to", meaning: "נראה  ש..." },
		{ word: "get along", meaning: "להסתדר" },
		{ word: "distinguish", meaning: "להבחין (בין שני דברים)" },
		{ word: "advertise", meaning: "לפרסם" },
		{ word: "engage", meaning: "להתחיל" },
		{ word: "laboratory", meaning: "מעבדה" },
		{ word: "findings", meaning: "ממצאים" },
		{ word: "differ", meaning: "שונה (פועל)" },
		{ word: "varying", meaning: "משתנה (שם-תואר)" },
		{ word: "purpose", meaning: "מטרה  / תכלית" },
	],
	[
		{ word: "conformist", meaning: "אדם שהולך עם הזרם" },
		{ word: "emotionally", meaning: "רגשית" },
		{ word: "stable", meaning: "יציב" },
		{ word: "overt", meaning: "גלוי" },
		{ word: "involve", meaning: "מערב / כולל" },
		{ word: "rather than", meaning: "על פני" },
	],
	[
		{ word: "in contrast", meaning: "בניגוד" },
		{ word: "nonconformist", meaning: "אדם שהולך נגד הזרם" },
		{ word: "somewhat", meaning: "במידת-מה" },
		{ word: "withdrawn", meaning: "מופנם" },
		{ word: "evidence", meaning: "עדויות" },
		{ word: "mild", meaning: "מתון" },
		{ word: "anxiety", meaning: "חרדה" },
		{ word: "depression", meaning: "דיכאון" },
	],

	[
		{ word: "tempted", meaning: "התפתה" },
		{ word: "classify", meaning: "לסווג" },
		{ word: "restless", meaning: "חסר מנוח" },
		{ word: "compensate", meaning: "לפצות" },
		{ word: "amount", meaning: "כמות" },
		{ word: "state", meaning: "מצב" },
		{ word: "recuperation", meaning: "התאוששות" },
		{ word: "consciousness", meaning: "מודעות" },
	],

	[
		{ word: "mull", meaning: "להתחבט במחשבות" },
		{ word: "propose", meaning: "להציע" },
		{ word: "function", meaning: "תפקוד / לתפקד" },
		{ word: "symptom", meaning: "תסמין" },
		{ word: "intentionally", meaning: "במכוון" },
		{ word: "avoid", meaning: "להמנע" },
		{ word: "subconscious", meaning: "תת-מודע" },
		{ word: "examine", meaning: "לבחון" },
	],
];

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

const { SPECIAL, S, ES, IES } = VERB_GROUPS;

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
			className="slide--heading---1"
		>
			<span className={"title-sleep"}>Sleep </span>
			<span className={"title-emotions"}> & Emotions</span>
		</Heading>
	);
};

const Subheader = ({
	text = "Sleep and Emotions",
	headerLevel = 2,
	className = "",
}) => {
	return (
		<div>
			<Heading
				size={6}
				className={`slide--heading---${headerLevel} ${
					className ? className : ""
				}`}
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

const SnobSubHeader = () => {
	return (
		<Subheader
			text="She, he & it"
			headerLevel={3}
			className="snob-header"
		></Subheader>
	);
};

//let animationFrame;
const label = "PresentSimpleDeck";

const getImageSizeName = (size) => {
	if (!size) {
		debugger;
	}
	let imageSize;
	switch (size) {
		case "large":
			imageSize = "regular";
			break;
		case "medium":
			imageSize = "regular";
			break;
		case "small":
			imageSize = "small";
			break;
		default:
			debugger;
			//If none of the above is the case..
			imageSize = "regular";
			break;
	}
	return imageSize;
};

const PresentSimpleDeck = React.forwardRef((props, ref) => {
	const { onStateChange, onActives } = props;
	const [appUtils] = useContext(AppContext);
	const { DURATIONS, loadImage } = appUtils;
	const mediaContext = useContext(DeviceContext);
	const [imageSize, setImageSize] = useState(
		getImageSizeName(mediaContext.size)
	);
	const promiseKeeper = usePromiseKeeper({ label });
	const [slide, setSlide] = useState({});
	const [slideStep, setSlideStep] = useState(0);

	const sharedRefs = useRef({});

	const { logg, loggError } = useLogg({ label });

	useEffect(() => {
		// Object.values(SLEEP_AND_EMOTIONS_IMAGES).map((imageUrls) => {
		// 	const { full, regular } = imageUrls;
		// 	if (regular) {
		// 		loadImage(regular);
		// 	}
		// 	if (full) {
		// 		loadImage(full);
		// 	}
		// });

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

	useEffect(() => {
		setImageSize(getImageSizeName(mediaContext.size));
	}, [mediaContext.size]);

	useEffect(() => {
		logg("imageSize: ", imageSize);
		Object.values(SLEEP_AND_EMOTIONS_IMAGES).map((imageUrls, i) => {
			// const { full, regular } = imageUrls;

			// if (regular) {
			// 	loadImage(regular);
			// }
			if (imageUrls[imageSize]) {
				logg(`loading ${imageSize} size image`);
				loadImage(imageUrls[imageSize]);
			}
		});
	}, [imageSize]);

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
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.cat_sleeping[imageSize]}
			></Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.cat_sleeping[imageSize]}
			>
				<Heading
					size={1}
					fit
					caps
					lineHeight={1}
					textColor="var(--white)"
				>
					<span className={"title-sleep"}>Sleep </span> &
					<span className={"title-emotions"}> Emotions</span>
				</Heading>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.someone_sleeping.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateX(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateX(0%)",
						},
						{
							opacity: 0,
							transform: "translateX(-100%)",
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
							className={"slide--example-text"}
							margin="10px 0 0"
							textColor="black"
						>
							Ninety-nine percent of adult Americans average seven
							to eight hours a night. The rest seem to need more
							than nine hours, or get along nicely on less than
							six. What distinguishes the long and short sleepers
							from the majority? To get some answers, psychiatrist
							Ernest L. Hartmann, 36, advertised in Boston and New
							York papers for long and short sleepers to engage in
							an eight-night “sleep-in” at Boston State Hospital
							‘s Sleep and Dream laboratory, which Hartmann
							directs. His findings indicate that such people
							differ from ordinary sleepers -- and each other --
							not so much physically as psychologically. For them
							sleep serves varying, sometimes surprising purposes.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.someone_sleeping.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader text="Glossary"></Subheader>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderItem
								className={"v1 glossary--word stroke"}
							>
								Word / Phrase
							</TableHeaderItem>
							<TableHeaderItem
								className={"vSnob glossary--definition stroke"}
							>
								Meaning
							</TableHeaderItem>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.values(GLOSSARY[0]).map((item, i) => {
							const { word, meaning } = item;
							return (
								<TableRow key={i}>
									<TableItem
										className={
											"v1 glossary--word stroke readable"
										}
									>
										{word}
									</TableItem>
									<TableItem
										className={
											"vSnob glossary--definition stroke readable"
										}
									>
										{meaning}
									</TableItem>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Slide>
			<Slide
				transition={["none"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.someone_sleeping.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader text="Discussion"></Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
					}}
					toStyle={[
						{
							opacity: 1,
						},
						{
							opacity: 0,
						},
					]}
					easing={"quadInOut"}
				>
					<List className="centered--important">
						<ListItem>
							How do you think long sleepers differ from short
							sleepers physically?
						</ListItem>
						<ListItem>How do they differ psychologically?</ListItem>
					</List>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.woman_sleeping.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateX(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateX(0%)",
						},
						{
							opacity: 0,
							transform: "translateX(-100%)",
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
							className={"slide--example-text"}
							margin="10px 0 0"
							textColor="black"
						>
							Testing showed significant psychological differences
							between long and short sleepers. The shorts tended
							to be conformists and emotionally stable: “a
							successful and relatively healthy bunch with very
							little overt psychopathology ,” says Hartmann.
							“Their entire life-style involved keeping busy and
							avoiding psychological problems rather than facing
							them. “ They also woke up seldom during the night
							and arose in the morning refreshed and ready to go.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.woman_sleeping.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader text="Glossary"></Subheader>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderItem
								className={"v1 glossary--word stroke"}
							>
								Word / Phrase
							</TableHeaderItem>
							<TableHeaderItem
								className={"vSnob glossary--definition stroke"}
							>
								Meaning
							</TableHeaderItem>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.values(GLOSSARY[1]).map((item, i) => {
							const { word, meaning } = item;
							return (
								<TableRow key={i}>
									<TableItem
										className={
											"v1 glossary--word stroke readable"
										}
									>
										{word}
									</TableItem>
									<TableItem
										className={
											"vSnob glossary--definition stroke readable"
										}
									>
										{meaning}
									</TableItem>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.baby_sleeping.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateX(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateX(0%)",
						},
						{
							opacity: 0,
							transform: "translateX(-100%)",
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
							className={"slide--example-text"}
							margin="10px 0 0"
							textColor="black"
						>
							Long sleepers, in contrast, checked out as
							nonconformist, shy, and somewhat withdrawn, and
							melancholy. Reports Hartmann: “Almost all showed
							evidence of some aggressive functioning.” Some
							betrayed “mild anxiety” and depression. Moreover,
							they slept fitfully, woke up often and typically got
							up with a mild case of morning blahs.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.baby_sleeping.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader text="Glossary"></Subheader>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderItem
								className={"v1 glossary--word stroke"}
							>
								Word / Phrase
							</TableHeaderItem>
							<TableHeaderItem
								className={"vSnob glossary--definition stroke"}
							>
								Meaning
							</TableHeaderItem>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.values(GLOSSARY[2]).map((item, i) => {
							const { word, meaning } = item;
							return (
								<TableRow key={i}>
									<TableItem
										className={
											"v1 glossary--word stroke readable"
										}
									>
										{word}
									</TableItem>
									<TableItem
										className={
											"vSnob glossary--definition stroke readable"
										}
									>
										{meaning}
									</TableItem>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.baby_sleeping.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader text="Discussion"></Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
					}}
					toStyle={[
						{
							opacity: 1,
						},
						{
							opacity: 0,
						},
					]}
					easing={"quadInOut"}
				>
					<List className="centered--important">
						<ListItem>
							Are you a long sleeper or a short sleeper?
						</ListItem>
						<ListItem>
							Do you fit Heartmann’s definition of sleepers of
							your kind?
						</ListItem>
					</List>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.deep_sleep.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateX(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateX(0%)",
						},
						{
							opacity: 0,
							transform: "translateX(-100%)",
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
							className={"slide--example-text"}
							margin="10px 0 0"
							textColor="black"
						>
							At first Hartmann was tempted to classify the
							restless long sleepers as “well-compensated
							insomniacs” who had to spend more hours in bed
							simply to get enough sleep. He changed his mind with
							the discovery that long, short and average sleepers
							all spend about the same amount of time in what
							researchers call “slow-wave sleep”, the deep and
							relatively dreamless state, totaling some 75 minutes
							a night, when people are presumed to get their real
							recuperation from the activities of the previous
							day. Additionally, Hartmann concluded that long
							sleepers spend nearly twice as much as others in REM
							(rapid eye movement) sleep - a state in which the
							sleeper’s brain is as active as in full
							consciousness.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.deep_sleep.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader text="Glossary"></Subheader>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderItem
								className={"v1 glossary--word stroke"}
							>
								Word / Phrase
							</TableHeaderItem>
							<TableHeaderItem
								className={"vSnob glossary--definition stroke"}
							>
								Meaning
							</TableHeaderItem>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.values(GLOSSARY[3]).map((item, i) => {
							const { word, meaning } = item;
							return (
								<TableRow key={i}>
									<TableItem
										className={
											"v1 glossary--word stroke readable"
										}
									>
										{word}
									</TableItem>
									<TableItem
										className={
											"vSnob glossary--definition stroke readable"
										}
									>
										{meaning}
									</TableItem>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.deep_sleep.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader text="Discussion"></Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
					}}
					toStyle={[
						{
							opacity: 1,
						},
						{
							opacity: 0,
						},
					]}
					easing={"quadInOut"}
				>
					<List className="centered--important">
						<ListItem>
							If all people spend the same amount of time in a
							deep-sleep, why do some of them sleep more than
							others?
						</ListItem>
					</List>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.dream_tree.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateX(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateX(0%)",
						},
						{
							opacity: 0,
							transform: "translateX(-100%)",
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
							className={"slide--example-text"}
							margin="10px 0 0"
							textColor="black"
						>
							REM sleep is dream sleep. In addition to the long
							sleeper’s measurably greater need to dream -- that
							is, to mull over the problems of wakeful life -
							psychiatrist Hartmann proposes another function of
							sleep. Since the long sleeper shows more symptoms of
							emotional problems than the short sleeper, which
							intentionally avoids his problems anyway, it seems
							that he may use his hours in bed to give his
							subconscious sleeping self more time to examine
							these problems, and, if possible, to work them out.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.dream_tree.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader text="Glossary"></Subheader>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderItem
								className={"v1 glossary--word stroke"}
							>
								Word / Phrase
							</TableHeaderItem>
							<TableHeaderItem
								className={"vSnob glossary--definition stroke"}
							>
								Meaning
							</TableHeaderItem>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.values(GLOSSARY[4]).map((item, i) => {
							const { word, meaning } = item;
							return (
								<TableRow key={i}>
									<TableItem
										className={
											"v1 glossary--word stroke readable"
										}
									>
										{word}
									</TableItem>
									<TableItem
										className={
											"vSnob glossary--definition stroke readable"
										}
									>
										{meaning}
									</TableItem>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.dream_tree.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader text="Discussion"></Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
					}}
					toStyle={[
						{
							opacity: 1,
						},
						{
							opacity: 0,
						},
					]}
					easing={"quadInOut"}
				>
					<List className="centered--important">
						<ListItem>
							Have you ever felt relieved after a dream? If so,
							what was the dream about? (you don't have to share
							your answer)
						</ListItem>
					</List>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={SLEEP_AND_EMOTIONS_IMAGES.lying_at_ease[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Heading
					size={1}
					fit
					caps
					lineHeight={1}
					textColor="var(--white)"
				>
					<span className={"present title-sleep"}>Good </span>
					<span className={"title-emotions"}>job!</span>
				</Heading>
				<Appear>
					<Text
						margin="10px 0 0"
						textColor="black"
						className="slide--heading-3"
						fit
					>
						Have a nice day!
					</Text>
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
