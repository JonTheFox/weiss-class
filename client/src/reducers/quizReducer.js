import { shuffle, is, pickRandomFrom } from "../lib/issy";
import Logger from "../lib/logg.js";

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
	constructor({ stepIndex = 0, itemIndex = 0 }) {
		this.stepIndex = stepIndex;
		this.itemIndex = itemIndex;
	}
}

class GameRound {
	answers;
	numAnswers;
	numAnswersRequired;
	correctAnswer;
	step;
	lastStep;
	//step;
	itemsIndexes;
	roundIndex;
	constructor({
		itemsIndexes = [],
		numAnswers = 4,
		numAnswersRequired = 4,
		roundIndex = 0,
	}) {
		//const _randomItemsIndexes = shuffle(itemsIndexes, 4);
		const _numAnswers = Math.min(numAnswers, itemsIndexes.length);

		const answers = [];
		for (let i = 0; i < _numAnswers; i++) {
			// const stepIndex = pickRandomFrom(slotIndexes, 1, [])
			//stepIndex is the step within the current round. E.g. stepIndex=== 0 when a question hasn't been answered yet. stepIndex===1 when the first question has been answered. stepIndex===2 when the first two questions have been answers, etc.
			answers.push(
				new AnswerItem({
					stepIndex: i,
					itemIndex: itemsIndexes[i],
				})
			);
		}

		this.answers = answers;
		this.correctAnswer = answers[0];
		this.numAnswers = _numAnswers;
		this.numAnswersRequired = Math.min(numAnswersRequired, _numAnswers);
		this.step = 0;
		this.lastStep = _numAnswers - 1;
		this.itemsIndexes = itemsIndexes;
		this.roundIndex = roundIndex;
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
		numShuffles = 3,
		//progress=0
	}) {
		//make sure that numAnswersRequired is not (accidently) greater than numAnswers
		numAnswersRequired =
			numAnswersRequired > numAnswers ? numAnswers : numAnswersRequired;

		let _items = items.map((_item) => {
			_item.usedImage = pickRandomFrom(_item.images);
			return _item;
		});
		if (numShuffles && is(numShuffles).aNumber)
			_items = shuffle(_items, numShuffles);

		debugger;

		const numTotalItems = _items.length;
		const _rounds = [];

		//first round consist of 1 or 2 items
		const firstRoundNumAnswers = Math.min(2, numAnswers);
		const firstIndexes = shuffle([0, 1], 3);
		const firstRound = new GameRound({
			numAnswers: firstRoundNumAnswers,
			itemsIndexes: firstIndexes,
			roundIndex: 0,
			numAnswersRequired,
		});
		_rounds.push(firstRound);

		const init = () => {
			//if the total number of remaining items can't be divided wholly by #numAnswers, then make it a short round. A short round consists of less items than specified in numAnswers.
			//The very first round is the shortest round possible: it consists of 2 answers (with either 1 or 2 of them being required for completing the round). The second round consists of 3 answers, and the following one consists of 4.
			const round2StartIndex = firstRoundNumAnswers;
			let numItemsLeft = numTotalItems - round2StartIndex;
			let _numAnswers = 2;
			let numTotalAnswersRequired = numAnswersRequired === 1 ? 1 : 2;
			let isShortRound = false;
			let roundIndex = 1;
			for (
				let i = round2StartIndex;
				i < numTotalItems;
				i += _numAnswers
			) {
				isShortRound = isShortRound || numItemsLeft % _numAnswers > 0;
				_numAnswers = isShortRound
					? Math.min(_numAnswers + 1, numAnswers)
					: numAnswers;
				numTotalAnswersRequired += Math.min(
					_numAnswers,
					numAnswersRequired
				);

				//get the indexes for the round
				const itemsIndexes = [];
				for (let j = 0; j < _numAnswers; j++) {
					itemsIndexes.push(i + j);
				}
				// const shuffledItemsIndexes = shuffle(itemsIndexes, 1);

				const round = new GameRound({
					itemsIndexes: itemsIndexes,
					roundIndex,
				});
				_rounds.push(round);
				numItemsLeft -= _numAnswers;
				isShortRound = false;
				roundIndex++;
			}

			this.rounds = _rounds;
			this.currentRound = _rounds[startRound];
			this.roundIndex = startRound;

			const _answerSlots = shuffle(
				_rounds[startRound].answers,
				_numAnswers
			);

			this.answerSlots = _answerSlots;
			const _correctSlotIndex = getCorrectSlotIndex(
				_answerSlots,
				startStep
			);
			this.correctSlotIndex = _correctSlotIndex;
			const _correctItemIndex = _answerSlots[_correctSlotIndex].itemIndex;
			this.correctItemIndex = _correctItemIndex;
			this.correctItem = _items[_correctItemIndex];

			this.step = startStep;
			this.lastStep = numTotalAnswersRequired - 1;
			this.numAnswersRequired = numAnswersRequired;
			this.numAnswers = _numAnswers;

			this.items = _items;
			this.numTotalItems = numTotalItems;
			this.numTotalAnswersRequired = numTotalAnswersRequired;
			this.numTotalRounds = _rounds.length;
			this.numTotalMistakes = 0;

			this.progress =
				parseInt(this.roundIndex / this.rounds.length) * 100;
			logg("Quiz progress: ", this.progress);
		};

		init();
	}
}

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

	logg("Initialized Game: ", game);
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
		correctAnswer,

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
			});
			logg("Initialized Game: ", game);
			return game; //this will be the new state
			break;

		case "goNextStep":
			// rounds[roundIndex].answers[step].completed = true;

			//const { step, lastStep } = currentRound;
			const nextStep = Math.min(
				currentRound.step + 1,
				currentRound.lastStep + 1
			);

			if (nextStep > currentRound.lastStep + 1) {
				return state; //already completed, no need for a re-render
			}

			const roundIsNowComplete = nextStep > currentRound.lastStep;

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
					? {}
					: _items[nextCorrectItemIndex];

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

				debugger;
			}

			debugger;

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
		case "correctAnswer":
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
			// debugger;

			const nextRoundIndex = roundIndex + 1;
			if (nextRoundIndex >= numTotalRounds) {
				//currently in final round. Stay in current state (prevent an unnecessary re-render)
				return { ...state, progress: 100 };
			} else {
				//More rounds to go. Proceed to the next one
				//mark the current round as completed or skipped (default is completed)
				if (action.skipping) {
					rounds[roundIndex].skipped = true;
				} else {
					rounds[roundIndex].completed = true;
				}
				const nextRound = rounds[nextRoundIndex];
				const nextSlots = shuffle(
					nextRound.answers,
					nextRound.numAnswers
				);
				const nextCorrectSlotIndex = getCorrectSlotIndex(nextSlots, 0);
				const nextCorrectItemIndex =
					nextSlots[nextCorrectSlotIndex].itemIndex;
				const nextCorrectItem = state.items[nextCorrectItemIndex];

				const progress = getPercent(nextRoundIndex, rounds.length);

				logg("Quiz progress: ", progress);

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
				};
			}
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
			const markedAnswer = correctAnswer;
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
