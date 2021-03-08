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

const createInstructionMsg = (animalName = "", type = "touch") => {
    return animalName || "";
    // type === "touch"
    //     ? `Touch a picture of ${getAorAn(animalName)} ${animalName}`
    //     : type === "say"
    //     ? `Say "${animalName}!"`
    //     : "";
};

// const backgroundClasses = [
//     "cloud-up",
//     "cloud-left",
//     "beach",
//     "fun-gumi",
//     "great-fragrance",
//     "field-day",
//     "squares--primary",
//     "squares--3-colors",
//     "squares--multi-direction",
//     "squares",
//     "stairs",
//     "space"
// ];
const compLabel = "Quiz";
// let promiseKeeper;
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
        capitalizeTitle,
        pickRandomFrom,
    } = appUtils;

    const [showItems, setShowItems] = useState(false);
    // const [clientSideItems, setClientSideItems] = useState([]);
    // const [staticItems, setStaticItems] = useState(props.items || []);

    const [instruction, setInstruction] = useState(" ");
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
        // const ajaxResult = await request("POST", "images/POST/getAll", {})

        // const ajaxResult = await request(
        //     "POST",
        //     ENDPOINTS.foods.POST.getAll.path,
        //     { user: appState.user, collectionName: "all" }
        // );\

        // if(config.items) {

        // }

        // const ajaxResult = await request("POST", "/api/foods", {
        //     collectionName: "all",
        // });

        // const { error, data } = ajaxResult;
        // if (error) {
        //     loggError(error);
        //     console.log("error in AJAX ", error);
        //     debugger;
        // }

        // if (!data) throw new Error("No data received");

        // const participatingItems = Object.values(ajaxResult.data || {}).flat();

        // const participatingItems = Object.values(
        //     props.subcategories || {}
        // ).flat();

        // setClientSideItems(participatingItems);

        // debugger;

        const { items } = config;

        dispatch({
            type: "createGame",
            payload: { items, config: { numAnswersRequired: 3 } },
        });
        synthVoice.turnOn();
        synthVoice.wakeUp();

        setActive(false);
        $active.current = false;

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
                DURATIONS.enter * 5 * quizState.currentRound.numAnswers + 800;

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
            const correctItemLabel = capitalizeTitle(
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

        const fetchItems = async () => {
            //currently take it from the static props
            // await promiseKeeper.stall(1500);
            debugger;

            const _items = [
                {
                    label: "Sushi",
                    images: [
                        {
                            photographer: undefined,
                            tags: undefined,
                            //label: "Sushi",
                            title: "Sushi",
                            urls: {
                                full:
                                    "https://images.unsplash.com/photo-1583571560096-eb4462cdba30?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
                                regular:
                                    "https://images.unsplash.com/photo-1583571560096-eb4462cdba30?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
                                small:
                                    "https://images.unsplash.com/photo-1583571560096-eb4462cdba30?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
                                thumb:
                                    "https://images.unsplash.com/photo-1583571560096-eb4462cdba30?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
                            },
                        },
                    ],
                },
                {
                    label: "Cookie",
                    images: [
                        {
                            photographer: undefined,
                            tags: undefined,
                            //label: "Cookie",
                            title: "Cookie",
                            urls: {
                                raw:
                                    "https://images.unsplash.com/photo-1464195085758-89f3e55e821e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
                                full:
                                    "https://images.unsplash.com/photo-1464195085758-89f3e55e821e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
                                regular:
                                    "https://images.unsplash.com/photo-1464195085758-89f3e55e821e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
                                small:
                                    "https://images.unsplash.com/photo-1464195085758-89f3e55e821e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
                                thumb:
                                    "https://images.unsplash.com/photo-1464195085758-89f3e55e821e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
                            },
                        },
                    ],
                },
            ];
            // return props.items;
            return _items;
        };
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
        if (progressBarRef.current.style) {
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
                        capitalizeTitle(items[nextCorrectItemIndex]?.label) ||
                            "BALAGAN"
                    );
                    debugger;

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
                            capitalizeTitle(
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
                        const preMsg = "You are all done!";

                        const finalCongratsMsg =
                            preMsg +
                            " " +
                            CONGRATS.roundComplete[
                                getRandomUpTo(
                                    CONGRATS.roundComplete.length - 1,
                                    3
                                )
                            ];
                        setShowInstruction(false);

                        dispatch({ type: "goNextRound" });

                        const fadeOutOldItems = promiseKeeper.stall(
                            DURATIONS.exit +
                                $currentRound.current.numSteps * 100,
                            "last_items_fadeout"
                        );

                        // pendingRCPromise = fadeOutOldItems;
                        await fadeOutOldItems;

                        setShowInstruction(true);

                        setInstruction(finalCongratsMsg);
                        setShowInstruction(true);
                        setQuizIsDone(true);

                        setPromptContent({ eventType: "allDone" });
                        promiseKeeper.withRC(synthVoice.say(finalCongratsMsg), {
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

    if (!items.length) {
        return <GlowingLoader fullpage={true}></GlowingLoader>;
    }

    // if (quizIsDone) {
    //     const _url = SFX.gameComplete.url;
    //     debugger;
    // }

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
                    styles[background],
                    background,
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
                            key={"instruction"}
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
                                const image = imageItem?.urls?.small;

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
                                            className={styles.imageCard}
                                            imgURL={image}
                                            headerBottom={true}
                                            urls={imageItem?.urls}
                                            elevation={2}
                                            active={isCardActive}
                                            label={capitalizeTitle(item.label)}
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
                    key={"key_prompt"}
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
