const { VideoCentered } = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").raining;

const CoverPage = {
	id: 201,
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoCentered,
			heading: "Present Progressive",
			subheading: "Living the moment",
			title: "I am driving.",
			videoSet,
			p: [
				"When we are talking about what's  happening at the moment, we are using 'Present Progressive.",
			],
		},
	],
};

module.exports = CoverPage;
