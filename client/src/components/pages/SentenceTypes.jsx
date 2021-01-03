import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
// import PropTypes from "prop-types";

import clsx from "clsx";
import Fab from "@material-ui/core/Fab";
import Autorenew from "@material-ui/icons/Autorenew";

import SplitText from "react-pose-text";
import { POSES } from "../../constants/poses.js";
import View from "../layout/View.jsx";
import SuperBasicTable from "../partials/SuperBasicTable.jsx";
import "./_SentenceTypes.scss";

const SENTENCE_TYPES = {
	positive: { label: "+", title: "Positive Sentence" },
	negative: { label: "-", title: "Negative Sentence" },
	yesNoQ: { label: "yes/no ?", title: "Yes/No Question" },
	whQ: { label: "wh?", title: "Wh Question" },
	subjectQ: { label: "subject?", title: "Subject Question" }
};

const SENTENCE_TYPE_NAMES = Object.keys(SENTENCE_TYPES);

const SENTENCE_TYPES_LABELS = ["+", "-", "yes/no ?", "wh?", "subject?"];

const columns = [
	{ title: "Sentence Type", field: "sentence-type" },
	{
		title: "Sentence",
		field: "sentence",
		editable: true
	}
];

const initialData = [
	{
		"sentence-type": SENTENCE_TYPES.positive,
		sentence: "I would go to Venice."
	},
	{
		"sentence-type": SENTENCE_TYPES.negative,
		sentence: "I would not go to Venice."
	},
	{
		"sentence-type": SENTENCE_TYPES.yesNoQ,
		sentence: "Would I go to Venice?"
	},
	{
		"sentence-type": SENTENCE_TYPES.whQ,
		sentence: "Why would I go to Venice?"
	},
	{
		"sentence-type": SENTENCE_TYPES.subjectQ,
		sentence: "Who would go to Venice?"
	}
];

class SentenceTypeRow {
	constructor(rowIndex = 0) {
		this["sentence-type"] = SENTENCE_TYPES_LABELS[rowIndex];
		this.rowName = SENTENCE_TYPE_NAMES[rowIndex];
		this.sentence = "";
	}
}

const createEmptyRows = (rowLabels = SENTENCE_TYPE_NAMES) => {
	const rows = [];
	for (let i = 0; i < rowLabels.length; i++) {
		rows.push(new SentenceTypeRow(i));
	}
	return rows;
};

const tableData = createEmptyRows(SENTENCE_TYPE_NAMES);
for (let i = 0; i < SENTENCE_TYPE_NAMES.length; i++) {
	tableData[i].sentence = initialData[i].sentence;
}

let promiseKeeper;
let logg;
let loggError;
let animationFrame;
const label = "SentenceTypes";

