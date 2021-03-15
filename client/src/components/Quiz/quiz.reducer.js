import { shuffle, is, pickRandomFrom } from "../../lib/issy/index.js";
import Logger from "../../lib/logg.js";
import ROUND_TYPES from "./roundTypes.js";

const label = "quizReducer";
const logg = new Logger({ label }).logg;

const getPercent = (index, total) => {
	return (index / total) * 100;
};

const getCorrectSlotIndex = (slots, step) => {
	const slotIndex = slots.reduce((accumulator, slot, i) => {
		if (step === slot.stepIndex) {
			accumulator = i;
		}

		return accumulator;
	}, -1);
	return slotIndex;
};

class AnswerItem {
	completed = false;
	numMistakes = 0;
	itemIndex;
	stepIndex;
	item;
	constructor({ stepIndex = 0, itemIndex = 0, item }) {
		this.stepIndex = stepIndex;
		this.itemIndex = itemIndex;
		this.item = item;
	}
}

class GameRound {
	answers;
	numAnswers; //in a single question
	numAnswersRequired;
	correctItem;
	step;
	lastStep;
	//step;
	itemsIndexes;
	roundIndex;
	type;
	numRepeats;
	constructor({
		itemsIndexes = [],
		numAnswers = 4,
		numAnswersRequired = 4,
		roundIndex = 0,
		type = ROUND_TYPES.SAY__REPEAT,
		items,
		correctItem,
		numRepeats = 1,
	}) {
		//const _randomItemsIndexes = shuffle(itemsIndexes, 4);
		const _numAnswers = Math.min(numAnswers, items.length);

		const answers = [];
		for (let stepIndex = 0; stepIndex < _numAnswers; stepIndex++) {
			// const stepIndex = pickRandomFrom(slotIndexes, 1, [])
			//stepIndex is the step within the current round. E.g. stepIndex=== 0 when a question hasn't been answered yet. stepIndex===1 when the first question has been answered. stepIndex===2 when the first two questions have been answers, etc.
			let itemIndex;
			let item;
			let isCorrectItem;

			if (stepIndex === 0) {
				item = correctItem;
				itemIndex = items?.indexOf(item);
				isCorrectItem = true;
			} else {
				item = items?.[stepIndex];
				itemIndex = items?.indexOf(item);
				isCorrectItem = false;
			}

			answers.push(
				new AnswerItem({
					item,
					itemIndex, //index in items list
					stepIndex, //the step in which this answer is the correct one
					isCorrectItem,
				})
			);
		}

		this.answers = answers;
		this.correctItem = answers[0];
		this.numAnswers = _numAnswers;
		this.numAnswersRequired = Math.min(numAnswersRequired, _numAnswers);
		this.step = 0;
		this.lastStep = _numAnswers - 1;
		this.itemsIndexes = itemsIndexes;

		this.roundIndex = roundIndex;
		this.type = type;
		this.numRepeats = numRepeats;
	}
}

