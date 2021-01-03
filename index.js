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

// const animalsApi = require("./api/animals.api.js");
// const lyricsApi = require("./api/lyrics.api.js");
// const usersApi = require("./api/users.api.js");
// const imagesApi = require("./api/images.api.js");
// const ninjaCodeApi = require("./api/ninjaCode.api.js");

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

const BUILD_FOLDER = path.join(__dirname, "client", "build");

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
const clients = {};
const INDEX_PAGE = path.join(BUILD_FOLDER, HOMEPAGE_FILENAME);
app.get("/", sendHomepage);

app.get("/app/*", (req, res, next) => {
	//maybe switch to "^/$"

	const subroutes = req.params[0]; //first
	const clientIp = req.ip;
	const sanitizedIp = sanitizeVarName(clientIp);
	logg("sanitizedIp: ", sanitizedIp);
	clients[sanitizedIp] = subroutes;
	return sendHomepage(req, res, next);
});

app.get("/redirect/*", (req, res, next) => {
	const currentSubroutes = req.params[0];
	// logg("currentSubroutes: ", currentSubroutes);
	// logg(`/redirect/${currentSubroutes}`);
	const clientIp = req.ip;
	// logg("ip in redirect: ", clientIp);

	const answer = clients[clientIp] || null;
	logg("clients: ", clients);
	// logg("redirecting to : ", debugAnswer);
	return res.send({
		subroutes: answer,
	});
});

//allow access to the `build` folder (from which we'll serve "static" files, such as transpiled and minified JS, CSS and index.HTML, as well as manifest.json, app icons, fonts..)
app.use("/", express.static(BUILD_FOLDER));
app.use("/static", express.static(BUILD_FOLDER));

// API
// ======
// routes have been moved to the administrator web site: Weiss-English-Admin
// app.use("/api/animals", animalsApi);
// app.use("/api/lyrics", lyricsApi);
// app.use("/api/users", usersApi);
// app.use("/api/images", imagesApi);
// app.use("/api/ninjaCode", ninjaCodeApi);

//mount a socket.io server (for real-time communication between the server and its clients) on top of the standard Express app
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const supplementSocket = require("./socket/index.js");
supplementSocket(io);

http.listen(PORT, () => {
	logg(`Express server is listening on port ${PORT}. `);
});
