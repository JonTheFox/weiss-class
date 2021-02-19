const { BottomThirdCaption } = require("../../slideTemplates.js");

const imageSet = require("./presentSimpleImages.js").preparing_lunch;

const imageSize = "regular";

const UseCaseExample3 = {
	id: 6,
	bgImage: imageSet[imageSize],
	pages: [
		{
			templateName: BottomThirdCaption,
			heading: "Present Simple",
			subheading: "Hobbies",
			p: ["Tom and Sharon like to cook together."],
		},
	],
};

module.exports = UseCaseExample3;
