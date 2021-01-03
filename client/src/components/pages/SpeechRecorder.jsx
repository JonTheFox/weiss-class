import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
// import PropTypes from "prop-types";
import clsx from "clsx";
import View from "../layout/View.jsx";
import Mic from "@material-ui/icons/Mic";
import Email from "@material-ui/icons/Email";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import posed from "react-pose";
// import { POSES, BASE_POSES } from "../../constants/poses.js";
import DURATIONS from "../../constants/durations.js";

import SpeechRecognizer from "../../lib/SpeechRecognizer";
import "./_SpeechRecorder.scss";
import Select from "../partials/Select.jsx";

// const EMAIL = {
// 	sender: "jonny-weiss@protonmail.com",
// 	subject: "Your Voice Recording is here."
// };

let animationFrame;
let logg;
let promiseKeeper;
const label = "SpeechRecorder";
const TIMEOUT_LABEL = "listening timeout";
const SHOW_LAST_EVENT = false;

const punctuations = ["?", "!", "?!", ":", ";", "."];
const changePunctuation = (transcript = "", mark = "?") => {
	if (!transcript || !mark) return null;
	const trimmed = transcript.trim();
	const ln = trimmed.length;
	// let withoutOldMark = trimmed;

	let markIndexInText;

	//search for any occurunces of any of the supported sentence marks. Get their last index position to get rid of just the last one
	const lastMarkIndex = punctuations.reduce((lastPos, mark) => {
		markIndexInText = trimmed.indexOf(mark);
		return markIndexInText === -1 || markIndexInText < lastPos
			? lastPos
			: markIndexInText;
	}, ln - 1);

	const withoutOldMark = trimmed.slice(0, lastMarkIndex);

	//add the desired mark at the end
	const withNewMark = withoutOldMark + mark + " ";
	return withNewMark;
};

const PosedBox = posed.div({
	visible: {
		//y: "0%",
		opacity: 1,
		// rotateY: "0deg",
		transition: {
			durations: DURATIONS.enter
		}
	},
	hidden: {
		//y: "-100%",
		opacity: 0,
		// rotateY: "45deg",
		transition: {
			durations: DURATIONS.exit
		}
	}
});

const placeholderTexts = {
	he: "אללה בלאגן:) ",
	"en-US": "-- Go ahead, boss. I'm all ears. --"
};

