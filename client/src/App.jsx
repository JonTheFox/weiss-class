import React, { Suspense, lazy, useEffect } from "react";
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import View from "./components/layout/View.jsx";
import EntireView from "./components/layout/EntireView.jsx";
import ErrorBoundary from "./pages/ErrorPage/ErrorPage.jsx";
import RealtimeManager from "./components/RealtimeManager/RealtimeManager.jsx";
import "./index.scss";

//The Apollo client is what is interacting with our GraphQL server on the backend. It's what is making requests for data and storing it locally when the data comes back. It doesn't know/care that we working with React.
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"; //the glue layer between the ApolloClient and the React app. It's a React component, similar to the Redux provider

import { AppContextProvider } from "./contexts/AppContext.jsx";
import { DeviceContextProvider } from "./contexts/DeviceContext.jsx";
import theme from "./constants/theme.js";

import AppRoutes from "./AppRoutes.js";

import {
	RecoilRoot,
	// atom,
	// selector,
	// useRecoilState,
	// useRecoilValue,
	//useSetRecoilState,
} from "recoil";
// import { RecoilRoot } from "recoil/dist/recoil.production";

const client = new ApolloClient({
	// uri: "http://localhost:5000/graphql",
	// uri: DEBUGGING
	// 	? "http://localhost:5000/graphql" :
	uri: "https://weiss-class.herokuapp.com/graphql",

	cache: new InMemoryCache(),

	//by default, ApolloClient makes the assumption that our graphQL server is running on /graphql route
	//for the vast majority of use cases, there is no need to pass in any specific configurations
	dataIdFromObject: (obj) => obj.id, //every piece of data will run through this function. Whatever is returned from the function will be used to identify the piece of data inside of the Apollo client/store
	//The ramification of this line here, is that we have to ask for an id property to be returned from every single query we do
});

const App = (props) => {
	return (
		<ApolloProvider client={client}>
			<RecoilRoot>
				<ThemeProvider theme={theme}>
					<AppContextProvider>
						<DeviceContextProvider>
							<Router>
								<Route
									render={(route) => {
										return (
											<RealtimeManager>
												<EntireView animate="false">
													<ErrorBoundary>
														<AppRoutes
															route={route}
														/>
													</ErrorBoundary>
												</EntireView>
											</RealtimeManager>
										);
									}}
								></Route>
							</Router>
						</DeviceContextProvider>
					</AppContextProvider>
				</ThemeProvider>
			</RecoilRoot>
		</ApolloProvider>
	);
};

export default App;
