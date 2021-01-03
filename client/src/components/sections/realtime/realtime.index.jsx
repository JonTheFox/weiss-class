import React, { useContext, useEffect, useRef, Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AppContext } from "../../../contexts/AppContext.jsx";
import RealtimeEntrance from "./realtime.entrance.jsx";
import RealtimeClassroom from "./realtime.classroom.jsx";
import Card from "../../partials/Card.jsx";
import WeissSpinner from "../../partials/WeissSpinner.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";
import View from "../../layout/View.jsx";

import ClassroomSelect from "./ClassroomSelect.page.jsx";

import "./_Realtime.scss";

// let animationFrame;
// let logg;
// let loggError;
// let promiseKeeper;
// const label = "Realtime";
// let socket;
// let clientID;

const SECTION_ROUTE = `realtime/`;

const Realtime = (props) => {
	const [appUtils, appState, setAppState] = useContext(AppContext);
	const { user } = appState;
	const { PromiseKeeper, Logger, getUniqueString, CLIENT_ONLY } = appUtils;

	const refs = useRef({ viewRef: {} });

	// useEffect(() => {
	// 	const logger = new Logger({ label });
	// 	logg = logger.logg;
	// 	loggError = logger.loggError;
	// 	promiseKeeper = new PromiseKeeper({ label });
	// 	return () => {
	// 		window.cancelAnimationFrame(animationFrame);
	// 	};
	// }, []);

	const { location, match } = props.route;

	return (
		<Suspense fallback={<WeissSpinner />}>
			<Switch location={location}>
				<Route
					path={`/${SECTION_ROUTE}classroom`}
					render={(route) => <ClassroomSelect />}
				/>
				<Route render={(route) => <RealtimeEntrance route={route} />} />
			</Switch>
		</Suspense>
	);
};

export default Realtime;