import React from "react";
import clsx from "clsx";
import Text from "../Text/Text.js";
const Summary = ({
    header,
    subheader,
    isSoundOn,
    synthVoice,
    active,
    poses,
    styles,
    SplitText,
}) => {
    return (
        <div
            className={clsx("quiz-summary", styles.instructionWrapper)}
            style={{ height: "100%" }}
        >
            <dt
                className={clsx(
                    styles.instruction,
                    styles.unselectable,
                    "congratsMsg unselectable"
                )}
                onClick={(e) => {
                    debugger;
                    e.preventDefault();
                    isSoundOn && synthVoice.say(header + " " + subheader);
                }}
            >
                <Text>
                    <SplitText
                        initialPose="exit"
                        pose="enter"
                        charPoses={poses}
                        speechRate={
                            (synthVoice &&
                                synthVoice.config &&
                                synthVoice.config.rate) ||
                            0
                        }
                        className={clsx(styles.letter, "letter stroke")}
                    >
                        {header}
                    </SplitText>
                </Text>
                <Text>
                    <SplitText
                        initialPose="exit"
                        pose="enter"
                        charPoses={poses}
                        speechRate={
                            (synthVoice &&
                                synthVoice.config &&
                                synthVoice.config.rate) ||
                            0
                        }
                        delay={2000}
                        className={clsx(styles.letter, "letter stroke")}
                    >
                        {subheader}
                    </SplitText>
                </Text>
            </dt>
        </div>
    );
};

export default Summary;
