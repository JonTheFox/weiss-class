const { Quiz } = require("../../slideTemplates.js");
const {
	manLyingOnHammock,
	girlStudying,
	dancingLadies,
} = require("./presentProgressiveVideos.js");
const mapVideoObjectToQuizItem = require("../../../../client/src/components/Quiz/mapVideoObjectToQuizItem.js");
const videoObjects = [manLyingOnHammock, girlStudying, dancingLadies];
const items = videoObjects.map(mapVideoObjectToQuizItem);

const Positive2Quiz = {
	//bgImage
	bg: "beach",
	pages: [
		{
			templateName: Quiz,
			heading: "Present Progressive",
			subheading: "Quiz",
			//videoSet,
			bgClass: "beach",
			items,
			//paragraphs: [{ text: "They are skiing. " }],
		},
	],
};

module.exports = Positive2Quiz;