class Game {
	matchedItems = [];
	answerSlots;
	constructor({
		items = [],
		numAnswers = 4,
		numAnswersRequired = 4,
		startRound = 0,
		startStep = 0,
		numShuffles = 0, //by default, order of items is not random
		rounds = [],

		//progress=0
	}) {
		//make sure that numAnswersRequired is not (accidently) greater than numAnswers
		numAnswersRequired =
			numAnswersRequired > numAnswers ? numAnswers : numAnswersRequired;

		let _items = items.map((_item) => {
			_item.usedImage = pickRandomFrom(_item.images) ?? {
				urls: { regular: _item.image },
			};
			return _item;
		});
		//shuffle the items if desired
		const shuffledItems =
			numShuffles && is(numShuffles).aNumber
				? shuffle(_items, numShuffles)
				: _items;

		const numTotalItems = shuffledItems.length;
		const _rounds = [];

		//first round consists of 1,  2 or 3 items
		// const firstRoundNumAnswers = Math.min(3, numAnswers);

		// const firstRoundAnswerIndexes = [];
		// for (let i = 0; i < items.length; i++) {
		// 	firstRoundAnswerIndexes.push(i);
		// }

		let numTotalAnswersRequired = 0;
		const flatGameRounds = shuffledItems
			.map((item, itemIndex) => {
				if (!item) return null;
				const { numShuffles, numRepeats } = item;

				//start easy
				const numAnswers = itemIndex < 2 ? 2 : itemIndex < 6 ? 3 : 4;
				const correctItem = item;
				const roundItems = [correctItem];
				//pick the wrong answers at random
				for (let i = 0; i < numAnswers - 1; i++) {
					if (!shuffledItems) {
						debugger;
					}

					let randomUniqueItem = pickRandomFrom(shuffledItems);
					let j = 0;
					while (
						roundItems.includes(randomUniqueItem) &&
						j < _items.length * 4
					) {
						randomUniqueItem = pickRandomFrom(shuffledItems);
						j++;
					}

					roundItems.push(randomUniqueItem);
				}

				const numAnswersRequired = 1;
				numTotalAnswersRequired += numAnswersRequired;

				const allItemRounds = Object.values(ROUND_TYPES).map(
					(roundType) => {
						const _numAnswers =
							roundType === ROUND_TYPES.SAY__REPEAT
								? 1
								: numAnswers;

						const round = new GameRound({
							type: roundType,
							numAnswers: _numAnswers, //for multiple-answer cards
							numRepeats, // for say__repeat
							items: roundItems,
							correctItem: item,
							numAnswersRequired: 1, //for multiple-answer cards,
							numShuffles,
						});

						return round;
					}
				);

				return allItemRounds;
			})
			.flat();

		const shuffledGameRounds =
			numShuffles && is(numShuffles).aNumber
				? shuffle(flatGameRounds, numShuffles)
				: flatGameRounds;

		shuffledGameRounds.map((round, roundIndex) => {
			round.roundIndex = roundIndex;
		});

		logg("game rounds: ", shuffledGameRounds);

		// const firstIndexes = shuffle(firstRoundAnswerIndexes, numShuffles);

		// const firstRound = new GameRound({
		// 	numAnswers: firstRoundNumAnswers,
		// 	itemsIndexes: firstIndexes,
		// 	roundIndex: 0,
		// 	type: rounds[0]?.type,
		// 	numAnswersRequired,
		// 	items,
		// });
		// _rounds.push(firstRound);

		//if the total number of remaining items can't be divided wholly by #numAnswers, then make it a short round. A short round consists of less items than specified in numAnswers.
		//The very first round is the shortest round possible: it consists of 2 answers (with either 1 or 2 of them being required for completing the round). The second round consists of 3 answers, and the following one consists of 4.
		// const round2StartIndex = firstRoundNumAnswers;
		// let numItemsLeft = numTotalItems - round2StartIndex;
		// let _numAnswers = 2;
		// let numTotalAnswersRequired = numAnswersRequired === 1 ? 1 : 2;
		// let isShortRound = false;
		// let roundIndex = 1;

		// for (let i = round2StartIndex; i < numTotalItems; i += _numAnswers) {
		// 	isShortRound = isShortRound || numItemsLeft % _numAnswers > 0;
		// 	_numAnswers = isShortRound
		// 		? Math.min(_numAnswers + 1, numAnswers)
		// 		: numAnswers;

		// 	numTotalAnswersRequired += Math.min(
		// 		_numAnswers,
		// 		numAnswersRequired
		// 	);

		// 	//get the indexes for the round
		// 	const itemsIndexes = [];
		// 	for (let j = 0; j < _numAnswers; j++) {
		// 		itemsIndexes.push(i + j);
		// 	}
		// 	// const shuffledItemsIndexes = shuffle(itemsIndexes, 1);

		// 	const roundItems = itemsIndexes.map((itemIndex) => {
		// 		return items[itemIndex];
		// 	});

		// 	const round = new GameRound({
		// 		itemsIndexes,
		// 		roundIndex,
		// 		items: roundItems,
		// 	});
		// 	_rounds.push(round);

		// 	numItemsLeft -= _numAnswers;
		// 	isShortRound = false;
		// 	roundIndex++;
		// }

		this.rounds = shuffledGameRounds;
		//todo: make sure that this works. Mark previous rounds as completed
		const firstRound = shuffledGameRounds[0];
		this.currentRound = firstRound;
		this.roundIndex = firstRound?.roundIndex;

		//shuffle the answer slots
		const answerSlotsRandomOrder = shuffle(
			shuffledGameRounds[startRound]?.answers,
			numAnswers * 2
		);

		this.answerSlots = answerSlotsRandomOrder;
		const _correctSlotIndex = getCorrectSlotIndex(
			answerSlotsRandomOrder,
			startStep
		);
		this.correctSlotIndex = _correctSlotIndex;
		const _correctItemIndex =
			answerSlotsRandomOrder?.[_correctSlotIndex]?.itemIndex;
		this.correctItemIndex = _correctItemIndex;
		this.correctItem = _items?.[_correctItemIndex];

		this.step = startStep;

		this.lastStep = numTotalAnswersRequired - 1;

		this.numAnswersRequired = numAnswersRequired;
		this.numAnswers = shuffledItems.length;
		this.items = _items;
		this.numTotalItems = numTotalItems;
		this.numTotalAnswersRequired = numTotalAnswersRequired;
		this.numTotalRounds = shuffledGameRounds.length;
		this.numTotalMistakes = 0;

		this.progress = parseInt(this.roundIndex / this.rounds.length) * 100;
	}
}

