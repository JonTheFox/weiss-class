const express = require("express");
const { logger, is, request, getRandomUpTo } = global;

const label = "ninjaCode";

const { logg, loggError } = logger.createSubLogger({
	label,
	style: "darkBlue",
});

const { authenticatedUsers, USER_SERVER_URL } = global;
const router = express.Router();

router.post("/", async (req, res, next) => {
	try {
		let ninjaCode = getRandomUpTo(100);
		ninjaCode = `#_${ninjaCode}_#`;
		res.send({ ninjaCode });
	} catch (err) {
		loggError(err);
		return res.send({ error: err.message });
	}
});

module.exports = router;
