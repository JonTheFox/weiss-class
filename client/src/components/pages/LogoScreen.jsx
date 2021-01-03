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

const BASE_ROUTE = "app/";

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
	const { navigateTo, request, Logger, PromiseKeeper, EMPTY_FUNC } = appUtils;
	const [video, setVideo] = useState(CLOUD_VIDEOS[0]);

	const [isAwaitingRedirect, setIsAwitingRedirect] = useState(
		appState.isFirstVisit
	);

	const [isPlaying, setIsPlaying] = useState(false);

	// const [searchOptions, setSearchOptions] = useState([]);
	// const [getOptionLabel, setGetOptionLabel] = useState(EMPTY_FUNC);

	useEffect(() => {
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;
		promiseKeeper = new PromiseKeeper({ label });

		// const YOUR_API_KEY =
		// 	"563492ad6f917000010000016e7376111d2542b78cd27c7178641425";

		// request(
		// 	"GET",
		// 	"https://api.pexels.com/videos/search?query=beach&per_page=15&page=1",
		// 	null,
		// 	{ headers: { Authorization: YOUR_API_KEY } }
		// ).then((res) => {
		// 	debugger;
		// });

		/*
https://api.pexels.com/v1/search?query=example+query&per_page=15&page=1

		*/

		/*

query	Get photos related to this query. (required)
per_page	Defines the number of results per page. (optional, default: 15, max: 80)
page	Defines the number of the page. (optional, default: 1)
		*/

		const { pathname } = props.route.location;
		if (
			!appState.isFirstVisit ||
			pathname.length === 1 ||
			pathname === "/app/"
		) {
			return setIsAwitingRedirect(false);
		}
		//Upon first visit in the current session, request the server to provide the riginal URL that was sent to it, so that the client app can know where to navigate
		appState.isFirstVisit = false;
		request("GET", "/redirect/originalUrl").then((ajaxResult) => {
			try {
				const { error, subroutes } = ajaxResult;
				if (error) throw new Error(error);
				if (!subroutes) {
					logg(
						"Not redirecting because the HTTP request was made to the application root."
					);
					setIsAwitingRedirect(false);

					return;
				}

				logg("Redirecting to originally-requested URL: ", subroutes);

				logg(`match.path: ${match.path}`);
				const redirectPath = `${match.path}/${subroutes}`;
				logg(redirectPath);

				window.requestAnimationFrame(() => {
					navigateTo(redirectPath, props.history);
				});
			} catch (err) {
				loggError("Did not redirect. Reason:", err.message);
				appState.isFirstVisit = true;
				setIsAwitingRedirect(false);
			}
		});
	}, []);

	useEffect(() => {
		logg("isAwaitingRedirect: ", isAwaitingRedirect);
	}, [isAwaitingRedirect]);

	return (
		<View
			animate={false}
			className={clsx(
				"logo-screen",
				isAwaitingRedirect
					? "awaiting-redirect"
					: "not-awaiting-redirect",
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
			<Link
				className={"link slide--from-bottom"}
				to={`/${BASE_ROUTE}animals/home`}
			>
				<Button
					className={"enter-btn"}
					variant="outlined"
					color={showVideo ? "secondary" : "secondary"}
					size="large"
				>
					Enter
				</Button>
			</Link>
			<h1 className={clsx("weiss-title unselectable")}>Weiss</h1>
		</View>
	);
};

export default LogoScreen;
