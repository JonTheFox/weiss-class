import React, { Suspense, lazy } from "react";
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import LogoScreen from "./components/pages/LogoScreen.jsx";
import View from "./components/layout/View.jsx";
import EntireView from "./components/layout/EntireView.jsx";
import ErrorBoundary from "./components/pages/ErrorBoundary.jsx";
import WeissSpinner from "./components/partials/WeissSpinner.jsx";

import "./index.scss";

import { AppContextProvider } from "./contexts/AppContext.jsx";
import { DeviceContextProvider } from "./contexts/DeviceContext.jsx";
import theme from "./constants/theme.js";

const LazyAnimals = lazy(() =>
	import(
		/* webpackChunkName: "Animals" */ "./components/sections/Animals.jsx"
	)
);
const SageAdvice = lazy(() =>
	import(
		/* webpackPrefetch: true, webpackChunkName: "SageAdvice" */ "./components/pages/SageAdvice.jsx"
	)
);

const LazySpeechRecognitionTester = lazy(() =>
	import(
		/* webpackChunkName: "SpeechRecognizer" */ "./components/pages/SpeechRecognitionTester.jsx"
	)
);

const LazySpeechRecorder = lazy(() =>
	import(
		/* webpackChunkName: "SpeechRecorder" */ "./components/pages/SpeechRecorder.jsx"
	)
);

const LazySentenceTypes = lazy(() =>
	import(
		/* webpackChunkName: "SentenceTypes" */ "./components/pages/SentenceTypes.jsx"
	)
);
const LazyLyrics = lazy(() =>
	import(/* webpackChunkName: "Lyrics" */ "./components/pages/Lyrics.jsx")
);

const LazyRealtimeRoom = lazy(() =>
	import(
		/* webpackChunkName: "RealtimeRoom" */ "./components/sections/realtime/realtime.index.jsx"
	)
);

const LazyLogin = lazy(() =>
	import(/* webpackChunkName: "Login" */ "./components/pages/Login.jsx")
);

const PastTenseVerbForms = lazy(() =>
	import(
		/* webpackChunkName: "PastTenseVerbForms" */ "./components/pages/PastTenseVerbForms.jsx"
	)
);

const OrdinalsTable = lazy(() =>
	import(
		/* webpackChunkName: "OrdinalsTable" */ "./components/pages/OrdinalsTable.jsx"
	)
);

const Slides = lazy(() =>
	import(/* webpackChunkName: "Slides" */ "./components/slides/Slides.jsx")
);

const SleepLessonSlides = lazy(() =>
	import(
		/* webpackChunkName: "SleepLessonSlides",  */ "./components/slides/SleepLesson.slides.jsx"
	)
);

//const Writing = lazy(() =>
//	import(/* webpackChunkName: "Writing",  */ "./components/pages/Writing.jsx")
//);

const PresentSimpleVerbTable = lazy(() =>
	import(
		/* webpackChunkName: "PresentSimpleVerbTable",  */ "./components/pages/PresentSimpleVerbTable.jsx"
	)
);

const Vocabulary = lazy(() =>
	import(
		/* webpackChunkName: "VocabularyIndex",  */ "./components/pages/Vocabulary/VocabularyIndex.jsx"
	)
);

const LazyColorRecognizer = lazy(() =>
	import(
		/* webpackChunkName: "ColorRecognizer",  */ "./components/partials/ColorRecognizer.jsx"
	)
);

const baseRoute = "app/";
const slidesRoute = "present-simple/";
//meaningless comment

const App = (props) => {
	return (
		<ThemeProvider theme={theme}>
			<AppContextProvider>
				<DeviceContextProvider>
					<Router>
						<Route
							render={(route) => (
								<EntireView>
									<ErrorBoundary>
										<Suspense
											key="main-suspense"
											fallback={<WeissSpinner />}
										>
											<Switch location={route.location}>
												<Route
													path={`${route.match.path}${baseRoute}`}
												>
													<View
														responsive={true}
														animateChildren={true}
														key="innerView"
													>
														<Suspense
															key="app-suspense"
															fallback={
																<WeissSpinner />
															}
														>
															<Switch
																location={
																	route.location
																}
															>
																<Route
																	path={`${route.match.path}${baseRoute}advice`}
																>
																	<SageAdvice />
																</Route>

																<Route
																	path={`${route.match.path}${baseRoute}login`}
																	render={(
																		route
																	) => (
																		<LazyLogin
																			route={
																				route
																			}
																		/>
																	)}
																/>

																<Route
																	path={`${route.match.path}${baseRoute}speech-recognizer`}
																	render={(
																		route
																	) => (
																		<LazySpeechRecognitionTester
																			route={
																				route
																			}
																		/>
																	)}
																/>
																<Route
																	path={`${route.match.path}${baseRoute}speech-recorder`}
																	render={(
																		route
																	) => (
																		<LazySpeechRecorder
																			route={
																				route
																			}
																		/>
																	)}
																/>
																<Route
																	path={`${route.match.path}${baseRoute}song-lyrics`}
																	render={(
																		route
																	) => (
																		<LazyLyrics
																			route={
																				route
																			}
																		/>
																	)}
																/>

																<Route
																	path={`${route.match.path}${baseRoute}animals`}
																>
																	<LazyAnimals
																		route={
																			route
																		}
																	/>
																</Route>

																<Route
																	path={`${route.match.path}${baseRoute}loading`}
																>
																	<WeissSpinner
																		route={
																			route
																		}
																	/>
																</Route>

																<Route
																	path={`${route.match.path}${baseRoute}sentence-types`}
																>
																	<LazySentenceTypes
																		route={
																			route
																		}
																	/>
																</Route>

																<Route
																	path={`${route.match.path}${baseRoute}past-tense-verb-forms`}
																>
																	<PastTenseVerbForms />
																</Route>

																<Route
																	path={`${route.match.path}${baseRoute}present-simple-verb-forms`}
																>
																	<PresentSimpleVerbTable />
																</Route>

																<Route
																	path={`${route.match.path}${baseRoute}ordinals-table`}
																>
																	<OrdinalsTable />
																</Route>

																<Route
																	path={`${route.match.path}${baseRoute}vocabulary`}
																>
																	<Vocabulary></Vocabulary>
																</Route>

																<Route
																	path={`${route.match.path}${baseRoute}color-recognizer`}
																>
																	<LazyColorRecognizer></LazyColorRecognizer>
																</Route>

																<Route
																	path={`${route.match.path}${baseRoute}error`}
																>
																	<ErrorBoundary
																		debug={
																			true
																		}
																		route={
																			route
																		}
																	/>
																</Route>

																<Route>
																	<LogoScreen
																		route={
																			route
																		}
																	/>
																</Route>
															</Switch>
														</Suspense>
													</View>
												</Route>

												<Route
													exact
													path={`${route.match.path}${slidesRoute}`}
												>
													<Slides route={route} />
												</Route>

												<Route
													exact
													path={`${route.match.path}${slidesRoute}sleep`}
												>
													<SleepLessonSlides
														route={route}
													/>
												</Route>

												<Route
													path={`${route.match.path}realtime`}
												>
													<LazyRealtimeRoom
														route={route}
													/>
												</Route>

												<Redirect
													to={`${route.match.path}${baseRoute}`}
												/>
											</Switch>
										</Suspense>
									</ErrorBoundary>
								</EntireView>
							)}
						/>
					</Router>
				</DeviceContextProvider>
			</AppContextProvider>
		</ThemeProvider>
	);
};

export default App;
