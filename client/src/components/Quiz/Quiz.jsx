import React, {
    useState,
    useContext,
    useRef,
    useEffect,
    useReducer,
    useCallback,
} from "react";

import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";
import posed from "react-pose";
import SplitText from "react-pose-text";
import ImageCard from "./ImageCard.jsx";
import Prompt from "./Prompt.jsx";
import { AppContext } from "../../contexts/AppContext.jsx";
import isSoundOnState from "../../store/isSoundOn.selector.js";
import showBgState from "../../store/showBg.atom.js";
import videoState from "../../store/video.atom.js";
import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";
// import WeissSpinner from "../UI/WeissSpinner/WeissSpinner.jsx";
import GlowingLoader from "../GlowingLoader/GlowingLoader.jsx";
import ENDPOINTS from "../../AJAX/ajax-endpoints.js";

import quizReducer, { initQuizReducer } from "./quiz.reducer.js";
import POSES from "../../constants/poses.js";
import DURATIONS from "../../constants/durations.js";
import { CONGRATS } from "../../constants/texts.js";
import clsx from "clsx";
import { useRecoilValue, useRecoilState } from "recoil";
import Summary from "./Summary.jsx";
import Entrance from "./Entrance.js";
import ROUND_TYPES from "./roundTypes.js";
import VideoCard, { CustomCard } from "../VideoCard/VideoCard.jsx";
import Grid from "@material-ui/core/Grid";
import MicIcon from "@material-ui/icons/Mic";
import Color from "color";
import { Row, Item } from "@mui-treasury/components/flex";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import VideoPlayer from "../VideoPlayer/VideoPlayer.jsx";
import Fab from "@material-ui/core/Fab";
import Mic from "@material-ui/icons/Mic";
import DraggableBall from "../DraggableBall/DraggableBall.jsx";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ReactPlayer from "react-player";
import styles from "./quiz.module.scss";

import SFX from "../../constants/soundEffects.js";

let speechRecognizer;

const getAppropriateImageUrl = (urls) => {
    return (
        urls?.small ??
        urls?.regular ??
        urls?.hdReady ??
        urls?.fullHd ??
        urls?.fourK
    );
};

// const getAorAn = (noun = "") =>
//     ["a", "e", "i", "o", "u"].includes(noun?.[0]?.toLowerCase()) ? "an" : "a";

const useGridStyles = makeStyles(({ breakpoints }) => ({
    root: {
        overflow: "auto",
        [breakpoints.only("xs")]: {
            "& > *:not(:first-child)": {
                paddingLeft: 0,
            },
        },
        [breakpoints.up("sm")]: {
            justifyContent: "center",
        },
    },
}));

const useStyles = makeStyles(({ palette }) => ({
    color: ({ color }: { color: string }) => ({
        "&:before": {
            backgroundColor: Color(color)
                .darken(0.3)
                .desaturate(0.2)
                .toString(),
        },
    }),
    root: {
        position: "relative",
        borderRadius: "1rem",
        minWidth: 320,
        "&:before": {
            transition: "0.2s",
            position: "absolute",
            width: "100%",
            height: "100%",
            content: '""',
            display: "block",
            borderRadius: "1rem",
            zIndex: 0,
            bottom: 0,
        },
        "&:hover": {
            "&:before": {
                bottom: -6,
            },
            "& $logo": {
                transform: "scale(1.1)",
                boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
            },
        },
    },
    cover: {
        borderRadius: "1rem",
    },
    content: ({ color }: { color: string }) => ({
        position: "relative",
        zIndex: 1,
        borderRadius: "1rem",
        boxShadow: `0 6px 16px 0 ${Color(color).fade(0.5)}`,
        "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
            clipPath:
                "polygon(0% 100%, 0% 35%, 0.3% 33%, 1% 31%, 1.5% 30%, 2% 29%, 2.5% 28.4%, 3% 27.9%, 3.3% 27.6%, 5% 27%,95% 0%,100% 0%, 100% 100%)",
            borderRadius: "1rem",
            background: `linear-gradient(to top, ${color}, ${Color(color)
                .rotate(24)
                .lighten(0.12)})`,
        },
    }),
    title: {
        fontFamily: "Fjalla One",
        fontSize: "1.25rem",
        color: "#fff",
        margin: 0,
    },
    logo: {
        transition: "0.3s",
        width: 100,
        height: 100,
        boxShadow: "0 4px 12px 0 rgba(0,0,0,0.24)",
        borderRadius: "1rem",
    },
    team: {
        fontFamily: "Sen",
        fontSize: "0.75rem",
        color: palette.text.hint,
    },
    date: {
        fontFamily: "Sen",
        color: "#fff",
        backgroundColor: palette.text.hint,
        opacity: 0.72,
        fontSize: "0.75rem",
        padding: "0 0.5rem",
        borderRadius: 12,
    },
    recordBtnContainer: {
        listStyle: "none",
    },
}));

const PosedList = posed.ul(POSES.list);
const PosedCard = posed.li(POSES.card__pressable___sans_shadow);
const PosedContainer = posed.div(POSES.card__pressable___sans_shadow);
const {
    MULTIPLE_ANSWER_CARDS,
    SAY__REPEAT,
    MULTIPLE_ANSWER_TEXT_CARDS,
} = ROUND_TYPES;

// const PosedOverlay = posed.li(POSES.card__pressable);