const goNextRound = ({
	currentRoundIndex,
	rounds,
	state,
	step,
	numTotalRounds,
	skipping,
}) => {
	const nextRoundIndex = currentRoundIndex + 1;
	debugger;
	if (nextRoundIndex >= numTotalRounds) {
		//Already in final round.
		// return { ...state, progress: 100 };
		return state;
	} else {
		//More rounds to go. Proceed to the next one
		//mark the current round as completed or skipped (default is completed)
		if (skipping) {
			rounds[currentRoundIndex].skipped = true;
		} else {
			rounds[currentRoundIndex].completed = true;
		}
		const nextRound = rounds[nextRoundIndex];
		if (!nextRound.answers) {
			debugger;
		}
		const nextSlots = shuffle(nextRound.answers, nextRound.numAnswers);
		const nextCorrectSlotIndex = getCorrectSlotIndex(nextSlots, 0);
		const nextCorrectItemIndex = nextSlots[nextCorrectSlotIndex].itemIndex;
		const nextCorrectItem = state.items[nextCorrectItemIndex];

		const progress = getPercent(nextRoundIndex, rounds.length);

		logg("Quiz progress: ", progress);

		debugger;

		return {
			...state,
			rounds,
			roundIndex: nextRoundIndex,
			currentRound: nextRound,
			answerSlots: nextSlots,
			step: step + 1, //overall quiz step

			correctSlotIndex: nextCorrectSlotIndex,
			correctItemIndex: nextCorrectItemIndex,
			correctItem: nextCorrectItem,
			progress,
			progressing: false,
			type: nextRound.type,
		};
	}
};

const DEFAULT_CONFIG = {
	items: [],
	numRounds: 10,
	numAnswers: 4,
	numAnswersRequired: 4,
	startStep: 0,
	startRound: 0,
};

