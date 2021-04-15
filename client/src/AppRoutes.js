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
import ClientTypeSelect from "./pages/ClientTypeSelect/Realtime.entrance.jsx";
import Classroom from "./components/Classroom/Classroom.js";
import Card from "./components/Card/Card.js";
import ClassroomSelect from "./pages/ClassroomSelect/ClassroomSelect.page.jsx";
import LogoScreen from "./pages/LogoScreen/LogoScreen.jsx";
import GlowingLoader from "./components/GlowingLoader/GlowingLoader.jsx";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.jsx";

import recoil, { useRecoilValue, useSetRecoilState } from "recoil";
import videoState from "./store/video.atom.js";
import soundState from "./store/soundState.atom.js";
import showBgState from "./store/showBg.atom.js";

// import isVideoPlayingState from "./store/isVideoPlaying.atom.js";

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

const LazySignup = lazy(() =>
	import(/* webpackChunkName: "Signup" */ "./pages/Signup/Signup.js")
);

const baseRoute = "/";

const AppRoutes = (props) => {
	const { route } = props;
	const { match, location } = route;

	const video = useRecoilValue(videoState);
	const sound = useRecoilValue(soundState);
	const setShowBg = useSetRecoilState(showBgState);

	return (
		<React.Fragment>
			<VideoPlayer
				video={video}
				controls={false}
				noInteraction={true}
				light={false}
				playing={true}
				loop={true}
				faded={false}
				muted={true}
				volume={sound?.muted || !video || !video.playSound ? 0 : 0.25}
				scaleToFitViewport={video?.scaleToFitViewport ?? false}
				startSecond={video?.startSecond ?? 0}
				stopSecond={video?.stopSecond}
				fadeInWhenReady={true}
				onReady={() => {
					//setShowBg(false);
				}}
				//onPlay={() => {
				//	setIsVideoPlaying(true);
				//}}
			></VideoPlayer>
			<Suspense fallback={<GlowingLoader />}>
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

					<Route
						path={`${baseRoute}signup`}
						render={(route) => <LazySignup route={route} />}
					/>

					<Route path={`${baseRoute}loading`}>
						<GlowingLoader route={route} />
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
		</React.Fragment>
	);
};

export default AppRoutes;
