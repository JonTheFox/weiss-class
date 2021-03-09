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
import { useRecoilValue } from "recoil";
import Summary from "./Summary.jsx";
import Entrance from "./Entrance.js";

// import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

// import DebuggerView from "../UI/DebuggerView/DebuggerView.jsx";

import ReactPlayer from "react-player";
import styles from "./quiz.module.scss";

const getAorAn = (noun = "") =>
    ["a", "e", "i", "o", "u"].includes(noun?.[0]?.toLowerCase()) ? "an" : "a";

const SFX = {
    roundComplete: {
        url: "/sfx/app_alert_tone_032.mp3",
    },
    correctAnswer: {
        url:
            "/sfx/zapsplat_multimedia_alert_chime_delay_bright_positive_11634.mp3",
    },
    wrongAnswer: {
        // url: "/sfx/zapsplat_multimedia_game_menu_tone_015_25430.mp3",
        url: "/sfx/app_alert_tone_remove_delete_001.mp3",
    },
    gameComplete: {
        url: "/sfx/app_alert_tone_024.mp3",
    },
};

const PosedList = posed.ul(POSES.list);
const PosedCard = posed.li(POSES.card__pressable___sans_shadow);
// const PosedOverlay = posed.li(POSES.card__pressable);

const createInstructionMsg = (itemName = "", type = "touch") => {
    return itemName || "";
    // type === "touch"
    //     ? `Touch a picture of ${getAorAn(animalName)} ${animalName}`
    //     : type === "say"
    //     ? `Say "${animalName}!"`
    //     : "";
};

