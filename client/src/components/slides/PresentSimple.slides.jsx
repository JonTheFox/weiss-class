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

/*

<GoToAction slide={4} />
*/

import createTheme from "spectacle/lib/themes/default";
// import Particles from "react-particles-js";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";

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

const { SPECIAL, S, ES, IES } = VERB_GROUPS;

const PresentSimpleHeader = () => {
	return (
		<Heading
			size={3}
			caps
			lineHeight={1}
			textColor="var(--white)"
			className="slide--heading---1 readable"
		>
			<span className={"title-present"}>Present </span>
			<span className={"title-simple readable"}>Simple</span>
		</Heading>
	);
};

const Subheader = ({
	text = "Routine",
	headerLevel = 2,
	className = "",
	children,
}) => {
	return (
		<div>
			<Heading
				size={6}
				className={`slide--heading---${headerLevel} readable ${
					className ? className : ""
				}`}
				margin="100 100"
				textColor="white"
				size={2}
				bold
			>
				{children}
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
			imageSize = "regular";
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
		// Object.values(PRESENT_SIMPLE_IMAGES).map((imageUrls) => {
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
		Object.values(PRESENT_SIMPLE_IMAGES).map((imageUrls, i) => {
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
				transition={["slide"]}
				bgColor="primary"
				bgImage={
					"https://images.unsplash.com/photo-1508060698845-34709bc12e1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ"
				}
			>
				<Heading
					size={1}
					fit
					caps
					lineHeight={1}
					textColor="var(--white)"
					className="readable"
				>
					<span className={"present title-present"}>Present </span>
					<span className={"title-simple"}>Simple</span>
				</Heading>
				<Appear>
					<Text
						margin="20px 0 0"
						textColor="black"
						className="slide--heading-3 readable"
					>
						<span className={"present"}>Life, </span>in general.
					</Text>
				</Appear>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.studying_and_writing[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple">Facts</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							className={"slide--example-text readable"}
							margin="10px 0 0"
							textColor="black"
						>
							I am a student. I study law at Stanford University.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.eating_breakfast[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader
					className={"snob-sub-sub-header title-simple readable"}
				>
					Facts
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
					onAnim={(forwards, animIndex) => {
						console.log("forwards ", forwards);
						console.log("animIndex ", animIndex);
					}}
				>
					<div>
						<List>
							<ListItem
								className={
									"slide--example-text readable bullet"
								}
								margin="10px 0 0"
								textColor="black"
							>
								Breakfast <span className="snob">is</span> the
								most important meal of the day.
							</ListItem>

							<ListItem
								className={
									"slide--example-text readable bullet"
								}
								margin="10px 0 0"
								textColor="black"
							>
								Breakfast <span className="snob">is</span>{" "}
								<span className="not">not</span> important at
								all.
							</ListItem>
						</List>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="black"
				textColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.couple_in_fron_of_sunset.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple">Proverbs</Subheader>
				<BlockQuote>
					<Quote>
						"The love that you give is the love that you receive."
					</Quote>
				</BlockQuote>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="black"
				textColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.circular_staircase.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple">Proverbs</Subheader>
				<BlockQuote className="dark-bg--mild">
					<Quote>"What goes around, comes around. "</Quote>
				</BlockQuote>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.preparing_lunch[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple">Hobbies</Subheader>
				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
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
							className={"slide--example-text readable"}
							margin="10px 0 0"
							textColor="black"
						>
							Tom and Sharon like to cook together.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.alarm_clock.regular}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple">Routine</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							className={"slide--example-text readable"}
							margin="10px 0 0"
							textColor="black"
						>
							Every day I wake up at 7 o'clock.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.driving_first_person[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple">Routine</Subheader>
				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							I often drive to work.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.taking_the_bus[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple">Routine</Subheader>
				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							className={"slide--example-text readable"}
							margin="10px 0 0"
							textColor="black"
						>
							I sometimes take the bus.
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={
					PRESENT_SIMPLE_IMAGES.couple_with_dog_strolling_on_beach[
						imageSize
					] ||
					PRESENT_SIMPLE_IMAGES.couple_with_dog_strolling_on_beach
						.full
				}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Subheader className="title-simple readable">
					<span className="snob">Special</span> Verb Forms
				</Subheader>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderItem className={"v1 stroke"}>
								I / we / you / they
							</TableHeaderItem>
							<TableHeaderItem className={"vSnob stroke"}>
								He / she / it
							</TableHeaderItem>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.values(VERB_GROUPS[0].verbs).map((item, i) => {
							const { v1, vSnob } = item;

							return (
								<TableRow key={i}>
									<TableItem className={"v1 stroke readable"}>
										{v1}
									</TableItem>
									<TableItem
										className={"vSnob stroke readable"}
									>
										{vSnob}
									</TableItem>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						{" "}
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							When they have free time, Sherry and Shawn take a
							stroll on the beach.
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							Most of the time, though, they{" "}
							<span className="present">do</span>
							<span className="not">n't</span> go together.
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={
					PRESENT_SIMPLE_IMAGES.young_woman_looking_at_the_beach[
						imageSize
					]
				}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					<span className="snob">Special</span> Verb Forms
				</Subheader>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderItem className={"v1 stroke"}>
								I / we / you / they
							</TableHeaderItem>
							<TableHeaderItem className={"vSnob stroke"}>
								He / she / it
							</TableHeaderItem>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.values(VERB_GROUPS[0].verbs).map((item, i) => {
							const { v1, vSnob } = item;

							return (
								<TableRow key={i}>
									<TableItem className={"v1 stroke readable"}>
										{v1}
									</TableItem>
									<TableItem
										className={"vSnob stroke readable"}
									>
										{vSnob}
									</TableItem>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						{" "}
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							Sherry <span className={"snob"}>is</span> a software
							engineer. She work<span className={"snob"}>s</span>{" "}
							12 hours a day, so she{" "}
							<span className={"snob"}>has</span> little free
							time. She <span className="present">do</span>
							<span className={"snob"}>es</span>
							<span className="not">n't</span> go to the beach
							often.
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={
					PRESENT_SIMPLE_IMAGES.smartphone[imageSize] ||
					PRESENT_SIMPLE_IMAGES.smartphone.full
				}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Subheader className="title-simple readable">
					Verb + <span className="snob">s</span>
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateX(-200%) translateY(0%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateX(0%) translateY(0%)",
						},
						{
							opacity: 1,
							transform: "translateX(0%) translateY(-25%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHeaderItem className={"v1 stroke"}>
										I / we / you / they
									</TableHeaderItem>
									<TableHeaderItem className={"vSnob stroke"}>
										He / she / it
									</TableHeaderItem>
								</TableRow>
							</TableHeader>
							<TableBody>
								{Object.values(VERB_GROUPS[1].verbs).map(
									(item, i) => {
										const { v1, vSnob } = item;

										return (
											<TableRow key={i}>
												<TableItem
													className={
														"v1 stroke readable"
													}
												>
													{v1}
												</TableItem>
												<TableItem
													className={
														"vSnob stroke readable"
													}
												>
													{vSnob}
												</TableItem>
											</TableRow>
										);
									}
								)}
							</TableBody>
						</Table>
					</div>
				</Anim>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
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
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							My phone's battery last
							<span className={"snob"}>s </span> about 5 hours.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={
					PRESENT_SIMPLE_IMAGES.woman_working_on_biceps[imageSize]
				}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					Verb + <span className="snob">s</span>
				</Subheader>

				<SnobSubHeader></SnobSubHeader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
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
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							Jane train<span className={"snob"}>s</span> 4 times
							a week.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.yoga_meditation[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					Verb + <span className="snob">s</span>
				</Subheader>

				<SnobSubHeader></SnobSubHeader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
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
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							The yoga team meet<span className={"snob"}>s</span>{" "}
							once a week.
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.man_surfing[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					Verb + <span className="snob">s</span>
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						{" "}
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							Shawn is a bartender and a surfer. He work
							<span className={"snob"}>s</span> night shifts. He
							go
							<span className={"snob"}>es</span> to the beach
							twice a week and surf
							<span className={"snob"}>s</span>.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={
					PRESENT_SIMPLE_IMAGES.car_mechanic_fixing_car[imageSize]
				}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					Verb + <span className="snob">es</span>
				</Subheader>

				<SnobSubHeader></SnobSubHeader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateX(200%) translateY(0%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateX(0%) translateY(0%)",
						},
						{
							opacity: 1,
							transform: "translateY(-33.33%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHeaderItem className={"v1 stroke"}>
										I / we / you / they
									</TableHeaderItem>
									<TableHeaderItem className={"vSnob stroke"}>
										He / she / it
									</TableHeaderItem>
								</TableRow>
							</TableHeader>
							<TableBody>
								{Object.values(VERB_GROUPS[2].verbs).map(
									(item, i) => {
										const { v1, vSnob } = item;

										return (
											<TableRow key={i}>
												<TableItem
													className={
														"v1 stroke readable"
													}
												>
													{v1}
												</TableItem>
												<TableItem
													className={
														"vSnob stroke readable"
													}
												>
													{vSnob}
												</TableItem>
											</TableRow>
										);
									}
								)}
							</TableBody>
						</Table>
					</div>
				</Anim>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						{" "}
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							Mike <span className={"snob"}>is</span> a car
							mechanic. Whenever one of his friend's car breaks
							down, he fix
							<span className={"snob"}>es</span> it right away. He
							even do
							<span className={"snob"}>es</span> it for free.
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.studying_with_coffee[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Subheader className="title-simple readable">
					Verb + <span className="snob">ies</span>
				</Subheader>

				<SnobSubHeader></SnobSubHeader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateX(0%) translateY(-200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateX(0%) translateY(0%)",
						},
						{
							opacity: 1,
							transform: "translateY(-33.33%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHeaderItem className={"v1 stroke"}>
										I / we / you / they
									</TableHeaderItem>
									<TableHeaderItem className={"vSnob stroke"}>
										He / she / it
									</TableHeaderItem>
								</TableRow>
							</TableHeader>
							<TableBody>
								{Object.values(VERB_GROUPS[3].verbs).map(
									(item, i) => {
										const { v1, vSnob } = item;

										return (
											<TableRow key={i}>
												<TableItem
													className={
														"v1 stroke readable"
													}
												>
													{v1}
												</TableItem>
												<TableItem
													className={
														"vSnob stroke readable"
													}
												>
													{vSnob}
												</TableItem>
											</TableRow>
										);
									}
								)}
							</TableBody>
						</Table>
					</div>
				</Anim>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						{" "}
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							Mike <span className={"snob"}>has</span> a lot of
							Spanish-speaking customers. He stud
							<span className={"snob"}>ies </span>Spanish to
							improve the service he provide
							<span className={"snob"}>s</span> them.
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["slide"]}
				bgColor="primary"
				bgImage={
					PRESENT_SIMPLE_IMAGES.negative_facial_expressions[imageSize]
				}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Heading
					size={1}
					fit
					caps
					lineHeight={1}
					textColor="var(--white)"
					className={"readable"}
				>
					<span className="no">Negative</span> Sentences
				</Heading>

				<Appear>
					<Text
						margin="20px 0 0"
						textColor="black"
						className="slide--heading-3 readable"
					>
						<span className={"present"}>Do</span>
						<span className="not">n't</span> &
						<span className={"present"}> do</span>
						<span className="snob">es</span>
						<span className="not">n't</span>
					</Text>
				</Appear>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							"I <span className="present">do</span>
							<span className="no">n't </span>
							understand. "
						</Text>
					</div>
				</Anim>
			</Slide>
			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.baby_not_wanting[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Subheader className="title-simple readable">
					<span className="not">Negative</span> Sentences
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							"We need to go home now. "
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "I <span className="present">do</span>
							<span className="not">n't</span> want to. "
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.woman_disagreeing[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Subheader className="title-simple readable">
					<span className="not">Negative</span> Sentences
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							Amy <span className="present">do</span>
							<span className="snob">es</span>
							<span className="not">n't</span> think that it's a
							good idea.
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["slide"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.question[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Heading
					size={1}
					fit
					caps
					lineHeight={1}
					textColor="var(--white)"
				>
					<span className={"title-simple readable"}>
						YES / <span className="no">No</span> Questions
					</span>
				</Heading>
				<Appear>
					<Text
						margin="20px 0 0"
						textColor="black"
						className="slide--heading-3 readable"
					>
						<span className={"present"}>Do </span> &{" "}
						<span className={"present"}>Do</span>
						<span className="snob">es</span>
					</Text>
				</Appear>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.people_working[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					Yes / <span className="not">No</span> Questions
				</Subheader>
				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							"<span className="present">Do</span> they finish
							work late?"
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "Yes, they <span className="present">do</span>."
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "<span className="no">No</span>, they{" "}
							<span className="present">do</span>
							<span className="no">n't</span>. They finish early."
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={
					PRESENT_SIMPLE_IMAGES.young_man_playing_guitar[imageSize] ||
					PRESENT_SIMPLE_IMAGES.young_man_playing_guitar.regular
				}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					Yes / <span className="not">No</span> Questions
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							"<span className="present">Do</span>
							<span className={"snob"}>es</span> James play the
							guitar?"
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "Yes, he <span className="present">do</span>
							<span className={"snob"}>es</span>. "
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "<span className="no">No</span>, he{" "}
							<span className="present">do</span>
							<span className={"snob"}>es</span>
							<span className="no">n't</span> play the guitar. "
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["slide"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.pondering_woman[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Heading
					size={1}
					fit
					caps
					lineHeight={1}
					textColor="var(--white)"
				>
					<span className={"title-simple readable dark-bg--mild"}>
						WH Questions
					</span>
				</Heading>
				<Appear>
					<Text
						margin="20px 0 0"
						textColor="black"
						className="slide--heading-3 readable dark-bg--mild"
					>
						<span className="title-simple">
							{" "}
							Who, What, Where, When, Which, Why & How
						</span>
					</Text>
				</Appear>
				<Appear>
					<Text
						margin="20px 0 0"
						textColor="black"
						className="slide--heading-3 readable"
					>
						+ <span className={"present"}>Do </span> &{" "}
						<span className={"present"}>do</span>
						<span className="snob">es</span>
					</Text>
				</Appear>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.koala_bear[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					WH Questions
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							"Where <span className={"present"}>do </span> you
							live?"
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "I live in Australia. "
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.flower_bouquet[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					WH Questions
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							"Which flowers{" "}
							<span className={"present"}>do </span> you want?"
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "I want all of them! "
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.female_doctor[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					WH Questions
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							"What <span className={"present"}>do </span> you do
							for a living?"
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "I am a doctor."
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.time_with_children[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					WH Questions
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							"When <span className={"present"}>do</span>
							<span className={"snob"}>es</span> Liz get home from
							work?"
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "She get<span className={"snob"}>s</span> home at
							around 18:30."
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["slide"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.pondering_man[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Heading
					size={1}
					fit
					caps
					lineHeight={1}
					textColor="var(--white)"
				>
					<span className={"title-simple readable dark-bg--mild"}>
						Subject Questions
					</span>
				</Heading>
				<Appear>
					<Text
						margin="20px 0 0"
						textColor="black"
						className="slide--heading-3 readable dark-bg--mild"
					>
						<span className="title-simple readable">
							{" "}
							Who & What
						</span>
					</Text>
				</Appear>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.house[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					Subject Questions
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "Who live<span className="snob">s</span> here?"
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "The Smiths do."
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["fade"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.relaxing_on_boat[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>
				<Subheader className="title-simple readable">
					Subject Questions
				</Subheader>

				<Anim
					transitionDuration={400}
					fromStyle={{
						opacity: 0,
						transform: "translateY(200%)",
					}}
					toStyle={[
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
					]}
					easing={"quadInOut"}
				>
					<div>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "What help<span className="snob">s</span> you
							relax?"
						</Text>
						<Text
							margin="10px 0 0"
							textColor="black"
							className={"slide--example-text readable"}
						>
							- "The ocean. "
						</Text>
					</div>
				</Anim>
			</Slide>

			<Slide
				transition={["slide"]}
				bgColor="primary"
				bgImage={PRESENT_SIMPLE_IMAGES.walk_in_the_park[imageSize]}
			>
				<PresentSimpleHeader></PresentSimpleHeader>

				<Heading
					size={1}
					fit
					caps
					lineHeight={1}
					textColor="var(--white)"
				>
					<span className={"present title-present"}>Good </span>
					<span className={"title-simple readable"}>job!</span>
				</Heading>
			</Slide>
		</Deck>
	);
});

PresentSimpleDeck.propTypes = {
	onStateChange: PropTypes.object,
	onActives: PropTypes.func,
};

export default PresentSimpleDeck;
