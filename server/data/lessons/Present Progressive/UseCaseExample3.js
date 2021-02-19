const { BottomThirdCaption } = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").raining;

const imageSize = "regular";

const UseCaseExample4 = {
	id: 6,
	bgImage: videoSet[imageSize],
	pages: [
		{
			templateName: BottomThirdCaption,
			heading: "Present Simple",
			subheading: "Routine",
			p: ["I wake up every day at 7 o'clock."],
		},
	],
};

module.exports = UseCaseExample4;
