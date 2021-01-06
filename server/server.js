const express = require("express");
const env = require("dotenv");
const envVars = env.config().parsed;
if (!envVars) console.error("No environment variables were found!!");
const helmet = require("helmet");
const path = require("path");
//const logger = require("morgan");
// const cors = require("cors");
const ServerLogger = require("./lib/logg-server.js");
const {
	is,
	our,
	request,
	asyncForEach,
	sanitizeVarName,
	getRandomUpTo,
	getUniqueString,
} = require("./lib/issy.js");

global.is = is;
global.our = our;
global.request = request;
global.asyncForEach = asyncForEach;
global.sanitizeVarName = sanitizeVarName;
global.getRandomUpTo = getRandomUpTo;
global.getUniqueString = getUniqueString;

const fetch = require("node-fetch");
global.fetch = fetch;

const mainLogger = new ServerLogger({
	label: "Weiss",
	stylePreset: "sky",
	logInProduction: false,
});
const { logg, loggError } = mainLogger;
global.logger = mainLogger;
global.logg = logg;
global.loggError = loggError;

const PORT = process.env.PORT || 5000;
// global.HOST =
// 	process.env.NODE_ENV === "development"
// 		? `http://localhost:${PORT}`
// 		: process.env.HOMEPAGE_URL;
global.HOST = process.env.SERVER_URL;

const authenticate = require("./api/auth.js"); // dependends on logger
global.authenticate = authenticate;

logg("global.HOST: ", global.HOST);

const app = express();

app.use(helmet());
/*Helmet is a collection of 13 middleware functions that set some HTTP response headers for better security.
//It’s best to use Helmet early in your middleware stack so that its headers are sure to be set. */

// app.use(logger("dev"));

// app.use(cors());

// parse the body (i.e. the payload) of incoming HTTP/S (POST) requests
app.use(express.json());
// parse the URL parameters of incoming HTTP/S (GET) requests
app.use(express.urlencoded({ extended: false }));

const BUILD_FOLDER = path.join(__dirname, "../client", "build");

// serve Homepage
const HOMEPAGE_FILENAME = "index.html";

const sendHomepage = (req, res, next) => {
	//maybe switch to "^/$"
	logg("Sending Homepage!");
	res.sendFile(INDEX_PAGE, {}, (err) => {
		if (err) {
			loggError(err);
			return next(err);
		}
		logg(`File ${HOMEPAGE_FILENAME} was successfully sent to client. `);
	});
};

//graphql
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs/typeDefs.js").typeDefs;
const resolvers = require("./schema/resolvers/resolvers.js").resolvers;
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const INDEX_PAGE = path.join(BUILD_FOLDER, HOMEPAGE_FILENAME);
app.get("/", sendHomepage);

//allow access to the `build` folder (from which we'll serve "static" files, such as transpiled and minified JS, CSS and index.HTML, as well as manifest.json, app icons, fonts..)
app.use("/", express.static(BUILD_FOLDER));
app.use("/static", express.static(BUILD_FOLDER));

//mount a socket.io server (for real-time communication between the server and its clients) on top of the standard Express app
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const supplementSocket = require("./socket/index.js");
supplementSocket(io);

http.listen({ port: process.env.PORT || PORT }, () => {
	logg(
		`Express server is listening on port ${PORT}. GraphQL endpoint: ${server.graphqlPath}`
	);
});

module.exports = http;
