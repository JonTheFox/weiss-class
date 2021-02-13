const express = require("express");
const { logger, is, request, getRandomUpTo } = global;

const label = "imagesAPI";

const { logg, loggError } = logger.createSubLogger({
	label,
	style: "darkBlue",
});

// const { authenticatedUsers, USER_SERVER_URL } = global;
const router = express.Router();

router.post("/uploadOne", async (req, res, next) => {
	try {
		logg("uploadOne: req.payload: ", req.payload);
		return res.send({ success: true });
	} catch (err) {
		loggError(err);
		return res.send({ error: err.message });
	}
});

module.exports = router;
