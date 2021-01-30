import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import View from "../../components/layout/View.jsx";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import Card from "../../components/Card/Card.js";
import "./LogoScreen.scss";

const BASE_ROUTE = "/";

const label = "LogoScreen";
let logg;
let loggError;
let promiseKeeper;

// const musicPath = "/music/bensound-goinghigher.mp3";

const LogoScreen = (props) => {
	const { route, showVideo = true } = props;
	const { match } = route;
	const [appUtils, appState] = useContext(AppContext);
	const { request, Logger, PromiseKeeper, EMPTY_FUNC } = appUtils;

	useEffect(() => {
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;
		promiseKeeper = new PromiseKeeper({ label });
	}, []);

	return (
		<View
			animate={false}
			className={clsx(
				"logo-screen position--relative",
				showVideo && "hide-bg"
			)}
		>
			<Link className={"link"} to={`${BASE_ROUTE}client-type-select`}>
				<Button
					className={"enter-btn"}
					variant="outlined"
					color={showVideo ? "secondary" : "secondary"}
					size="large"
				>
					Enter
				</Button>
			</Link>

			<h1 className={clsx("weiss-title unselectable")}>
				<Link
					className={"weiss-title--link"}
					to={`${BASE_ROUTE}client-type-select`}
				>
					Weiss
				</Link>
			</h1>
		</View>
	);
};

export default LogoScreen;
