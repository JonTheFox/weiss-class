const { BottomThirdCaption } = require("../../slideTemplates.js");

const imageSet = require("./presentSimpleImages.js").alarm_clock;

const imageSize = "regular";

const UseCaseExample4 = {
	id: 6,
	bgImage: imageSet[imageSize],
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
