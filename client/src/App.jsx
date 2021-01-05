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

//The Apollo client is what is interacting with our GraphQL server on the backend. It's what is making requests for data and storing it locally when the data comes back. It doesn't know/care that we working with React.

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"; //the glue layer between the ApolloClient and the React app. It's a React component, similar to the Redux provider

import { AppContextProvider } from "./contexts/AppContext.jsx";
import { DeviceContextProvider } from "./contexts/DeviceContext.jsx";
import theme from "./constants/theme.js";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),

	//by default, ApolloClient makes the assumption that our graphQL server is running on /graphql route
	//for the vast majority of use cases, there is no need to pass in any specific configurations
	dataIdFromObject: (obj) => obj.id, //every piece of data will run through this function. Whatever is returned from the function will be used to identify the piece of data inside of the Apollo client/store
	//The ramification of this line here, is that we have to ask for an id property to be returned from every single query we do
});

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
		<ApolloProvider client={client}>
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
														location={
															route.location
														}
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
																	route={
																		route
																	}
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
		</ApolloProvider>
	);
};

export default App;
