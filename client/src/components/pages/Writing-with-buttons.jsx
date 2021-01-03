import React, {
	useState,
	useContext,
	useRef,
	useEffect
	//useCallback
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import View from "../layout/View.jsx";
import "./_Writing.scss";
import "../../styles/_aws-btn.scss";

//import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
//import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
//import OutlinedInput from "@material-ui/core/OutlinedInput";
//import Typography from "@material-ui/core/Typography";
import SplitText from "react-pose-text";
import { POSES } from "../../constants/poses.js";

import { TAGS, tagWords } from "../../esl/partsOfSpeech.js";

import useLogg from "../hooks/useLogg.jsx";
import usePromiseKeeper from "../hooks/usePromiseKeeper.jsx";
import ToolTip from "react-portal-tooltip";
import { AwesomeButtonProgress, AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

let animationFrame;
const label = "Writing";
let PosedText;

const Writing = React.forwardRef((props, ref) => {
	const { texts, onTokenized } = props;
	const [appUtils] = useContext(AppContext);
	const { DURATIONS, posed, climbFrom } = appUtils;
	PosedText = posed.div(POSES.card);
	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const [inputText, setInputText] = useState("");
	const [isTooltipActive, setIsTooltipActive] = useState(true);
	const [taggedWords, setTaggedWords] = useState([]);
	const [selectedWord, setSelectedWord] = useState("");
	const [selectedTaggedWord, setSelectedTaggedWord] = useState([]);

	const sharedRefs = useRef({ taggedWords: [] });

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMouseover = ev => {
		const { currentTarget } = ev;
		const isWord = currentTarget.classList.contains("tagged-word");
		if (!isWord) return;
		openPopup(ev);
	};
	const handleMouseout = ev => {
		const { currentTarget } = ev;
		const isWord = currentTarget.classList.contains("tagged-word");
		if (!isWord) return;
		closePopup(ev);
	};

	const openPopup = ev => {
		const { currentTarget } = ev;
		if (!currentTarget.classList.contains("tagged-word")) return;
		const wordNode = currentTarget;
		wordNode.classList.add("selected");
		const word = wordNode.textContent.trim().toLowerCase();
		const _selectedTaggedWord = taggedWords.find(
			item => item[0].toLowerCase() === word.toLowerCase()
		);

		//highlight "snobbish" words (i.e. those that belong to third-person singular nouns: he/she/it/Joe, etc.)
		if (_selectedTaggedWord[1] === "VBZ") {
			wordNode.classList.add("word--snobbish");
		}
		//set the selected item to the new one
		setSelectedTaggedWord(_selectedTaggedWord);
		setAnchorEl(wordNode);
		setIsTooltipActive(true);
	};

	const closePopup = ev => {
		const { currentTarget } = ev;
		const wordNode = currentTarget;
		wordNode.classList.remove("selected");
		setIsTooltipActive(false);
		setSelectedTaggedWord(null);
		setAnchorEl(null);
	};

	const handleChange = event => {
		setInputText(event.target.value);
	};

	const showTooltip = () => {
		setIsTooltipActive(true);
	};
	const hideTooltip = () => {
		setIsTooltipActive(false);
	};

	const handleGoPress = () => {
		if (!inputText) return;
		setTaggedWords(tagWords(inputText));
	};

	const handleResetPress = btn => {
		// if (!inputText) return;
		const { taggedWords } = sharedRefs.current;

		if (!taggedWords) return;
		//trigger a re-render to revert all transformation done by SplitText

		const newInstance = [...taggedWords];
		debugger;

		setTaggedWords([...taggedWords]);
		// return;

		//It's not clear why this works! lol
		// tagWords() mysteriously gets called again after this
		// setTaggedWords([]);
		//revert all (location) transformations of words
		// nodes.forEach((node, i) => {
		// 	node.style.transform = "";
		// });
	};

	useEffect(() => {
		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {
		if (!taggedWords) return;
		sharedRefs.current.taggedWords = taggedWords;
		setSelectedTaggedWord(null);
		debugger;
	}, [taggedWords]);

	useEffect(() => {
		if (!selectedTaggedWord) return;
		// logg("selectedTaggedWord: ", selectedTaggedWord);
		sharedRefs.current.selectedWord = selectedTaggedWord[0];
	}, [selectedTaggedWord]);

	const partName = selectedTaggedWord?.[2] || "";

	return (
		<View
			className={clsx("Writing vh-max--portrait---minus-appbar")}
			ref={ref}
		>
			<form
				noValidate
				autoComplete="on"
				className={clsx("text-form")}
				onSubmit={async ev => {
					ev.preventDefault();
					handleGoPress(ev?.target?.value);
					return false;
				}}
				name="writingForm"
				id="writingForm"
				ref={ref => {
					if (!ref) return;
					sharedRefs.current.writingForm = ref;
				}}
			>
				<FormControl className={clsx("text-form-control")}>
					<InputLabel htmlFor="component-helper">Sentence</InputLabel>
					<Input
						id="input-sentence"
						value={inputText}
						onChange={handleChange}
						aria-describedby="input-sentence"
						className={clsx("text-form-input")}
					/>
					<div className="row">
						<AwesomeButton
							type="primary"
							ripple
							releaseDelay={500}
							onPress={handleGoPress}
						>
							Go
						</AwesomeButton>
						<AwesomeButton type="secondary" ripple>
							Get Random
						</AwesomeButton>
						<AwesomeButton
							type="google"
							ripple
							onPress={handleResetPress}
						>
							Reset
						</AwesomeButton>
					</div>
				</FormControl>
			</form>
			<section className="taggedWords--section">
				<div
					className="taggedWords--container bg-anim--move---left dynamic-gradient--4-colors readable"
					ref={ref => {
						if (!ref) return;

						const existingNodes =
							sharedRefs.current?.taggedWords?.nodes;
						if (existingNodes?.length) {
							existingNodes.forEach((node, i) => {
								node.removeEventListener(
									"mouseover",
									handleMouseover
								);
							});
						}

						const nodes = Array.from(ref.children);

						nodes.forEach((node, i) => {
							node.classList.add("tagged-word");
							node.addEventListener(
								"mouseover",
								handleMouseover,
								false
							);
							node.addEventListener(
								"mouseout",
								handleMouseout,
								false
							);
						});
						sharedRefs.current.taggedWords.nodes = nodes;
					}}
				>
					<SplitText
						initialPose="exit"
						pose={
							taggedWords && taggedWords.length ? "enter" : "exit"
						}
						charPoses={POSES.char_fadeIn_sentence}
						wordPoses={POSES.word__draggable__remain}
						className={clsx("letterOrWord")}
						key={"instruction"}
					>
						{taggedWords
							.map((taggedWord, i) => {
								return taggedWord[0];
							})
							.join(" ")}
					</SplitText>
				</div>
			</section>
			<div className="control-btns">
				<div className="row">
					<AwesomeButton
						//type="youtube"
						className="btn--back btn--arcade  btn--round"
						onPress={handleResetPress}
					>
						Back
					</AwesomeButton>
				</div>

				<div className="row">
					<AwesomeButton
						//type="youtube"
						className="btn--cancel btn--arcade btn--round"
						onPress={handleResetPress}
					>
						Cancel
					</AwesomeButton>
					<AwesomeButton
						//type="youtube"
						className="btn--ok btn--arcade btn--round"
						onPress={handleResetPress}
					>
						OK
					</AwesomeButton>
				</div>
				<div className="row">
					<AwesomeButton
						//type="youtube"
						className="btn--helper btn--arcade btn--round"
						onPress={handleResetPress}
					>
						Help
					</AwesomeButton>
					<AwesomeButton
						//type="youtube"
						className="btn--special btn--arcade  btn--round"
						onPress={handleResetPress}
					>
						Special
					</AwesomeButton>
				</div>
			</div>

			{anchorEl && (
				<div>
					<ToolTip
						active={isTooltipActive}
						position="bottom"
						arrow="center"
						parent={anchorEl || ref}
					>
						<div>
							<p>{partName}</p>
						</div>
					</ToolTip>
				</div>
			)}
		</View>
	);
});

Writing.propTypes = {
	texts: PropTypes.object,
	onTokenized: PropTypes.func
};

export default Writing;

/*

<FormHelperText id="component-helper-text">
						Valid
					</FormHelperText>

*/

/*

	<div className="color-section primary-darker-1"></div>
			<div className="color-section primary-darker-2"></div>
			<div className="color-section primary-darker-3"></div>
			<div className="color-section primary-darker-4"></div>
			<div className="color-section primary-darker-5"></div>
			<div className="color-section primary"></div>
			<div className="color-section primary-lighter-1"></div>
			<div className="color-section primary-lighter-2"></div>
			<div className="color-section primary-lighter-3"></div>
			<div className="color-section primary-lighter-4"></div>
			<div className="color-section primary-lighter-5"></div>

			<div className="color-section secondary-darker-1"></div>
			<div className="color-section secondary-darker-2"></div>
			<div className="color-section secondary-darker-3"></div>
			<div className="color-section secondary-darker-4"></div>
			<div className="color-section secondary-darker-5"></div>
			<div className="color-section secondary"></div>
			<div className="color-section secondary-lighter-1"></div>
			<div className="color-section secondary-lighter-2"></div>
			<div className="color-section secondary-lighter-3"></div>
			<div className="color-section secondary-lighter-4"></div>
			<div className="color-section secondary-lighter-5"></div>
*/

/*<section className="control--section">
				{" "}
				<div className="row">
					{" "}
					<AwesomeButtonProgress
						type="primary"
						onPress={(ev, next) => {
							// do a sync/async task then call `next()`
							promiseKeeper
								.stall(1000, "promiseLabel")
								.then(() => {
									next();
								})
								.catch(reason => {
									loggError(reason);
								});
						}}
					>
						Primary progress
					</AwesomeButtonProgress>
					<AwesomeButton
						type="primary"
						releaseDelay={DURATIONS.enter * 2} //Delay for releasing the button after the progress animation
						fakePress={false} //When set to true triggers a fake button press
						onPress={(ev, next) => {
							// do a sync/async task then call `next()`
							// promiseKeeper
							// 	.stall(1000, "promiseLabel")
							// 	.then(() => {
							// 		next();
							// 	})
							// 	.catch(reason => {
							// 		loggError(reason);
							// 	});
						}}
					>
						Primary
					</AwesomeButton>
				
				//custom button themes that can be overriden: Facebook,
				Instagram, Twitter, Github, Youtube, Linkedin, Pinterest,
				Reddit, Messenger, Whatsapp and Google Plus
			</section>*/
