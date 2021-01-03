import React, { lazy, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import { AppContext } from "../../contexts/AppContext.jsx";

const LazyAnimalsHome = lazy(() =>
	import(
		/* webpackChunkName: "AnimalsHome", webpackPreLoad: true */ "../partials/AnimalsHome.jsx"
	)
);
const LazyImageStepper = lazy(() =>
	import(/* webpackChunkName: "Review" */ "../partials/ImageStepper.jsx")
);
const LazyQuiz = lazy(() =>
	import(/* webpackChunkName: "Quiz" */ "../partials/Quiz.jsx")
);

let logg;
let promiseKeeper;

const Animals = (props) => {
	const [appUtils, appState] = useContext(AppContext);
	const {
		PromiseKeeper,
		animals = { items: [] },
		Logger,
		loadImage,
		//localStorage
	} = appUtils;
	promiseKeeper = promiseKeeper || new PromiseKeeper({ label: "Animals" });
	const [firstImageIsLoaded, setFirstImageLoaded] = useState(false);
	logg = logg || new Logger({ label: "Animals" }).logg;

	const { match, location } = props;

	useEffect(() => {
		//on mount
		if (animals?.items?.[0]?.imgURL) {
			loadImage(animals.items[0].imgURL).then((image) => {
				setFirstImageLoaded(true);
				logg("Loaded first image!", image);
			});
		}
	}, [loadImage, animals]); //once only

	useEffect(() => {
		logg("appState updated: ", appState);
	}, [appState]);

	return (
		<Switch location={location}>
			{/*Switch renders only one route: the one that FIRST matches (i.e.: order matters here!)*/}
			<Route path={`${match.path}/review`}>
				{(route) => (
					<LazyImageStepper
						route={route}
						firstImageIsLoaded={firstImageIsLoaded}
					/>
				)}
			</Route>

			<Route path={`${match.path}/quiz`}>
				{(route) => <LazyQuiz route={route} rounds={3} numSlots={4} />}
			</Route>

			{/*default route*/}
			<Route>
				{(route) => (
					<LazyAnimalsHome key="defaultRoute" path route={route} />
				)}
			</Route>
		</Switch>
	);
};

Animals.propTypes = {
	className: PropTypes.string,
	match: PropTypes.object,
	location: PropTypes.object,
};

export default withRouter(Animals);
