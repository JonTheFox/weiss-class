const { BottomThirdCaption } = require("../../slideTemplates.js");
const { raining } = require("./presentProgressiveVideos.js");

const imageSize = "regular";

const UseCaseExample2 = {
	id: 5,
	bgImage: raining[imageSize],
	pages: [
		{
			templateName: BottomThirdCaption,
			heading: "Present Simple",
			subheading: "Facts",
			p: [
				"Breakfast is the most important meal of the day. I eat breakfast every morning.",
			],
		},
	],
};

module.exports = UseCaseExample2;
