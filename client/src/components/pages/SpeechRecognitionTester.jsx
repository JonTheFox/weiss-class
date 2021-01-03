import React, { useState, useContext, useEffect, useCallback } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";

import View from "../layout/View.jsx";
import ImageCard from "../partials/ImageCard.jsx";
import ANIMALS from "../../items/animals-items.js";
import SpeechRecognizer from "../../lib/SpeechRecognizer";

import Typography from "@material-ui/core/Typography";
import Prompt from "../partials/Prompt.jsx";
import "./_SpeechRecognitionTester.scss";
import BasicTable from "../partials/SuperBasicTable.jsx";

// const OpacityBox = posed.div({
// 	visible: {
// 		opacity: 1,
// 		// zIndex: 1500,
// 		transition: {
// 			duration: DURATIONS.enter
// 		}
// 	},
// 	hidden: {
// 		opacity: 0,
// 		// zIndex: -1,
// 		transition: {
// 			duration: DURATIONS.exit
// 		}
// 	}
// });

let animationFrame;
let logg;
let promiseKeeper;
const label = "SpeechRecognizerTester";

const columns = [
	{ title: "Word(s)", field: "word" },
	{
		title: "Recognized",
		field: "recognized",
		mapFn: val => (val ? "Yes!" : "No")
	}
];

const SpeechRecognizerTester = React.forwardRef((props, ref) => {
	const [appUtils] = useContext(AppContext);
	const { Logger, PromiseKeeper, pickRandomFrom } = appUtils;

	const [items, setItems] = useState([]);
	const [matchedItemIndex, setMatchedItemIndex] = useState(-1);
	const [results, setResults] = useState([]);
	const [feedback, setFeedback] = useState(null);
	const [showFeedback, setShowFeedback] = useState(false);
	// const [showCorrectItem, setShowCorrectItem] = useState(false);
	// const [showError, setShowError] = useState(false);

	const startRecognition = useCallback((ev, words, itemIndex) => {
		ev.preventDefault();
		ev.stopPropagation();

		const speechRecognizer = new SpeechRecognizer([...words], {
			onResult: finalResult => {
				const { allMatched, wordResults } = finalResult;

				const tableEntries = wordResults.map(
					({ word, index, matched }) => ({
						word,
						recognized: matched
					})
				);

				animationFrame = window.requestAnimationFrame(() => {
					setResults(tableEntries);
					setMatchedItemIndex(itemIndex);
					setFeedback({
						eventType: allMatched ? "correct" : "incorrect"
					});
					promiseKeeper
						.stall(6700, "wait-till-remove-feedback")
						.then(() => {
							setMatchedItemIndex(-1);
							setFeedback(null);
						});
				});
			},
			onNoMatch: () => {
				setFeedback({ eventType: "incorrect" });
				setShowFeedback(true);
				promiseKeeper.stall(3000, "fadeout-feedback").then(() => {
					setShowFeedback(false);
				});
			},
			onError: (recognition, errReason, err) => {
				logg("error in recognition: ", errReason);
				// setShowError(true);
			}
		});
		speechRecognizer.listen();
		promiseKeeper.stall(4500, "listening timeout").then(() => {
			speechRecognizer.stopListening();
			logg("time is up for speechRecognizer");
		});
	}, []);

	useEffect(() => {
		logg = new Logger({ label }).logg;
		promiseKeeper = new PromiseKeeper({ label });
		setItems(pickRandomFrom(ANIMALS.items, 4));
		return () => {
			promiseKeeper.clearAll();
			cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {}, []);

	return (
		<View
			id={label}
			ref={ref}
			animate={false}
			className="SpeechRecognizerTester"
		>
			<section className={clsx("section title-section")}>
				<Typography className={"title"} align="center">
					Select & Say
				</Typography>
			</section>

			<section
				className={clsx(
					"section items-section",
					showFeedback && showFeedback
				)}
			>
				<ul>
					{items.map((item, i) => {
						const matched = matchedItemIndex === i;
						return (
							<li
								className={clsx("shadow", matched && "matched")}
								onClick={ev => {
									startRecognition(ev, [item.name], i);

									// setMatchedItemIndex(i);
									// const isCorrect = issy.getRandomUpTo(1)
									// 	? true
									// 	: false;

									// setFeedback({
									// 	eventType: isCorrect
									// 		? "correct"
									// 		: "incorrect"
									// });
									// setShowCorrectItem(true);

									// const tableEntries = [
									// 	{
									// 		word: "Recognized word",
									// 		index: 0,
									// 		matched: true
									// 	},
									// 	{
									// 		word: "Unrecognized word",
									// 		index: -1,
									// 		matched: false
									// 	}
									// ].map(({ word, index, matched }) => ({
									// 	word,
									// 	recognized: matched
									// }));

									// setResults(tableEntries);
									// promiseKeeper.every(700, () => {
									// 	setShowCorrectItem(prev => !prev);
									// });

									// promiseKeeper
									// 	.stall(
									// 		2000,
									// 		"stall till stop showing correct item"
									// 	)
									// 	.then(() => {
									// 		setShowCorrectItem(false);
									// 	});

									// animationFrame = window.requestAnimationFrame(
									// 	() => {
									// 		setMatchedItemIndex(i);
									// 		setFeedback({
									// 			eventType: "correct"
									// 		});
									// 		promiseKeeper
									// 			.stall(
									// 				6700,
									// 				"fadeout-matched-item"
									// 			)
									// 			.then(() => {
									// 				setMatchedItemIndex(-1);
									// 				setFeedback(null);
									// 			});
									// 	}
									// );
								}}
								key={`li-${i}`}
							>
								<ImageCard
									imgURL={item.imgURL}
									label={item.label}
									showHeader={true}
								/>
							</li>
						);
					})}
				</ul>
			</section>

			<section className={"section results-section"}>
				<BasicTable
					columns={columns}
					data={results}
					tableClass={"results-table"}
				/>
			</section>
			<section className={clsx("section feedback-section")}>
				<Prompt
					content={feedback}
					active={true}
					showOnce={true}
					key={"prompty"}
				/>
			</section>
		</View>
	);
});

SpeechRecognizerTester.propTypes = {
	onSuccess: PropTypes.func,
	items: PropTypes.arrayOf(PropTypes.object)
};

export default SpeechRecognizerTester;

/*

<Table
					columns={columns}
					data={results}
					editable={false}
					paging={false}
					emptyMsg={"Pick an item"}
					options={{
						rowStyle: {
							overflow: "hidden"
						},
						pageSize: 1
					}}
					numRows={1}
				></Table>
*/