const createInstructionMsg = (itemName = "", type = "touch") => {
    if (type === SAY__REPEAT) {
        return `Say: "${itemName}"`;
    }
    //  if(type === MULTIPLE_ANSWER_CARDS) {
    return itemName || "";
    // }

    // type === "touch"
    //     ? `Touch a picture of ${getAorAn(animalName)} ${animalName}`
    //     : type === "say"
    //     ? `Say "${animalName}!"`
    //     : "";
};

const fetchItems = async (items) => {
    return items;
    //todo: fetch
};

const compLabel = "Quiz";
let animationFrame;

const Quiz = (props) => {
    const { screenSize = "phone" } = props;
    const [appUtils, appState] = useContext(AppContext);

    const {
        getRandomUpTo,
        animals,
        synthVoice,
        handlePress,
        removePressHandlers,
        BACKGROUND_CLASSES,
        DEBUGGING,
        request,
        capitalizeFirstLetter,
        pickRandomFrom,
        SpeechRecognizer,
    } = appUtils;

    const [gameStarted, setGameStarted] = useState(false);

    const recognizerRef = useRef();

    const isSoundOn = useRecoilValue(isSoundOnState);
    const [video, setVideo] = useRecoilState(videoState);

    const styles1 = useStyles({ color: "#fc7944" });
    const styles2 = useStyles({ color: "#5357ce" });
    const gridStyles = useGridStyles();

    const [showItems, setShowItems] = useState(false);
    // const [clientSideItems, setClientSideItems] = useState([]);
    // const [staticItems, setStaticItems] = useState(props.items || []);

    const [instruction, setInstruction] = useState(" "); //to occupy letter height

    const [summary, setSummary] = useState(" "); //see above
    const [showSummary, setShowSummary] = useState(false); //see above
    const [promptContent, setPromptContent] = useState(null);
    const [quizIsDone, setQuizIsDone] = useState(false);
    const [background, setBackground] = useState(BACKGROUND_CLASSES[0]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [active, setActive] = useState(false);
    const $active = useRef(false);
    const mediaStyles = useCoverCardMediaStyles();

    const [quizState, dispatch] = useReducer(
        quizReducer,
        {
            // items: animals.items,
            items: [],
        },
        initQuizReducer
    );

    const [showInstruction, setShowInstruction] = useState(false);
    const [showBg, setShowBg] = useRecoilState(showBgState);

    const {
        items,
        rounds,
        currentRound = {},
        answerSlots,
        correctSlotIndex,
        currentStepIndex,
        currentRoundIndex,
        correctItemIndex,
        progress,
        progressing,
        isWrong,
        isCorrect,
    } = quizState;

    const { numAnswers, step, completed, numSteps, roundIndex } = currentRound;

    const $quizState = useRef(quizState);
    const $currentRound = useRef(currentRound);
    const $answerSlots = useRef();
    const $correctSlotIndex = useRef(correctSlotIndex);

    const theme = useTheme();
    // const classes = useStyles(theme);

    const { logg, loggError } = useLogg({ label: compLabel });
    const promiseKeeper = usePromiseKeeper({ label: compLabel });
    const $promiseKeeper = useRef(promiseKeeper);

    const getOneImageItem = useCallback((item) => {
        // const image = item?.images?.[0];
        if (!item) return null;
        const image = item.usedImage ||
            item.images[0] || { urls: { regular: item.image } };
        return image;
    }, []);

    const SoundPlayer = React.useCallback(
        () => (
            <ReactPlayer
                className={clsx("react-player", styles.soundPlayer)}
                url={
                    progressing
                        ? SFX.roundComplete.url
                        : isCorrect
                        ? SFX.correctAnswer.url
                        : isWrong
                        ? SFX.wrongAnswer.url
                        : quizIsDone
                        ? SFX.gameComplete.url
                        : ""
                }
                playing={progressing || isCorrect || isWrong || quizIsDone}
                loop={false}
                ref={(ref) => {
                    if (!ref) return;
                }}
                //onPlay={handlePlay}
                // onReady={handleReady}
                // onSeek={props.handleSeek}
                //onEnded={handleEnded}
                // muted={muted}
                //volume={volume}
                //onProgress={handleProgress}
                //light={light} //light player means that it starts with only a thumbnail and await clicking on it
                //width="100%"
                controls={true}
            />
        ),
        [progressing, isCorrect, isWrong, quizIsDone]
    );

    const createSpeechRecognizer = useCallback(
        (phrases = [], { onCorrect }) => {
            const newSpeechRecognizer = new SpeechRecognizer(phrases, {
                interimResults: false,
                continuous: true,
                refs: recognizerRef,
                onResult: ({ transcript, confidence }) => {
                    // const _transcript = transcript.toLowerCase();
                    const _transcript = transcript.trim().toLowerCase();

                    logg("transcript: ", _transcript);

                    logg(
                        "phrases.includes(_transcript) : ",
                        phrases.includes(_transcript)
                    );

                    logg(
                        "Number(confidence) > 0.75: ",
                        Number(confidence) > 0.75
                    );

                    if (
                        phrases.includes(_transcript) &&
                        Number(confidence) > 0.75
                    ) {
                        //correctly said
                        logg(`Recognized: "${_transcript}"`);
                        onCorrect && onCorrect({ transcript, confidence });
                        return;
                    }
                    logg(
                        `Did not recognize the phrases which are being listened to.`
                    );
                },
                onError: (recognition, errReason, err) => {
                    loggError(err);
                },
                onSpeechStart: (recognition) => {
                    // const msg =
                    //  "SpeechRecognizer has started to recognize speech.";
                    // logg("onSpeechStart():", msg);
                },
                onSpeechEnd: (recognition) => {
                    // const msg = "User stopped speaking";
                    // logg("onSpeechEnd(): ", msg);
                },
                onEnd: (recognition) => {
                    // const msg = "SpeechRecognizer has stopped listening.";
                    // logg("onEnd(): ", msg);
                },
            });

            return newSpeechRecognizer;
        }
    );

    const getPhrases = (item, items) => {
        if (!item) {
            debugger;
            return null;
        }
        const text = item?.label;
        const withoutPunctuations = text?.replace?.(/[.,?;]/gi, " ");
        const trimmed = withoutPunctuations?.trim?.();
        const lowerCased = trimmed?.toLowerCase?.();
        return lowerCased ? [lowerCased] : [];
    };

    const startRecognition = useCallback(() => {
        const phrases = getPhrases(currentRound.correctItem, items);

        speechRecognizer = createSpeechRecognizer(phrases, {
            onCorrect: async ({ transricpt }) => {
                processAnswer({
                    selectedStepIndex: 0,
                    selectedSlot: answerSlots[0],
                    currentRound,
                    selectedSlotIndex: 0,
                });
            },
        });
        speechRecognizer.listen();
        // speechRecognizer.listenFor(phrases);
    }, [currentRound, items, getPhrases, createSpeechRecognizer]);

    const initGame = async (config = {}) => {
        const { restart, items } = config;

        dispatch({
            type: "createGame",
            payload: {
                items,
                config: { numAnswersRequired: 1, numAnswers: 2 },
                rounds: [
                    {
                        type: MULTIPLE_ANSWER_CARDS,
                        numAnswers: 2,
                    },
                    //  {
                    //     type: SAY__REPEAT,
                    //     numTimes: 3,
                    //     numAnswersRequired: 1,
                    //     numAnswers: 1,
                    // },
                ],
            },
        });
        synthVoice.turnOn();
        synthVoice.wakeUp();
        setActive(false);
        $active.current = false;
        setGameStarted(true);

        const gameCreated = await promiseKeeper.withRC(
            promiseKeeper.stall(100, "game created"),
            { resolveOnError: true, label: "game created" }
        );

        try {
            animationFrame = window.requestAnimationFrame(() => {
                setShowInstruction(false);
                setShowItems(true);
            });
            debugger;

            const _currentRound = $quizState.current?.currentRound;
            const enterDuration = DURATIONS.enter;

            const delay =
                $quizState.current?.rounds?.[0]?.type === SAY__REPEAT
                    ? 0
                    : enterDuration * 3 * _currentRound?.numAnswers;

            const presentItems = promiseKeeper.stall(delay, "present_items");

            const {
                correctSlotIndex,
                //correctItemIndex,
                //correctItem,
                rounds,
                currentRound,
                items,
                answerSlots,
            } = $quizState.current;

            await presentItems;

            const correctAnswer = currentRound?.correctAnswer;

            const correctItemIndex = correctAnswer?.itemIndex;
            const correctItem = correctAnswer.item;
            const correctItemLabel = capitalizeFirstLetter(
                correctItem?.label ?? ""
            );

            const instructionMsg = createInstructionMsg(
                correctItemLabel,
                rounds[0]?.type
            );
            debugger;

            if (!instructionMsg) {
                loggError("NO INSTRUCTION MSG???");
            }
            setInstruction(instructionMsg);

            const sayInstruction = promiseKeeper.withRC(
                synthVoice.say(instructionMsg),
                {
                    resolveOnError: true,
                    // timeout: 5000,
                    label: "sayInstruction (first time)",
                }
            );

            if (
                MULTIPLE_ANSWER_TEXT_CARDS !==
                $quizState.current.currentRound?.type
            ) {
                animationFrame = window.requestAnimationFrame(() => {
                    setShowInstruction(true);
                });
            }

            await sayInstruction;
            if (!sayInstruction.resolved) {
                logg(
                    "sayInstruction did not really resolve, but resolveOnError flag had been passed to PromiseKeeper.withRC :)"
                );
            }

            animationFrame = window.requestAnimationFrame(() => {
                //round 1 starts
                logg("Round 1 starts!");
                setActive(true);

                const roundType = $quizState.current.currentRound?.type;
                const eventType = getPromptEventTypeByRoundType(
                    $quizState.current.currentRound?.type
                );
                if (eventType === SAY__REPEAT) {
                    speechRecognizer.listen();
                    //for fast-forwarding purposes, add a promise to promiseKeeper. This will allow us to resolve the promise upon a key press, for example
                    promiseKeeper.withRC(() => {
                        return new Promise((resolve, reject) => {
                            advanceRound({
                                //may cause a bug
                                nextRoundIndex:
                                    $quizState.current.currentRound?.roundIndex,
                            });
                        });
                    });
                }

                setPromptContent({
                    eventType,
                });
            });
        } catch (err) {
            loggError(err);
            promiseKeeper.resolveLatest();
        }
    };

    const goNextBackground = useCallback(() => {
        setBackground((prev) => {
            //move to the next background
            const currentIndex = BACKGROUND_CLASSES.indexOf(prev);
            const nextIndex =
                currentIndex + 1 >= BACKGROUND_CLASSES.length
                    ? 0
                    : currentIndex + 1;
            return BACKGROUND_CLASSES[nextIndex];
        });
    });
    const goPrevBackground = useCallback(() => {
        setBackground((currentBG) => {
            //move to the prev background
            const currentIndex = BACKGROUND_CLASSES.indexOf(currentBG);
            const prevIndex =
                currentIndex - 1 <= -1
                    ? BACKGROUND_CLASSES.length - 1
                    : currentIndex - 1;
            return BACKGROUND_CLASSES[prevIndex];
        });
    });

    const handleCorrectAnswer = useCallback(async () => {
        animationFrame = window.requestAnimationFrame(() => {
            dispatch({ type: "goNextStep" });
            setPromptContent({ eventType: "correct" });
            dispatch({ type: "correctAnswer", payload: {} });
        });

        return true;
    }, [promiseKeeper, setPromptContent]);

    const getPromptEventTypeByRoundType = useCallback(
        (roundType) => {
            let promptEventType;
            switch (roundType) {
                case MULTIPLE_ANSWER_CARDS:
                    promptEventType = "touch";
                    break;
                case MULTIPLE_ANSWER_TEXT_CARDS:
                    promptEventType = "touch";
                    break;
                case SAY__REPEAT:
                    promptEventType = "say";
                    break;
                default:
                    promptEventType = "touch";
                    break;
            }
            return promptEventType;
        },
        [MULTIPLE_ANSWER_CARDS, SAY__REPEAT]
    );

    const advanceRound = useCallback(
        async ({ nextRoundIndex, completed = false }) => {
            const nextRound = $quizState.current?.rounds?.[nextRoundIndex];
            //bug here
            const nextCorrectAnswer = nextRound.answers.filter(
                (answer) => answer.stepIndex === 0
            )[0];
            debugger;

            const instructionMsg = createInstructionMsg(
                capitalizeFirstLetter(nextCorrectAnswer?.item?.label),
                nextRound.type
            );

            const fadeOutItems = promiseKeeper.stall(
                DURATIONS.exit * $currentRound.current.numAnswers + 700,
                "fadeout-old-items"
            );

            await fadeOutItems;
            dispatch({
                type: "goNextRound",
                payload: { completed, skipping: !completed },
            });

            animationFrame = window.requestAnimationFrame(() => {
                setInstruction(instructionMsg);
                setShowOverlay(false);
                setShowItems(true);

                setPromptContent(null);
            });

            const numAnswers = $currentRound?.current.answers?.length ?? 0;

            const newItemsAppeared = await promiseKeeper.stall(
                DURATIONS.enter * (numAnswers + 1) * 2,
                "newItemsAppeared"
            );

            const sayInstruction_newRound = promiseKeeper.withRC(
                synthVoice.say(instructionMsg),
                {
                    resolveOnError: true,
                    label: "sayInstruction_newRound",
                }
            );

            if (
                MULTIPLE_ANSWER_TEXT_CARDS !==
                $quizState.current.currentRound?.type
            ) {
                setShowInstruction(true);
            }

            await sayInstruction_newRound;

            animationFrame = window.requestAnimationFrame(() => {
                setPromptContent({
                    eventType: getPromptEventTypeByRoundType(
                        $quizState.current.currentRound?.type
                    ),
                });
                setActive(true);
            });
        },
        [rounds]
    );

    const processAnswer = useCallback(
        async ({
            selectedStepIndex,
            selectedSlotIndex,
            selectedSlot,
            currentRound,
        }) => {
            try {
                dispatch({ type: "clearCorrect", payload: {} });

                const { currentRound = {} } = $quizState.current;
                const { step, roundIndex, correctItem } = currentRound;

                // const wrongAnswer =
                //     selectedSlotIndex !==
                //         $quizState.current.currentRound?.correctAnswer
                //             ?.slotIndex ?? false;

                const wrongAnswer = selectedSlot?.item !== correctItem;

                if (quizIsDone) {
                    return "quiz is done";
                }

                logg("correct answer selected:  ", !wrongAnswer);

                if (wrongAnswer) {
                    animationFrame = window.requestAnimationFrame(() => {
                        dispatch({ type: "incorrectAnswer", payload: {} });
                        setPromptContent({ eventType: "incorrect" });
                        setActive(false);

                        promiseKeeper
                            .stall(DURATIONS.exit, "proceed to next round")
                            .then(() => {
                                animationFrame = window.requestAnimationFrame(
                                    () => {
                                        setShowItems(false);
                                        promiseKeeper
                                            .stall(
                                                DURATIONS.exit,
                                                "skip to next round"
                                            )
                                            .then(() => {
                                                animationFrame = window.requestAnimationFrame(
                                                    () => {
                                                        advanceRound({
                                                            nextRoundIndex:
                                                                $quizState
                                                                    .current
                                                                    .currentRound
                                                                    .roundIndex +
                                                                1,
                                                            completed: false,
                                                            skipping: true, //effectively the same as !completed. It's here just for clarity
                                                        });
                                                    }
                                                );
                                            });
                                    }
                                );
                            });
                    });

                    return null;
                }

                //correct answer
                setActive(false);
                const nextStep = step + 1;
                const sayCorrect = promiseKeeper.withRC(
                    synthVoice.say("Correct!!"),
                    {
                        resolveOnError: true,
                        label: "sayCorrect",
                    }
                );
                handleCorrectAnswer();
                await sayCorrect;

                dispatch({ type: "clearCorrect", payload: {} });

                const { lastStep, answers } = $currentRound.current;
                const { items } = $quizState.current;

                if (
                    nextStep <= lastStep &&
                    nextStep < currentRound.numAnswersRequired
                ) {
                    //There are still some items left to match. Prepare for the next step

                    // const isLastStep = nextStep === lastStep;
                    // if (isLastStep) {
                    //     //time to do something special for the last item
                    //     // debugger;
                    //     // const sta = $quizState.current;
                    // }

                    const nextCorrectItemIndex = answers.filter(
                        (answer) => answer.stepIndex === nextStep
                    )[0].itemIndex;
                    const nextCorrectItem = items[nextCorrectItemIndex];

                    const instructionMsg = createInstructionMsg(
                        capitalizeFirstLetter(nextCorrectItem?.label) || "",
                        $quizState.current?.currentRound?.type
                    );

                    animationFrame = window.requestAnimationFrame(() => {
                        setInstruction(instructionMsg);
                        setPromptContent(null);

                        if (
                            MULTIPLE_ANSWER_TEXT_CARDS !==
                            $quizState.current.currentRound?.type
                        ) {
                            setShowInstruction(true);
                        }
                    });

                    const sayInstruction = promiseKeeper.withRC(
                        synthVoice.say(instructionMsg),
                        { resolveOnError: true, label: "sayInstruction" }
                    );

                    await sayInstruction;

                    animationFrame = window.requestAnimationFrame(() => {
                        setPromptContent({
                            eventType: getPromptEventTypeByRoundType(
                                $quizState.current.currentRound?.type
                            ),
                        });
                        setActive(true);
                    });
                } else {
                    logg("done with current round / set of items. ");

                    const congratsMsg =
                        CONGRATS.roundComplete[
                            getRandomUpTo(CONGRATS.roundComplete.length - 1, 5)
                        ];
                    //await sayCorrect; //THIS COMMIENT IS RISKY

                    dispatch({ type: "advanceProgress" });

                    const progressBarHasAdvanced = promiseKeeper.stall(
                        DURATIONS.enter * 2,
                        "progressBarHasAdvanced"
                    );
                    await progressBarHasAdvanced;
                    animationFrame = window.requestAnimationFrame(() => {
                        setShowInstruction(false);
                        setPromptContent({
                            eventType: "done",
                            text: congratsMsg,
                        });
                    });

                    const sayCongrats = promiseKeeper.withRC(
                        synthVoice.say(congratsMsg),
                        { resolveOnError: true, label: "sayCongrats" }
                    );
                    await sayCongrats;

                    //fade out items
                    animationFrame = window.requestAnimationFrame(() => {
                        setShowItems(false);
                    });

                    const nextRoundIndex =
                        ($quizState.current?.currentRound?.roundIndex ?? 0) + 1;

                    if (nextRoundIndex < quizState.numTotalRounds) {
                        //More rounds left to go. Advance to the next round.
                        // if (roundIndex > 0) {
                        //     setShowOverlay(true);
                        //     const whiteOut = promiseKeeper.withRC(
                        //         promiseKeeper.stall(750),
                        //         {
                        //             resolveOnError: true,
                        //             label: "whiteOut-after-round",
                        //         }
                        //     );
                        //     await whiteOut;
                        // }
                        return advanceRound({
                            nextRoundIndex,
                            completed: true,
                        });
                    } else {
                        //Quiz is complete

                        logg("quiz is complete");

                        // const finalCongratsMsg =
                        //     CONGRATS.roundComplete[
                        //         getRandomUpTo(
                        //             CONGRATS.roundComplete.length - 1,
                        //             3
                        //         )
                        //     ];

                        //setShowInstruction(false);

                        dispatch({
                            type: "goNextRound",
                            payload: { completed: true },
                        });

                        const fadeOutOldItems = promiseKeeper.stall(
                            DURATIONS.exit +
                                $currentRound.current.numSteps * 100,
                            "last_items_fadeout"
                        );

                        // pendingRCPromise = fadeOutOldItems;
                        await fadeOutOldItems;
                        setShowSummary(true);
                        setQuizIsDone(true);
                        setPromptContent({ eventType: "allDone" });

                        const congratsMsg =
                            "Congratulations, you have passed the test!";
                        setSummary(congratsMsg);

                        promiseKeeper.withRC(synthVoice.say(congratsMsg), {
                            resolveOnError: true,
                            label: "sayFinalCongrats",
                        });
                        setActive(false);
                        $active.current = false;
                    }
                }
            } catch (err) {
                promiseKeeper.resolveLatest();
                loggError(err);
            }
        },
        [$currentRound, $quizState, quizState.answerSlots, $answerSlots]
    );

    const handlePressEnd = useCallback(
        async ({
            event,
            selectedStepIndex,
            selectedSlotIndex,
            currentRound,
            selectedSlot,
        }) => {
            event.preventDefault && event.preventDefault();
            event.stopPropagation && event.stopPropagation();
            if (!$active.current || selectedStepIndex < $currentRound.step) {
                return null;
            }

            processAnswer({
                selectedStepIndex,
                currentRound,
                selectedSlotIndex,
                selectedSlot,
            });
        },
        [processAnswer, $active.current]
    );

    const handleRetry = useCallback(
        (ev) => {
            initGame({ restart: true, items });
            setQuizIsDone(false);
            setPromptContent(null);
            setShowSummary(false);
        },
        [items, initGame, setShowSummary]
    );

    const ProgressBarContainer = () => (
        <div className={clsx(styles.progressContainer)}>
            <div className={clsx("progressBar", styles.progressBar)}>
                <div
                    className={clsx(
                        "progress gradient",
                        styles.progress,
                        progressing && "animation--flash",
                        progressing && styles.animationFlash
                    )}
                    ref={(e) => {
                        progressBarRef.current = e;
                    }}
                />
            </div>
        </div>
    );

    const Instructions = () => (
        <div className={clsx("instruction-wrapper", styles.instructionWrapper)}>
            <dt
                className={clsx(
                    styles.instruction,
                    styles.unselectable,
                    "instruction unselectable"
                )}
                onClick={(e) => {
                    e.preventDefault();
                    active && synthVoice.say(instruction);
                }}
            >
                <SplitText
                    initialPose="exit"
                    pose={showInstruction ? "enter" : "exit"}
                    charPoses={POSES.char_fadeIn}
                    speechRate={
                        (synthVoice &&
                            synthVoice.config &&
                            synthVoice.config.rate) ||
                        0
                    }
                    className={clsx(styles.letter, "letter stroke")}
                >
                    {instruction ?? ""}
                </SplitText>
            </dt>
        </div>
    );

    const Answers = ({
        styles,
        cover,
        logo,
        title,
        brand,
        date,
        currentRound,
    }) => {
        const { answers } = currentRound;
        if (!answers || !answers.length) return null;

        const currentRoundType = currentRound.type;
        const hasBeenAnswered = currentRound.completed; //might cause a bug
        const isCardActive = active;

        if (currentRoundType === SAY__REPEAT) {
            return (
                <Grid item>
                    <PosedContainer
                        initialPose="hidden"
                        pose={showItems ? "visible" : "hidden"}
                        className={clsx(
                            styles.recordBtnContainer,
                            "record-btn--container"
                        )}
                        pos={currentRound.numSteps - 1 - 0}
                        i={0}
                        //isCorrectItem={isCorrectAnswer}
                        hasBeenAnswered={hasBeenAnswered}
                        step={step}
                        round={roundIndex}
                        numAnswers={numAnswers}
                        active={isCardActive}
                    >
                        <DraggableBall>
                            <Fab
                                aria-label={"record-btn"}
                                className={clsx(styles.recordBtn, "record-btn")}
                                color="primary"
                                onClick={() => startRecognition()}
                                style={{
                                    background:
                                        "linear-gradient(75deg, var(--red-1), var(--red-3",
                                }}
                            >
                                <Mic
                                    className={clsx(
                                        "record-icon",
                                        styles.recordIcon,
                                        speechRecognizer?.state
                                    )}
                                />
                            </Fab>
                        </DraggableBall>
                    </PosedContainer>
                </Grid>
            );
        }

        if (currentRoundType === MULTIPLE_ANSWER_TEXT_CARDS) {
            return (
                <div
                    className={clsx(
                        styles.answerList,
                        styles[`total${Math.min(4, numAnswers)}`],
                        `answer-list total--${Math.min(4, numAnswers)}`
                    )}
                >
                    {rounds && rounds.length > 0 && (
                        <PosedList
                            pose={showItems ? "visible" : "hidden"}
                            initialPose={"hidden"}
                            className={clsx(styles.posedList, "posed-list")}
                            //animateOnMount={true}
                            step={currentStepIndex}
                            overallStep={step}
                            round={currentRoundIndex}
                            active={active}
                            numAnswers={numAnswers}
                            onPoseComplete={(ev) => {
                                // debugger;
                                // $promiseKeeper.current.resolve(
                                //     "stall_till_present_items"
                                // );
                                //this might cause a bug when the latestPromise is not the one whose animation has just ended
                                $promiseKeeper.current.resolveLatest(
                                    "pose complete"
                                );
                                // debugger;
                                // promiseKeeper.resolve("present_items");
                                // promiseKeeper.resolveLatest(
                                //     "enter animation finished"
                                // );
                                // handlePoseComplete("PosedList");
                            }}
                        >
                            {answerSlots.map((answerSlot, i) => {
                                const { stepIndex, itemIndex } = answerSlot;
                                const isCorrectAnswer =
                                    stepIndex === currentRound.step;

                                //bug
                                const hasBeenAnswered = answerSlot.completed;
                                const hasJustBeenAnswered =
                                    completed && i === stepIndex + 1;
                                const isCardActive = active && !hasBeenAnswered;

                                //todo: figure out why itemIndex is wrong
                                const item = answerSlot.item;
                                const imageItem = getOneImageItem(item);

                                const imgURL =
                                    imageItem?.urls?.small ??
                                    imageItem?.urls?.regular;

                                return (
                                    <PosedCard
                                        key={`${stepIndex}${itemIndex}${imgURL}`}
                                        className={clsx(
                                            styles.answerItem,
                                            "answer-item",

                                            isCardActive
                                                ? styles.active
                                                : styles.disabled,
                                            isCardActive
                                                ? "active"
                                                : "disabled",

                                            isCorrectAnswer &&
                                                styles.answerItemIsCorrectAnswer,
                                            hasJustBeenAnswered &&
                                                styles.answerItemHasJustBeenAnswered,
                                            hasBeenAnswered &&
                                                styles.answerItemHasBeenAnswered,

                                            isCorrectAnswer &&
                                                "answer-item--is-correct-answer",
                                            hasJustBeenAnswered &&
                                                "answer-item--has-just-been-answered",
                                            hasBeenAnswered &&
                                                "answer-item--has-been-answered",
                                            "unselectable"
                                        )}
                                        style={{
                                            //first should be put on top!
                                            zIndex: 10 + numAnswers - i,
                                        }}
                                        initialPose={"hidden"}
                                        onPressEnd={(e) =>
                                            handlePressEnd({
                                                event: e,
                                                selectedStepIndex: stepIndex,
                                                selectedSlotIndex: i,
                                                currentRound,
                                                selectedSlot: answerSlot,
                                            })
                                        }
                                        pos={numSteps - 1 - i}
                                        i={i}
                                        isCorrectItem={isCorrectAnswer}
                                        hasBeenAnswered={hasBeenAnswered}
                                        step={step}
                                        round={roundIndex}
                                        numAnswers={numAnswers}
                                        active={isCardActive}
                                    >
                                        <ImageCard
                                            //className={"text-card"}
                                            className={styles?.imageCard}
                                            imgURL={imgURL}
                                            urls={imageItem?.urls}
                                            elevation={2}
                                            active={isCardActive}
                                            label={capitalizeFirstLetter(
                                                item?.label
                                            )}
                                            bgClass={"gradient"}
                                            showHeader={true}
                                            showHeaderText={true}
                                            headerBottom={true}
                                            showBgImage={hasBeenAnswered}
                                        />
                                    </PosedCard>
                                );
                            })}
                        </PosedList>
                    )}
                </div>
            );
        }

        if (currentRoundType === MULTIPLE_ANSWER_CARDS) {
            return (
                <div
                    className={clsx(
                        styles.answerList,
                        styles[`total${Math.min(4, numAnswers)}`],
                        `answer-list total--${Math.min(4, numAnswers)}`
                    )}
                >
                    {rounds && rounds.length > 0 && (
                        <PosedList
                            pose={showItems ? "visible" : "hidden"}
                            initialPose={"hidden"}
                            className={clsx(styles.posedList, "posed-list")}
                            //animateOnMount={true}
                            step={currentStepIndex}
                            overallStep={step}
                            round={currentRoundIndex}
                            active={active}
                            numAnswers={numAnswers}
                            onPoseComplete={(ev) => {
                                // debugger;
                                // $promiseKeeper.current.resolve(
                                //     "stall_till_present_items"
                                // );
                                //this might cause a bug when the latestPromise is not the one whose animation has just ended
                                $promiseKeeper.current.resolveLatest(
                                    "pose complete"
                                );
                                // debugger;
                                // promiseKeeper.resolve("present_items");
                                // promiseKeeper.resolveLatest(
                                //     "enter animation finished"
                                // );
                                // handlePoseComplete("PosedList");
                            }}
                        >
                            {answerSlots.map((answerSlot, i) => {
                                const { stepIndex, itemIndex } = answerSlot;
                                //todo: figure out why itemIndex is wrong
                                //update: is it?

                                const isCorrectAnswer = stepIndex === step;
                                const hasBeenAnswered =
                                    answerSlot.completed || quizIsDone;

                                const hasJustBeenAnswered = i === stepIndex + 1;
                                const isCardActive = active && !hasBeenAnswered;

                                const item = answerSlot.item;
                                const imageItem = getOneImageItem(item);
                                const imgURL = getAppropriateImageUrl(
                                    imageItem?.urls
                                );

                                return (
                                    <PosedCard
                                        key={`${stepIndex}${itemIndex}${imgURL}`}
                                        className={clsx(
                                            styles.answerItem,
                                            "answer-item",

                                            isCardActive
                                                ? styles.active
                                                : styles.disabled,
                                            isCardActive
                                                ? "active"
                                                : "disabled",

                                            isCorrectAnswer &&
                                                styles.answerItemIsCorrectAnswer,
                                            hasJustBeenAnswered &&
                                                styles.answerItemHasJustBeenAnswered,
                                            hasBeenAnswered &&
                                                styles.answerItemHasBeenAnswered,

                                            isCorrectAnswer &&
                                                "answer-item--is-correct-answer",
                                            hasJustBeenAnswered &&
                                                "answer-item--has-just-been-answered",
                                            hasBeenAnswered &&
                                                "answer-item--has-been-answered",
                                            "unselectable"
                                        )}
                                        style={{
                                            //first should be put on top!
                                            zIndex: 10 + numAnswers - i,
                                        }}
                                        initialPose={"hidden"}
                                        onPressEnd={(e) =>
                                            handlePressEnd({
                                                event: e,
                                                selectedStepIndex: stepIndex,
                                                selectedSlotIndex: i,
                                                currentRound,

                                                selectedSlot: answerSlot,
                                            })
                                        }
                                        pos={numSteps - 1 - i}
                                        i={i}
                                        isCorrectItem={isCorrectAnswer}
                                        hasBeenAnswered={hasBeenAnswered}
                                        step={step}
                                        round={roundIndex}
                                        numAnswers={numAnswers}
                                        active={isCardActive}
                                    >
                                        <ImageCard
                                            className={styles?.imageCard}
                                            imgURL={imgURL}
                                            headerBottom={true}
                                            urls={imageItem?.urls}
                                            showBgImage={true}
                                            elevation={2}
                                            active={isCardActive}
                                            label={capitalizeFirstLetter(
                                                item?.label
                                            )}
                                            showHeader={hasBeenAnswered}
                                            showHeaderText={hasBeenAnswered}
                                            renderHeader={(label) => {
                                                return (
                                                    <SplitText
                                                        initialPose="exit"
                                                        pose={
                                                            hasBeenAnswered
                                                                ? "enter"
                                                                : "exit"
                                                        }
                                                        charPoses={
                                                            POSES.char__stagger
                                                        }
                                                        wordPoses={
                                                            POSES.char_fadeIn__old
                                                        }
                                                    >
                                                        {label}
                                                    </SplitText>
                                                );
                                            }}
                                        />
                                    </PosedCard>
                                );
                            })}
                        </PosedList>
                    )}
                </div>
            );
        }
    };

    useEffect(() => {
        if (DEBUGGING) {
            window.resolveLatest = () => {
                if ($promiseKeeper.current.resolveLatest) {
                    $promiseKeeper.current.resolveLatest();
                }
            };
            window.resolveAll = () => promiseKeeper.resolveAll();
            window.getLatest = () => promiseKeeper.latestPromise;

            handlePress(
                {
                    key: " ",
                    on: "keyup",
                },
                (keyEvent) => {
                    //  logg("Latest promise: ", promiseKeeper.latestPromise);
                    promiseKeeper.resolveLatest();

                    // processAnswer({
                    //     selectedStepIndex: 0, //to mark it as a correct answer
                    //     selectedSlotIndex: 0,
                    //     selectedSlot: $quizState.current.answerSlots?.[0],
                    //     currentRound: $quizState.current.currentRound,
                    // });
                }
            );
            handlePress(
                {
                    key: "ArrowUp",
                    on: "keyup",
                },
                (keyEvent) => {
                    promiseKeeper.resolveLatest();
                }
            );
            handlePress(
                {
                    key: "ArrowDown",
                    on: "keyup",
                },
                (keyEvent) => {
                    promiseKeeper.resolveLatest();
                }
            );

            handlePress(
                {
                    key: "=",
                    on: "keyup",
                },
                (keyEvent) => {
                    //logg(keyEvent);
                    goNextBackground();
                }
            );
            handlePress(
                {
                    key: "-",
                    on: "keyup",
                },
                (keyEvent) => {
                    //logg(keyEvent);
                    goPrevBackground();
                }
            );
        }

        return () => {
            //on unmount (do cleanup)
            synthVoice.shutUp();
            promiseKeeper.clearAll();
            window.cancelAnimationFrame(animationFrame);
            removePressHandlers();
        };
    }, []);

    useEffect(() => {
        if (!gameStarted) return;
        fetchItems(props.items).then((items) => {
            initGame({ items });
        });
    }, [props.items]);

    useEffect(() => {
        if (currentRound.type === SAY__REPEAT) {
            const correctItem = items?.[currentRound.correctItem?.itemIndex];
            const answerVideo = correctItem?.videoSet ?? correctItem?.links;
            setVideo(answerVideo);
            if (correctItem?.completed) {
                debugger;
                setShowBg(false);
            }
            return;
        }
    }, [currentRound]);

    useEffect(() => {
        $quizState.current = quizState;
        $currentRound.current = quizState.currentRound;
        $answerSlots.current = quizState.answerSlots;
        $correctSlotIndex.current = quizState.correctSlotIndex;

        // logg(
        //     "$correctSlotIndex.current: " +
        //         $correctSlotIndex.current +
        //         " Also updated: $quizState, $currentRound, $answerSlots, $correctSlotIndex. ",
        //     $currentRound.current,
        //     $answerSlots.current
        // );
    }, [
        quizState.currentRound,
        quizState.answerSlots,
        quizState.correctSlotIndex,
    ]); //after every quizState change

    useEffect(() => {
        $active.current = active;
    }, [active]);

    useEffect(() => {
        const newState = quizState;
        $quizState.current = newState;
    }, [quizState]);

    useEffect(() => {
        const roundI = quizState.roundIndex;
        if (roundI < 2) return; //warm-up rounds
        animationFrame = window.requestAnimationFrame(() => {
            goNextBackground();
        });
    }, [quizState.roundIndex]);

    const progressBarRef = useRef({});

    useEffect(() => {
        if (progressBarRef.current?.style) {
            progressBarRef.current.style.width = progress + "%";
        }
    }, [progress]);

    useEffect(() => {
        logg("step: ", step);
    }, [step]);

    if (!items) {
        return (
            <div>
                Hmm. It looks like our server is a little tired. Sorry about
                that. Please try reloading the page soon.
            </div>
        );
    }

    if (!gameStarted) {
        return (
            <Entrance
                header="Quiz time!"
                subheader={summary}
                isSoundOn={isSoundOn}
                synthVoice={synthVoice}
                active={active}
                poses={POSES.char_fadeIn}
                styles={styles}
                SplitText={SplitText}
                className={"page quiz-page"}
                handlePrimaryClick={handleRetry}
                onStart={() => {
                    fetchItems(props.items).then((items) => {
                        initGame({ items });
                    });
                }}
            />
        );
    }

    if (!items.length) {
        return <GlowingLoader fullpage={true}></GlowingLoader>;
    }

    if (showSummary) {
        return (
            <React.Fragment>
                <SoundPlayer />
                <Summary
                    header="Congratulations, you have passed the test!"
                    subheader={summary}
                    isSoundOn={isSoundOn}
                    synthVoice={synthVoice}
                    active={active}
                    poses={POSES.char_fadeIn}
                    styles={styles}
                    SplitText={SplitText}
                    className={"page"}
                    handlePrimaryClick={handleRetry}
                />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div
                className={clsx(
                    styles.root,
                    styles[screenSize],
                    styles.hasBefore,
                    styles.showBefore,
                    styles.hasAfter,
                    "quiz page",
                    styles[background],
                    //background,
                    showBg && "has-before show-before has-after",
                    showOverlay && "show-after white-out",
                    showOverlay && styles.showAfter,
                    showOverlay && styles.whiteOut
                )}
            >
                {ProgressBarContainer()}
                {Instructions()}
                {Answers({ styles, currentRound })}

                <SoundPlayer />
                <Prompt
                    content={promptContent}
                    active={active}
                    className={clsx(styles.promptSection, "prompt-section")}
                />
            </div>
        </React.Fragment>
    );
};

export default Quiz;