const SentenceTypes = React.forwardRef((props, ref) => {
	const [appUtils] = useContext(AppContext);
	const {
		Logger,
		//handlePress,
		//removePressHandlers,
		//BACKGROUND_CLASSES,
		climbFrom,
		PromiseKeeper,
		DURATIONS
	} = appUtils;

	const [rows, setRows] = useState(tableData);
	const rowsRef = useRef(tableData);
	const tableRef = useRef({});
	const [selectedType, setSelectedType] = useState("");
	const refs = useRef({ viewRef: {} });

	// const [background, setBackground] = useState(
	// 	BACKGROUND_CLASSES.find(bgName => bgName === "spheres-floating") ||
	// 		BACKGROUND_CLASSES[0]
	// );

	const setBackgroundColor = ({ rowIndex }) => {
		try {
			if (!rowIndex) {
				throw new Error(
					"No rowIndex provided to set the background color to"
				);
			}
			rowIndex = parseInt(rowIndex);
			if (isNaN(rowIndex)) throw new Error(`invalid index type`);

			if (
				!refs ||
				!refs.current ||
				!refs.current.viewRef ||
				!refs.current.viewRef.style
			) {
				throw new Error("No viewRef?");
			}

			const { style } = refs.current.viewRef;

			const sentenceType = SENTENCE_TYPE_NAMES[rowIndex];
			setSelectedType(sentenceType);
			let cssVarName = "--color-main";
			let cssVarValue = `var(--${sentenceType}-main)`;
			style.setProperty(cssVarName, cssVarValue);
			logg(`set CSS var ${cssVarName} to: ${cssVarValue}`);
			cssVarName = "--color-secondary";
			cssVarValue = `var(--${sentenceType}-secondary)`;
			style.setProperty(cssVarName, cssVarValue);
			logg(`set CSS var ${cssVarName} to: ${cssVarValue}`);
			cssVarName = "--color-bg";
			cssVarValue = `var(--${sentenceType}-bg)`;
			style.setProperty(cssVarName, cssVarValue);
			logg(`set CSS var ${cssVarName} to: ${cssVarValue}`);
		} catch (err) {
			loggError(err.message);
			return null;
		}
	};

	const empty = ev => {
		const newEmptyTable = createEmptyRows();
		rowsRef.current = newEmptyTable;
		logg(newEmptyTable);
		// setSentences(newEmptyTable);
		animationFrame = window.requestAnimationFrame(() => {
			setSelectedType(SENTENCE_TYPE_NAMES[0]);
			setRows(newEmptyTable);
		});
		promiseKeeper.stall(DURATIONS.enter * 1).then(() => {
			refs.current.sbt.cells[0][1].ref.lastElementChild.focus();
		});
	};

	useEffect(() => {
		promiseKeeper = promiseKeeper || new PromiseKeeper({ label });
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;
		// promiseKeeper
		// 	.stall(DURATIONS.enter, "bindBackgroundKeys")
		// 	.then(() => {
		// 		handlePress({ on: "keyup", key: "PageUp" }, () => {
		// 			goNextBackground();
		// 		});
		// 		handlePress({ on: "keyup", key: "PageDown" }, () => {
		// 			goPrevBackground();
		// 		});
		// 	})
		// 	.catch(reason => {
		// 		loggError(reason);
		// 	});

		const viewRef = refs.current.viewRef;

		return () => {
			// removePressHandlers();
			//remove the overflow--auto class that this componenet added to the main view so it doesnt impact other components
			const mainView = climbFrom(viewRef).upTo({
				className: "view--responsive"
			});
			if (mainView) {
				mainView.classList.remove("overflow--auto");
			}

			window.cancelAnimationFrame(animationFrame);
		};
	}, [PromiseKeeper, Logger, climbFrom]);

	return (
		<View
			className={clsx(
				"sentence-types portrait-only--phone vw-max--portrait vh-max--portrait--minus-appbar",
				selectedType ? `selected-type--${selectedType}` : ""
			)}
			ref={viewRef => {
				if (!viewRef) return;
				const mainView = climbFrom(viewRef).upTo({
					className: "view--responsive"
				});
				if (mainView) {
					mainView.classList.add("overflow--auto");
				}
				refs.current.viewRef = viewRef;
			}}
		>
			<div
				className={clsx(
					"background vh-max--portrait---minus-appbar vw-max--portrait portrait-only--phone has-before show-before",
					// selectedType === "positive" ? "clear-bg" : "bg-changing" ,
					// selectedType === "positive" && "clear-bg",
					"bg-changing"
				)}
			></div>
			<div className={clsx("header-zone")}>
				<div className={clsx("sentence-type--header dynamic-shadow")}>
					<SplitText
						wordPoses={POSES.word__draggable}
						charPoses={POSES.char__draggable}
						className={"letter black-and-blue--children"}
					>
						{selectedType
							? SENTENCE_TYPES[selectedType].title
							: "Sentence Types"}
					</SplitText>
				</div>
			</div>
			<div className={clsx("table-zone")}>
				{" "}
				<SuperBasicTable
					className={
						selectedType ? `selected-type--${selectedType}` : ""
					}
					ref={tableRef}
					sharedRefs={refs}
					columns={columns}
					data={rows}
					tabIndexFirstIndex={1}
					noHeader={true}
					rowClassNames={SENTENCE_TYPE_NAMES}
					columnEvenClass={"type-column"}
					columnOddClass={"text-column readable"}
					renderEvenColumn={cellValue => (
						<div className="ball shiny-ball position--relative">
							<span className="centered">{cellValue}</span>
						</div>
					)}
					onRowFocus={ev => {
						const target = ev.target;
						try {
							const rowElem = climbFrom(target).upTo({
								className: "row"
							});
							const rowIndex = rowElem.className
								.split(" ")
								.slice(-1)[0]
								.split("-")[1];
							setBackgroundColor({ rowIndex });
							logg(
								"set background color to be rowIndex: ",
								rowIndex
							);
						} catch (err) {
							loggError(err.message);
						}
					}}
					onBlur={ev => {
						const target = ev.target;

						try {
							const sentence = target.textContent;
							const rowElem = climbFrom(target).upTo({
								className: "row"
							});
							const rowIndex = rowElem.className
								.split(" ")
								.slice(-1)[0]
								.split("-")[1];
							// const currentRowConten = rowsRef.current[rowIndex];

							if (rowIndex) {
								logg(
									`rowsRef.current[${rowIndex}] has been updated: ${sentence}`,
									rowsRef
								);
								rowsRef.current[rowIndex].sentence = sentence;
								setRows(prev => {
									const newState = [...prev];
									newState[rowIndex].sentence = sentence;
									return newState;
								});
							}
						} catch (err) {
							logg(err.message);
						}
					}}
				/>
			</div>

			<div className={clsx("footer-zone")}>
				<Fab
					aria-label={"empty-btn"}
					className={"fab empty-btn"}
					color="primary"
					onClick={empty}
				>
					<Autorenew className={clsx("empty-icon")} />
				</Fab>
			</div>
		</View>
	);
});

// SentenceTypes.propTypes = {
// 	rounds: PropTypes.object,
// 	onCorrect: PropTypes.func,
// };

export default SentenceTypes;
