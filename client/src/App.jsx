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

const SageAdvice = lazy(() =>
	import(
		/* webpackPrefetch: true, webpackChunkName: "SageAdvice" */ "./components/pages/SageAdvice.jsx"
	)
);

const LazyRealtimeRoom = lazy(() =>
	import(
		/* webpackChunkName: "RealtimeRoom" */ "./components/sections/realtime/realtime.index.jsx"
	)
);

const LazyLogin = lazy(() =>
	import(/* webpackChunkName: "Login" */ "./components/pages/Login.jsx")
);

const baseRoute = "/";
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
										<View
											responsive={true}
											animateChildren={true}
											key="innerView"
										>
											<Suspense
												key="main-suspense"
												fallback={<WeissSpinner />}
											>
												<Switch
													location={route.location}
												>
													<Route
														path={`${baseRoute}advice`}
													>
														<SageAdvice />
													</Route>

													<Route
														path={`${baseRoute}login`}
														render={(route) => (
															<LazyLogin
																route={route}
															/>
														)}
													/>

													<Route
														path={`${baseRoute}loading`}
													>
														<WeissSpinner
															route={route}
														/>
													</Route>
													<Route
														path={`${baseRoute}error`}
													>
														<ErrorBoundary
															debug={true}
															route={route}
														/>
													</Route>

													<Route
														path={`${baseRoute}classroom-select`}
													>
														<LazyRealtimeRoom
															route={route}
														/>
													</Route>

													<Route
														path={`${baseRoute}`}
													>
														<LogoScreen
															route={route}
														></LogoScreen>
													</Route>
													<Redirect
														to={`${baseRoute}`}
													></Redirect>
												</Switch>
											</Suspense>
										</View>
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