const fetchItems = async () => {
    //currently take it from the static props
    // await promiseKeeper.stall(1500);

    const _items = [
        {
            label: "I am driving.",
            images: [
                {
                    photographer: {
                        name: "Yaroslav Shuraev",
                        id: 649765,
                    },
                    //tags: undefined,
                    //label: "Sushi",
                    title: "I am driving.",
                    urls: {
                        regular:
                            " https://images.pexels.com/videos/4434242/pexels-photo-4434242.jpeg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
                    },
                },
            ],
        },

        {
            label: "She is studying.",
            images: [
                {
                    photographer: undefined,
                    tags: undefined,
                    //label: "Sushi",
                    title: "She is studying.",
                    urls: {
                        regular:
                            "https://images.pexels.com/videos/6929087/pictures/preview-14.jpg",
                    },
                },
            ],
        },

        {
            label: "The cats are resting.",
            images: [
                {
                    photographer: undefined,
                    tags: undefined,
                    //label: "Sushi",
                    title: "The cats are resting.",
                    urls: {
                        regular:
                            "https://images.pexels.com/videos/6853901/pexels-photo-6853901.jpeg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
                    },
                },
            ],
        },

        {
            label: "The dog is playing.",
            images: [
                {
                    photographer: {
                        id: 290887,
                        name: "Free Videos",
                        url: "https://www.pexels.com/@free-videos",
                    },
                    tags: undefined,
                    //label: "Sushi",
                    title: "The dog is playing.",
                    urls: {
                        regular:
                            "https://images.pexels.com/videos/853936/free-video-853936.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
                    },
                },
            ],
        },

        {
            label: "I am riding my bike.",
            images: [
                {
                    photographer: {
                        id: 1179532,
                        name: "Kelly Lacy",
                        url: "https://www.pexels.com/@kelly-lacy-1179532",
                    },
                    tags: undefined,
                    //label: "Sushi",
                    title: "I am riding my bike.",
                    urls: {
                        regular:
                            "https://images.pexels.com/videos/2519660/free-video-2519660.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
                    },
                },
            ],
        },

        {
            label: "We are skiing.",
            images: [
                {
                    photographer: {
                        id: 2550885,
                        name: "Adrien JACTA",
                        url: "https://www.pexels.com/@adrien-jacta-2550885",
                    },
                    tags: undefined,
                    //label: "Sushi",
                    title: "We are skiing.",
                    urls: {
                        regular:
                            "https://images.pexels.com/videos/4274798/montagne-piste-de-ski-ski-skier-4274798.jpeg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
                    },
                },
            ],
        },
    ];
    // return props.items;
    return _items;
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
    } = appUtils;

    const [gameStarted, setGameStarted] = useState(false);

    const isSoundOn = useRecoilValue(isSoundOnState);

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

    const [quizState, dispatch] = useReducer(
        quizReducer,
        {
            // items: animals.items,
            items: [],
        },
        initQuizReducer
    );

    const [showInstruction, setShowInstruction] = useState(false);

    const {
        items,
        rounds,
        currentRound,
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

    const debuggerColumns = [
        { title: "Property", field: "property" },
        { title: "Value", field: "value" },
    ];

    const getOneImageItem = useCallback((item) => {
        // const image = item?.images?.[0];
        const image = item && (item.usedImage || item.images[0]);
        return image;
    }, []);

    const initGame = async (config = {}) => {
        const { restart, items } = config;

        dispatch({
            type: "createGame",
            payload: { items, config: { numAnswersRequired: 3 } },
        });
        synthVoice.turnOn();
        synthVoice.wakeUp();

        setActive(false);
        $active.current = false;

        setGameStarted(true);

        const gameCreated = await promiseKeeper.withRC(
            promiseKeeper.stall(100, "game created")
        );

        try {
            animationFrame = window.requestAnimationFrame(() => {
                setShowInstruction(false);
                setShowItems(true);
            });

            if (!quizState.currentRound.numAnswers) {
                debugger;
            }

            const delay =
                DURATIONS.enter * 3 * quizState.currentRound.numAnswers + 0;

            const presentItems = promiseKeeper.stall(delay, "present_items");
            logg(
                "initGame: After stall(), promiseKeeper.promises",
                promiseKeeper.promises
            );

            const {
                correctSlotIndex,
                correctItemIndex,
                correctItem,
            } = $quizState.current;

            await presentItems;
            const { items } = $quizState.current;
            const correctItemLabel = capitalizeFirstLetter(
                items[correctItemIndex]?.label ?? ""
            );

            const instructionMsg = createInstructionMsg(correctItemLabel);
            if (!instructionMsg) {
                logg("NO INSTRUCTION MSG???");
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

            animationFrame = window.requestAnimationFrame(() => {
                setShowInstruction(true);
            });

            await sayInstruction;
            if (!sayInstruction.resolved) {
                debugger;
                logg(
                    "sayInstruction did not really resolve, but resolveOnError flag was passed to PromiseKeeper.withRC :)"
                );
            }

            animationFrame = window.requestAnimationFrame(() => {
                //round 1 starts
                logg("Round 1 starts!");
                setActive(true);
                setPromptContent({ eventType: "touch" });
            });
        } catch (err) {
            loggError(err);
            promiseKeeper.resolveLatest();
        }
    };

    useEffect(() => {
        if (DEBUGGING) {
            window.resolveLatest = () => promiseKeeper.resolveLatest();
            window.resolveAll = () => promiseKeeper.resolveAll();
            window.getLatest = () => promiseKeeper.latestPromise;
            handlePress(
                {
                    key: " ",
                    on: "keyup",
                },
                (keyEvent) => {
                    logg(keyEvent);
                    logg("Latest promise: ", promiseKeeper.latestPromise);
                    promiseKeeper.resolveLatest();
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
                    logg(keyEvent);
                    goNextBackground();
                }
            );
            handlePress(
                {
                    key: "-",
                    on: "keyup",
                },
                (keyEvent) => {
                    logg(keyEvent);
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
        // const _clientSideitems = clientSideItems;

        if (!gameStarted) return;
        fetchItems().then((items) => {
            initGame({ items });
        });

        // const _serverSideItems = staticItems;
        // debugger;
    }, [props.items]);

    useEffect(() => {
        $quizState.current = quizState;
        $currentRound.current = quizState.currentRound;
        $answerSlots.current = quizState.answerSlots;
        $correctSlotIndex.current = quizState.correctSlotIndex;

        logg(
            "$correctSlotIndex.current: " +
                $correctSlotIndex.current +
                " Also updated: $quizState, $currentRound, $answerSlots, $correctSlotIndex. ",
            $currentRound.current,
            $answerSlots.current
        );
    }, [
        quizState.currentRound,
        quizState.answerSlots,
        quizState.correctSlotIndex,
    ]); //after every quizState change

    useEffect(() => {
        $active.current = active;
        logg("active: ", active);
    }, [active]);

    useEffect(() => {
        const newState = quizState;
        $quizState.current = newState;
        // debugger;
    }, [quizState]);

    // useEffect(() => {
    //     if (appState.user && quizState.step <= 0) {
    //         initGame();
    //     }
    // }, [appState]);

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

    const handlePressEnd = useCallback(
        async (ev, selectedAnswerStep, selectedAnswerSlot) => {
            ev.preventDefault();
            if (!$active.current || selectedAnswerStep < $currentRound.step) {
                return null;
            }

            ev.preventDefault && ev.preventDefault();
            ev.stopPropagation && ev.stopPropagation();

            dispatch({ type: "clearCorrect", payload: {} });

            const { step, roundIndex } = $currentRound.current;

            if (!step === $quizState.current.step) {
                debugger;
            }

            let wrongAnswer =
                selectedAnswerSlot !== $quizState.current.correctSlotIndex;

            try {
                if (quizIsDone) {
                    return "quiz is done";
                }

                logg("correct answer selected:  ", !wrongAnswer);

                if (wrongAnswer) {
                    // setActive(true);
                    animationFrame = window.requestAnimationFrame(() => {
                        dispatch({ type: "incorrectAnswer", payload: {} });
                        setPromptContent({ eventType: "incorrect" });
                    });

                    return null;
                }

                //correct answer
                setActive(false);
                //dispatch({ type: "correctAnswer" });

                const nextStep = step + 1;

                animationFrame = window.requestAnimationFrame(() => {
                    dispatch({ type: "goNextStep" });
                });

                const sayCorrect = promiseKeeper.withRC(
                    synthVoice.say("Correct!!"),
                    { resolveOnError: true, label: "sayCorrect" }
                );

                animationFrame = window.requestAnimationFrame(() => {
                    setPromptContent({ eventType: "correct" });
                });

                await sayCorrect;
                dispatch({ type: "clearCorrect", payload: {} });

                const { lastStep, answers } = $currentRound.current;
                const { items } = $quizState.current;

                if (nextStep <= lastStep) {
                    //There are still some items left to match. Prepare for the next step

                    const isLastStep = nextStep === lastStep;

                    if (isLastStep) {
                        //time to do something special for the last item
                        // debugger;
                        // const sta = $quizState.current;
                    }

                    const nextCorrectItemIndex = answers.filter(
                        (answer) => answer.stepIndex === nextStep
                    )[0].itemIndex;
                    const instructionMsg = createInstructionMsg(
                        capitalizeFirstLetter(
                            items[nextCorrectItemIndex]?.label
                        ) || "BALAGAN"
                    );

                    animationFrame = window.requestAnimationFrame(() => {
                        setInstruction(instructionMsg);
                        setPromptContent(null);
                        setShowInstruction(true);
                    });

                    const sayInstruction = promiseKeeper.withRC(
                        synthVoice.say(instructionMsg),
                        { resolveOnError: true, label: "sayInstruction" }
                    );

                    await sayInstruction;

                    animationFrame = window.requestAnimationFrame(() => {
                        setPromptContent({ eventType: "touch" });
                        setActive(true);
                    });
                } else {
                    logg("done with current round / set of items. ");

                    const congratsMsg =
                        CONGRATS.roundComplete[
                            getRandomUpTo(CONGRATS.roundComplete.length - 1, 5)
                        ];
                    await sayCorrect;
                    dispatch({ type: "advanceProgress" });

                    const progressBarHasAdvanced = promiseKeeper.stall(
                        DURATIONS.enter * 2,
                        "progressBarHasAdvanced"
                    );
                    await progressBarHasAdvanced;
                    animationFrame = window.requestAnimationFrame(() => {
                        setShowInstruction(false);
                        // setInstruction("");
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

                    const nextRoundIndex = roundIndex + 1;

                    if (nextRoundIndex < quizState.numTotalRounds) {
                        //More rounds left to go. Advance to the next round.

                        //advance to the next round manually (since useReducer does not provide up-to-date quizState in callbacks)
                        const nextRound = quizState.rounds[nextRoundIndex];

                        const nextCorrectAnswer = nextRound.answers.filter(
                            (answer) => answer.stepIndex === 0
                        )[0];

                        if (!nextCorrectAnswer) debugger;
                        const instructionMsg = createInstructionMsg(
                            capitalizeFirstLetter(
                                quizState.items[nextCorrectAnswer.itemIndex]
                                    .label
                            )
                        );

                        const fadeOutItems = promiseKeeper.stall(
                            DURATIONS.exit * $currentRound.current.numAnswers +
                                700,
                            "fadeout-old-items"
                        );

                        await fadeOutItems;

                        if (roundIndex > 0) {
                            setShowOverlay(true);
                            const whiteOut = promiseKeeper.withRC(
                                promiseKeeper.stall(750),
                                {
                                    resolveOnError: true,
                                    label: "whiteOut-after-round",
                                }
                            );
                            await whiteOut;
                        }

                        dispatch({ type: "goNextRound" });

                        animationFrame = window.requestAnimationFrame(() => {
                            setInstruction(instructionMsg);
                            setShowOverlay(false);
                            setShowItems(true);

                            setPromptContent(null);
                        });

                        const numAnswers =
                            $currentRound?.current.answers?.length ?? 0;

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

                        setShowInstruction(true);
                        await sayInstruction_newRound;

                        animationFrame = window.requestAnimationFrame(() => {
                            setPromptContent({ eventType: "touch" });
                            setActive(true);
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

                        dispatch({ type: "goNextRound" });

                        const fadeOutOldItems = promiseKeeper.stall(
                            DURATIONS.exit +
                                $currentRound.current.numSteps * 100,
                            "last_items_fadeout"
                        );

                        // pendingRCPromise = fadeOutOldItems;
                        await fadeOutOldItems;

                        setShowSummary(true);

                        // setShowInstruction(true);

                        //setInstruction(congratsMsg);
                        // setShowInstruction(true);
                        setQuizIsDone(true);

                        setPromptContent({ eventType: "allDone" });

                        // const joinedCongratsMsgs =
                        //     "Congratulations, you have passed the test!" +
                        //     " " +
                        //     finalCongratsMsg;
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

    const handleRetry = useCallback(
        (ev) => {
            initGame({ restart: true, items });
            setQuizIsDone(false);
            setPromptContent("");
            setShowSummary(false);
        },
        [items, initGame, setShowSummary]
    );

    if (!items) {
        return (
            <div>
                Hmm. It looks like our server is a little tired. Sorry about
                that. Please try reloading the page soon.
            </div>
        );
    }

    // return (
    //     <div>
    //         <p>client side items: {clientSideItems.length}</p>
    //         <p>server side items: {staticItems.length}</p>
    //     </div>
    // );

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
                className={"page"}
                handlePrimaryClick={handleRetry}
                onStart={() => {
                    fetchItems().then((items) => {
                        initGame({ items });
                    });
                }}
            />
        );
    }

    if (!items.length) {
        return <GlowingLoader fullpage={true}></GlowingLoader>;
    }

    // if (quizIsDone) {
    //     const _url = SFX.gameComplete.url;
    //     debugger;
    // }

    if (showSummary) {
        return (
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
        );
    }

    return (
        <React.Fragment>
            <dl
                className={clsx(
                    styles.root,
                    styles[screenSize],
                    styles.hasBefore,
                    styles.showBefore,
                    styles.hasAfter,
                    "quiz page",
                    "cancal-white-canvas",
                    styles[background],
                    //background,
                    "has-before show-before has-after",
                    showOverlay && "show-after white-out",
                    showOverlay && styles.showAfter,
                    showOverlay && styles.whiteOut
                )}
            >
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

                <div
                    className={clsx(
                        "instruction-wrapper",
                        styles.instructionWrapper
                    )}
                >
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
                            {instruction}
                        </SplitText>
                    </dt>
                </div>
                <dd
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
                            {answerSlots.map(({ stepIndex, itemIndex }, i) => {
                                const isCorrectAnswer = stepIndex === step;

                                const hasBeenAnswered =
                                    step > stepIndex || completed || quizIsDone;

                                const hasJustBeenAnswered = i === stepIndex + 1;
                                const isCardActive = active && !hasBeenAnswered;

                                const item = items[itemIndex];
                                const imageItem = getOneImageItem(item);
                                const imgURL =
                                    imageItem?.urls?.small ??
                                    imageItem?.urls?.regular;

                                return (
                                    <PosedCard
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
                                            handlePressEnd(e, stepIndex, i)
                                        }
                                        pos={numSteps - 1 - i}
                                        i={i}
                                        isCorrectItem={isCorrectAnswer}
                                        hasBeenAnswered={hasBeenAnswered}
                                        step={step}
                                        round={roundIndex}
                                        numAnswers={numAnswers}
                                        active={isCardActive}
                                        key={"answer" + i}
                                    >
                                        <ImageCard
                                            className={styles?.imageCard}
                                            imgURL={imgURL}
                                            headerBottom={true}
                                            urls={imageItem?.urls}
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
                </dd>
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
                >
                    {props.children}
                </ReactPlayer>
                <Prompt
                    content={promptContent}
                    active={active}
                    className={clsx(styles.promptSection, "prompt-section")}
                />
            </dl>
        </React.Fragment>
    );
};

export default Quiz;

/*

<DebuggerView
                    show={false}
                    columns={debuggerColumns}
                    data={[
                        { property: "Round#", value: quizState.roundIndex },
                        {
                            property: "Step#",
                            value: quizState.currentRound.step,
                        },
                    ]}
                    noHeader={true}
                />
*/
