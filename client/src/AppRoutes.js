import React, { Suspense, lazy, useEffect, useState } from "react";
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
	Fragment,
} from "react-router-dom";

import View from "./components/layout/View.jsx";
import EntireView from "./components/layout/EntireView.jsx";
import ErrorBoundary from "./pages/ErrorPage/ErrorPage.jsx";
import WeissSpinner from "./components/WeissSpinner/WeissSpinner.jsx";
import ClientTypeSelect from "./pages/ClientTypeSelect/Realtime.entrance.jsx";
import Classroom from "./components/Classroom/Classroom.js";
import Card from "./components/Card/Card.js";
import ClassroomSelect from "./pages/ClassroomSelect/ClassroomSelect.page.jsx";
import LogoScreen from "./pages/LogoScreen/LogoScreen.jsx";

// import roomsState from "../../store/rooms.atom.js";
// import roomState from "../../store/room.atom.js";
// import socketState from "../../store/socket.atom.js";
// import userState from "../../store/user.atom.js";
// import clientState from "../../store/client.atom.js";
// import lessonState from "../../store/lesson.atom.js";
// import refsState from "../../store/refs.atom.js";
// import socketConnectionState from "../../store/socketConnection.atom.js";
// import { CONNECTION_STATES } from "../../store/CONNECTION_STATES.js";
// import * as io from "socket.io-client";
// import { localStorage } from "../../lib/issy/index.js";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.jsx";
// import LOCAL_STORAGE_KEY from "../../constants/localStorageKey.js";
// import { ParallaxProvider } from "react-scroll-parallax";

// import ErrorBoundary from "../../pages/ErrorPage/ErrorPage.jsx";
// import "./_RealtimeManager.scss";

const SageAdvice = lazy(() =>
	import(
		/* webpackPrefetch: true, webpackChunkName: "SageAdvice" */ "./pages/SageAdvice/SageAdvice.jsx"
	)
);

const LazyLogin = lazy(() =>
	import(/* webpackChunkName: "Login" */ "./pages/Login/Login.jsx")
);

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

const baseRoute = "/";

const AppRoutes = (props) => {
	const [video, setVideo] = useState(CLOUD_VIDEOS[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const { route } = props;
	const { match, location } = route;

	return (
		<View responsive={true} animateChildren={false} key="innerView">
			<VideoPlayer
				style={{
					position: "absolute",
					zIndex: -1,
				}}
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
			<Suspense fallback={<WeissSpinner />}>
				<Switch location={location}>
					<Route
						path={`${match.path}client-type-select`}
						render={(route) => <ClientTypeSelect route={route} />}
					/>

					<Route
						path={`${match.path}classroom-select`}
						render={(route) => <ClassroomSelect route={route} />}
					/>
					<Route
						path={`${match.path}classroom`}
						render={(route) => <Classroom route={route} />}
					/>

					<Route path={`${baseRoute}advice`}>
						<SageAdvice />
					</Route>

					<Route
						path={`${baseRoute}login`}
						render={(route) => <LazyLogin route={route} />}
					/>

					<Route path={`${baseRoute}loading`}>
						<WeissSpinner route={route} />
					</Route>
					<Route path={`${baseRoute}error`}>
						<ErrorBoundary debug={true} route={route} />
					</Route>
					<Route path={`${baseRoute}`}>
						<LogoScreen route={route}></LogoScreen>
					</Route>
					<Redirect to={`${match.path}client-type-select`} />
				</Switch>
			</Suspense>
		</View>
	);
};

export default AppRoutes;
