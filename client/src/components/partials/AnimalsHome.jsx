import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";

import SplitText from "react-pose-text";
//import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { AppContext } from "../../contexts/AppContext.jsx";
import EmojiCarousel from "./EmojiCarousel.jsx";
import View from "../layout/View.jsx";
import { POSES } from "../../constants/poses.js";
import "./_AnimalsHome.scss";

let promiseKeeper;
let animationFrame;
let logg;
const label = "Animals_Home";

const AnimalsHome = props => {
    const { match, title = "Animals" } = props;
    const [appUtils] = useContext(AppContext);
    const { Logger, navigateTo, PromiseKeeper } = appUtils;
    logg = logg || new Logger({ label }).logg;
    promiseKeeper = new PromiseKeeper({ label });

    const handleLinkClick = path => {
        if (!path || !props.history) return null;
        logg(`Navigating to: ${path}`);
        animationFrame = window.requestAnimationFrame(() => {
            navigateTo(path, props.history);
        });
    };

    useEffect(() => {
        //on mount only
        return () => {
            //on unmount (do cleanup)
            promiseKeeper.clearAll();
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <View animate={false} className={"animals--home flex unselectable"}>
            <div className="section title marquee-section">
                <div className="transition-box slide--from-right animation-delay--1 readable">
                    <SplitText
                        wordPoses={POSES.word__draggable}
                        charPoses={POSES.char__draggable}
                        className={"letter"}
                    >
                        Learn with ease!
                    </SplitText>
                </div>
            </div>

            <div className="section title subject-section">
                <div className="transition-box slide--from-right animation-delay--2 readable">
                    <SplitText
                        wordPoses={POSES.word__draggable}
                        charPoses={POSES.char__draggable}
                        className={"letter"}
                    >
                        {title}
                    </SplitText>
                </div>
            </div>

            <div className="section emoji-section">
                <div className="transition-box transition--opaque animation-delay--3">
                    <EmojiCarousel />
                </div>
            </div>

            <div className={"section nav-section heroButtons"}>
                <Grid container spacing={3} justify="center">
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={"btn readable"}
                            onClick={ev =>
                                handleLinkClick(`${match.url}/review`)
                            }
                        >
                            Review
                        </Button>
                    </Grid>
                    <Grid item className={`btns-row`}>
                        <Button
                            className={"btn readable"}
                            variant="contained"
                            color="primary"
                            onClick={() => handleLinkClick(`${match.url}/quiz`)}
                        >
                            Take a quiz
                            <b>{" !"}</b>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </View>
    );
};

export default withRouter(AnimalsHome);
