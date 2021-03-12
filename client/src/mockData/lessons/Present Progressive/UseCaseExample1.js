const { VideoCentered } = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").raining;

const imageSize = "regular";

const UseCaseExample = {
	id: 201,
	bgImage: "none",
	pages: [
		{
			templateName: VideoCentered,
			heading: "Present Progressive",
			//subheading: "Living the moment",
			videoSet,
			p: [
				"When we are talking about what's  happening at the moment, we are using 'Present Progressive.",
			],
		},
	],
};

module.exports = UseCaseExample;