const SpeechRecorder = React.forwardRef((props, ref) => {
	const [appUtils] = useContext(AppContext);
	const { Logger, PromiseKeeper, DEBUGGING } = appUtils;

	const [transcript, setTranscript] = useState("");
	const $transcript = useRef("");

	const [showError, setShowError] = useState(false);
	const [showTextSection, setShowTextSection] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [lastEvent, setLastEvent] = useState({});
	const [markToSet, setMarkToSet] = useState(null);
	const [lang, setLang] = useState("en-US");
	const $refs = useRef({ selectedLang: lang });

	const startRecognition = useCallback(ev => {
		// ev.stopPropagation();
		setShowError(false);

		const speechRecognizer = new SpeechRecognizer([], {
			refs: $refs,
			onResult: ({ transcript, confidence }) => {
				animationFrame = window.requestAnimationFrame(() => {
					setTranscript(prev => {
						return prev + transcript + ".\n";
					});

					const msg = "Recognized the following: " + transcript;
					logg("onResult(): ", msg);
					if (DEBUGGING && SHOW_LAST_EVENT) {
						setLastEvent({ on: "Result", msg });
					}
				});
			},
			onError: (recognition, errReason, err) => {
				setShowError(true);
				promiseKeeper.clear("timeout", TIMEOUT_LABEL);

				const msg =
					"There was an error in SpeechRecognizer: " + errReason;
				logg("onError():", msg);

				if (DEBUGGING && SHOW_LAST_EVENT) {
					setLastEvent({ on: "Error", msg });
				}
			},
			onSpeechStart: recognition => {
				setIsSpeaking(true);
				const msg = "SpeechRecognizer has started to recognize speech.";
				logg("onSpeechStart():", msg);
				if (DEBUGGING && SHOW_LAST_EVENT) {
					setLastEvent({ on: "SpeechStart", msg });
				}
			},
			onSpeechEnd: recognition => {
				setIsSpeaking(false);
				const msg = "User stopped speaking";
				logg("onSpeechEnd(): ", msg);
				if (DEBUGGING && SHOW_LAST_EVENT) {
					setLastEvent({ on: "SpeechEnd", msg });
				}
			},
			onEnd: recognition => {
				const msg = "SpeechRecognizer has stopped listening.";
				logg("onEnd(): ", msg);

				if (DEBUGGING && SHOW_LAST_EVENT) {
					setLastEvent(prev => {
						return prev.on === "Error" ? prev : { on: "End", msg };
					});
				}

				promiseKeeper.clear("timeout", TIMEOUT_LABEL);
			}
		});
		speechRecognizer.listen();
		// promiseKeeper.stall(4500, TIMEOUT_LABEL).then(() => {
		// 	speechRecognizer.stopListening();
		// 	logg("time's up for speechRecognizer");
		// });
	});

	useEffect(() => {
		logg = new Logger({ label }).logg;
		promiseKeeper = new PromiseKeeper({ label });
		promiseKeeper.stall(1000).then(() => {
			animationFrame = window.requestAnimationFrame(() => {
				setShowTextSection(true);
			});
		});

		// forAll([1, 2, 3], (num, i, arr) => {
		// 	logg(`${i}: `, num);
		// 	if (i >= arr.length) {
		// 		logg("looped over all items: ", arr);
		// 	}
		// });

		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {
		if (markToSet) {
			setTranscript(prev => changePunctuation(prev, markToSet));
			setMarkToSet(null);
		}
	}, [markToSet]);

	useEffect(() => {
		$transcript.current = transcript;
		logg("transcript: ", transcript);
	}, [transcript]);

	useEffect(() => {
		logg("$refs: ", $refs.current);
		const emailLink = $refs.current.sendEmail;
		if (emailLink) {
			emailLink.addEventListener(
				"click",
				function clickHandler(ev) {
					ev.preventDefault();
					ev.stopPropagation();

					//emailLink.removeEventListener('click', clickHandler, false);
				},
				false
			); // function clickHandler
		}
		const selectedLang = $refs.current.selectedLang;
		if (selectedLang) {
			setLang(selectedLang);
			logg("Selected language: ", selectedLang);
		}
	}, [
		$refs,
		$refs.current,
		$refs.current.selectedLang,
		$refs.current.sendEmail
	]);

	const handleSendEmail = useCallback(ev => {
		ev.preventDefault();
		const emailLink = $refs.current.sendEmail;
		if (!emailLink) {
			logg(
				"Can't send email because there is no emailLink (a) DOM element :("
			);
			return;
		}
		const transc = $transcript.current;
		if (!transc) {
			logg("Can't send email because there is no transcript! :(");
			return;
		}

		const siteURL = "Weiss-English.herokuapp.com";

		const NEW_LINE = "%0A";
		const goodbye = `If you enjoyed using our service, be sure to come visit us again at ${siteURL}`;
		const replaceSpaces = str => str.replace(/ /gi, "%20");

		const msgContent =
			emailLink.href +
			transc +
			NEW_LINE.repeat(2) +
			replaceSpaces(goodbye) +
			NEW_LINE.repeat(2);

		emailLink.href = msgContent;

		//create a click DOM event
		const clickEvent = new MouseEvent("click", {
			view: window,
			bubbles: false,
			cancelable: true
		});
		//trigger the event
		const somePrevented = emailLink.dispatchEvent(clickEvent);
		if (somePrevented)
			logg("emailLink's action was prevented by some handler(s)");
	});

	return (
		<View className={clsx("speech-recorder flex")} ref={ref}>
			<div className="background has-before show-before spheres-blob"></div>
			<PosedBox
				className={clsx("text-section")}
				initialPose="hidden"
				pose={showTextSection ? "visible" : "hidden"}
			>
				<div
					className={clsx("text-zone", lang)}
					rows={4}
					aria-label="text-zone"
				>
					{transcript ? transcript : placeholderTexts[lang]}
				</div>
				<ButtonGroup
					className={clsx("sentence-markers")}
					size="small"
					fullWidth
					variant="outlined"
					aria-label="sentence marks"
					color="secondary"
				>
					{punctuations.map((mark, i) => {
						return (
							<Button
								key={`sentenceMark-${i}`}
								className={clsx("sentence-mark-btn")}
								color="secondary"
								onClick={ev => {
									setMarkToSet(mark);
								}}
							>
								{mark}
							</Button>
						);
					})}
				</ButtonGroup>
				<ButtonGroup
					className={clsx("actions")}
					size="small"
					fullWidth
					variant="outlined"
					aria-label="actions"
					color="secondary"
				>
					<Button className={clsx("action email")} color="secondary">
						<a
							href="mailto:jonny-weiss@protonmail.com?subject=Your%20Voice%20Recording%20Is%20Here%20%3A)&amp;body=Hi%2C%20self.%0AHere%20is%20the%20transcript%20of%20your%20recording%3A%20%0A%0A"
							className={clsx("action-link")}
							ref={ref => ($refs.current.sendEmail = ref)}
							onClick={handleSendEmail}
						>
							<Email className={clsx("email-btn")}></Email>
						</a>
					</Button>
				</ButtonGroup>
			</PosedBox>

			<Select label="Language" refs={$refs} />

			{DEBUGGING && SHOW_LAST_EVENT && (
				<PosedBox
					className={clsx("console-section")}
					initialPose="exit"
					pose={lastEvent.on ? "enter" : "exit"}
				>
					<div className={clsx("event-name")}>
						{lastEvent.on ? "on" + lastEvent.on : " "}
					</div>
					<div className={clsx("event-msg")}>
						{lastEvent.msg || " "}
					</div>
				</PosedBox>
			)}

			<Fab
				aria-label={"record-btn"}
				className={"record-btn"}
				color="primary"
				onClick={startRecognition}
			>
				<Mic
					className={clsx(
						"record-icon",
						isSpeaking && "speaking",
						showError && "error"
					)}
				/>
			</Fab>
		</View>
	);
});

// SpeechRecorder.propTypes = {
// 	user: PropTypes.object,
// 	: PropTypes.func,
// };

export default SpeechRecorder;
