import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import clsx from "clsx";

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import { useTheme } from "@material-ui/styles";
// import { makeStyles } from "@material-ui/styles";
import "./LogoScreen.scss";
// import clsx from "clsx";
import View from "../layout/View.jsx";
import VideoPlayer from "../partials/VideoPlayer.jsx";

import Card from "../Card/Card.js";

const BASE_ROUTE = "/";

const resolveUrl = "https://soundcloud.com/ksmtk/chronemics";

const label = "LogoScreen";
let logg;
let loggError;
let promiseKeeper;

const CLOUD_VIDEOS = [
	// {
	// 	title: "from Pexels",
	// 	url:
	// 		"https://player.vimeo.com/external/331114247.sd.mp4?s=774a9cd251c1df88f5f031864a7b66dcdd393837&profile_id=164&oauth2_token_id=57447761",
	// 	stopSecond: 10,
	// },
	{
		title: "Flying Above the Clouds",
		url: "https://www.youtube.com/watch?v=6AJl7DsL-1Y",
		startSecond: 15,
		stopSecond: 60 * 5 + 50,
	},

	{
		title: "Flying into clouds, above clouds and around clouds",
		url: "https://www.youtube.com/watch?v=VmMYfAR21KY",
	},
];

// const musicPath = "/music/bensound-goinghigher.mp3";

const LogoScreen = (props) => {
	const { route, showVideo = true } = props;
	const { match } = route;
	const [appUtils, appState] = useContext(AppContext);
	const { request, Logger, PromiseKeeper, EMPTY_FUNC } = appUtils;
	const [video, setVideo] = useState(CLOUD_VIDEOS[0]);

	const [isPlaying, setIsPlaying] = useState(false);

	// const [searchOptions, setSearchOptions] = useState([]);
	// const [getOptionLabel, setGetOptionLabel] = useState(EMPTY_FUNC);

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
				"logo-screen",
				"position--relative",
				showVideo && "show-video",
				isPlaying && "playing"
			)}
		>
			{showVideo && (
				<VideoPlayer
					controls={false}
					noInteraction={true}
					light={false}
					playing={true}
					muted={true}
					volume={0}
					video={video}
					scaleToFitViewport={true}
					startSecond={video.startSecond || 0}
					stopSecond={video.stopSecond}
					onPlay={() => {
						setIsPlaying(true);
					}}
				></VideoPlayer>
			)}

			<Link className={"link"} to={`${BASE_ROUTE}rt`}>
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
				<Link className={"weiss-title--link"} to={`${BASE_ROUTE}rt`}>
					Weiss
				</Link>
			</h1>
		</View>
	);
};

export default LogoScreen;
