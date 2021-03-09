import React, { useCallback } from "react";
import clsx from "clsx";
import Text from "../Text/Text.js";
import Button from "@material-ui/core/Button";

const Entrance = ({
    header,
    subheader,
    isSoundOn,
    synthVoice,
    active,
    poses,
    styles,
    SplitText,
    onStart,
}) => {
    const handleStart = useCallback(() => {
        onStart && onStart();
    }, [onStart]);
    return (
        <div
            className={clsx("quiz-entrance--page", styles.instructionWrapper)}
            style={{ height: "100%" }}
        >
            <div
                className={clsx(
                    "quiz-entrance",
                    styles.instruction,
                    styles.unselectable,
                    "congratsMsg unselectable"
                )}
            >
                <Text
                    onClick={(e) => {
                        e.preventDefault();
                        isSoundOn && synthVoice.say(header + " " + subheader);
                    }}
                >
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
                <Button
                    className={"gradient-primary btn-primary"}
                    //variant="outlined"
                    //color={showVideo ? "secondary" : "secondary"}
                    size="large"
                    onClick={handleStart}
                >
                    Start!
                </Button>
            </div>
        </div>
    );
};

export default Entrance;
