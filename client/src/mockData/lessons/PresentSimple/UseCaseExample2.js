const { BottomThirdCaption } = require("../../slideTemplates.js");
const { eating_breakfast } = require("./presentSimpleImages.js");

const imageSize = "regular";

const UseCaseExample2 = {
	id: 5,
	bgImage: eating_breakfast[imageSize],
	pages: [
		{
			templateName: BottomThirdCaption,
			heading: "Present Simple",
			subheading: "Facts",
			p: [""],
			paragraphs: [
				{ text: "Breakfast is the most important meal of the day." },
				{ text: "I eat breakfast every morning." },
			],
		},
	],
};

module.exports = UseCaseExample2;
