const { VideoCentered } = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").raining;
// .coupleWalkingOnTheBeach;

const CoverPage = {
	id: 201,
	//bgImage: "none",
	background: "var(--white)",
	pages: [
		{
			templateName: VideoCentered,
			heading: "Present Progressive",
			subheading: "Living the moment",
			videoSet,
			p: [
				"When we are talking about what's happening at the moment, we are using 'Present Progressive.",
			],
		},
	],
};

module.exports = CoverPage;
