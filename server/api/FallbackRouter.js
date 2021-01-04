const Router = require("express").Router;

const { loggError } = global;

const errorObj = { code: 500, error: "internal server error" };

class FallbackRouter {
	logMsg;
	constructor(config = {}) {
		const { label = "anonymous API", msg = "" } = config;
		const msgPreface = label + " : ";
		const initMsg = msgPreface + (msg || "error");
		loggError(`${initMsg}. Using fallback router instead.`);
		// const router = Router();
		this.logMsg =
			msgPreface +
			" Cannot respond properly (this response was delivered by a fallback router)";
		const router = new Router();
		router.all("*", async (req, res) => {
			loggError(this.logMsg);
			return res.send(errorObj);
		});
		return router;
	}
}

module.exports = FallbackRouter;