//react will run this function and pass it the initial state (2nd argument in useReducer())
const initQuizReducer = ({
	items = [],
	numRounds = DEFAULT_CONFIG.numRounds,
	numAnswers = DEFAULT_CONFIG.numAnswers,
	numAnswersRequired = DEFAULT_CONFIG.numAnswersRequired,
	startStep = DEFAULT_CONFIG.startStep,
	startRound = DEFAULT_CONFIG.startRound,
}) => {
	const game = new Game({
		items,
		numShuffles: 3,
		numAnswers,
		numAnswersRequired,
		startStep,
		startRound,
	});
	return game;
};

const quizReducer = (state, action) => {
	const {
		//numAnswers,
		//numAnswersRequired,
		//startStep,
		//startRound,

		items,
		//unMatchedItems,
		//matchedItems,
		//numTotalItems,
		numTotalMistakes,
		//numTotalSteps,
		numTotalRounds,
		rounds,
		currentRound,
		roundIndex,
		step,
		correctItem,

		answerSlots,
		//correctSlotIndex
	} = state;

	const { payload } = action;

	//derived state properties (basically, useful shorthands)
	// const currentRound = rounds[roundIndex];
	// const currentStep = currentRound.answers[step];

	let _updatedRound = rounds[roundIndex];

	switch (action.type) {
		case "createGame":
			const { config = {} } = payload;
			const game = new Game({
				...DEFAULT_CONFIG,
				...config, //give precedence
				items: payload.items,
				numShuffles: 3,
				rounds: payload.rounds || state.rounds,
			});
			logg("Initialized Game: ", game);
			debugger;
			return game; //this will be the new state
			break;

		case "goNextStep":
			// rounds[roundIndex].answers[step].completed = true;

			//const { step, lastStep } = currentRound;
			debugger;
			const isSingleStep = currentRound?.items?.length;
			const nextStep = Math.min(
				currentRound.step + 1,
				currentRound.lastStep + 1
			);

			if (nextStep > currentRound.lastStep + 1) {
				return state; //already completed, no need for a re-render
			}

			const roundIsNowComplete =
				nextStep > currentRound.lastStep ||
				nextStep + 1 > currentRound.numAnswersRequired;

			// if (roundIsNowComplete) {
			// 	return goNextRound({
			// 		roundIndex,
			// 		rounds,
			// 		state,
			// 		step,
			// 		numTotalRounds,
			// 		skipping: payload?.skipping,
			// 	});
			// }

			_updatedRound.step = nextStep;
			rounds[roundIndex] = _updatedRound;
			const nextCorrectSlotIndex = roundIsNowComplete
				? -1
				: getCorrectSlotIndex(answerSlots, nextStep);
			const nextCorrectItemIndex = roundIsNowComplete
				? -1
				: answerSlots[nextCorrectSlotIndex].itemIndex;

			if (typeof state.items !== "undefined") {
				const _items = state.items;
				const nextCorrectItem = roundIsNowComplete
					? null
					: _items[nextCorrectItemIndex];
				debugger;
				return {
					...state,
					rounds,
					currentRound: _updatedRound,
					step: nextStep,
					correctSlotIndex: nextCorrectSlotIndex,
					correctItemIndex: nextCorrectItemIndex,
					correctItem: nextCorrectItem,
					isCorrect: true,
					isWrong: false,
				};
			}

			//bug
			return {
				...state,
				rounds,
				currentRound: _updatedRound,
				step: nextStep,
				correctSlotIndex: nextCorrectSlotIndex,
				correctItemIndex: nextCorrectItemIndex,
				isCorrect: true,
				isWrong: false,
			};

		case "goBackStep":
			if (currentRound.step <= 0) {
				//currently in first round.
				//stay in place
				return state;
			}
			//More answers left to go back to. Do move backwards.
			const prevStep = currentRound.step - 1;
			_updatedRound.step = prevStep;
			rounds[roundIndex] = _updatedRound;
			//CHECK AND FIX
			// const prevStepAnswer = _updatedRound.answers;
			return {
				...state,
				rounds,
				currentRound: _updatedRound,
				step: step - 1,
			};

		case "goToStep":
			if (
				action.payload > currentRound.numSteps - 1 ||
				action.payload < 0
			) {
				return null;
			}
			return {
				...state,
				step: action.payload,
				currentStep: currentRound.answers[action.payload],
			};

		case "goToFirstStep":
			return {
				...state,

				step: 0,
				currentStep: currentRound.answers[0],
			};
		case "goToLastStep":
			return {
				...state,

				step: currentRound.numSteps - 1,
				currentStep: currentRound.answers[currentRound.numSteps - 1],
			};

		case "advanceProgress":
			return {
				...state,
				progress: getPercent(roundIndex + 1, rounds.length),
				progressing: true,
				isWrong: false,
				isCorrect: false,
			};
			break;
		case "correctItem":
			return {
				...state,
				isWrong: false,
				isCorrect: true,
			};
			break;
		case "incorrectAnswer":
			return {
				...state,
				isWrong: true,
				isCorrect: false,
			};
			break;

		case "clearCorrect":
			return {
				...state,
				isWrong: false,
				isCorrect: false,
			};
			break;

		case "goNextRound":
			debugger;
			return goNextRound({
				currentRoundIndex: roundIndex,
				rounds,
				state,
				step,
				skipping: action.skipping,
				numTotalRounds,
			});

		case "goBackRound":
			if (roundIndex <= 0) {
				//currently in first round. stay in place
				return state;
			} else {
				//More rounds left to go back to. Move back a round, to its *final* step.
				return {
					...state,
					roundIndex: roundIndex - 1,
					currentRound: rounds[roundIndex - 1],

					step: rounds[roundIndex - 1].numSteps - 1,
					currentStep:
						rounds[roundIndex - 1].answers[
							rounds[roundIndex - 1].numSteps - 1
						],
				};
			}
		case "goToRound":
			if (action.payload.roundIndex > rounds.length - 1) {
				return state;
			}
			return {
				...state,
				roundIndex: action.payload,
				currentRound: rounds[action.payload],
				//for easy debugging, don't pass a `startingStepIndex` argument, and jump straight to the final step
				step:
					action.payload.startingStepIndex >= 0
						? action.payload.startingStepIndex
						: rounds[action.payload].numSteps - 1,
				currentStep:
					rounds[action.payload].answers[
						rounds[action.payload].numSteps - 1
					],
			};
		case "restartQuiz":
			//go to first round, first step.
			return {
				...state,
				roundIndex: 0,
				currentRound: rounds[0],
				step: 0,
				currentStep: rounds[0].answers[0],
			};
		case "goToLastRound":
			//for easy debugging, go straight to the final step of the final round
			return {
				...state,
				roundIndex: rounds.length - 1,
				currentRound: rounds[rounds.length - 1],

				step: rounds[rounds.length - 1].numSteps - 1,
				currentStep:
					rounds[rounds.length - 1].answers[
						rounds[rounds.length - 1].numSteps - 1
					],
			};
		// case "markCorrect":
		// 	rounds[roundIndex].answers[step].completed = true;
		// 	return {
		// 		...state,
		// 		rounds,
		// 		currentRound: rounds[roundIndex],
		// 		currentStep: rounds[roundIndex].answers[step]
		// 	};
		case "markMistake":
			const markedAnswer = correctItem;
			markedAnswer.numMistakes++;
			return {
				...state,
				currentAnswer: markedAnswer,
				numTotalMistakes: numTotalMistakes + 1,
			};

		case "setItems":
			const { items } = action.payload;
			// const participatingItems = Object.values(items).flat();

			// const newGameState = new Game(participatingItems);

			// return newGameState;

			return {
				...state,
				items,
			};
		default:
			throw new Error(
				"dispatch() recevied an unsupported action type: ",
				action.type
			);
	}
};

export { initQuizReducer };

export default quizReducer;
