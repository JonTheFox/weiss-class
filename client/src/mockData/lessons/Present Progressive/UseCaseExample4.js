const { BottomThirdCaption } = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").raining;

const imageSize = "regular";

const UseCaseExample4 = {
	id: 204,
	bgImage: videoSet[imageSize],
	pages: [
		{
			templateName: BottomThirdCaption,
			//heading: "It's raining.",
			//subheading: "Routine",
			caption: ["It's raining."],
		},
	],
};

module.exports = UseCaseExample4;
