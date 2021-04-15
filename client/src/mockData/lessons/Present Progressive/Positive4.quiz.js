const { Quiz } = require("../../slideTemplates.js");
const {
	tastingPancake,
	manThinking,
	practicingJudo,
} = require("./presentProgressiveVideos.js");
const mapVideoObjectToQuizItem = require("../../../components/Quiz/mapVideoObjectToQuizItem.js");
const videoObjects = [tastingPancake, manThinking, practicingJudo];

const items = videoObjects.map(mapVideoObjectToQuizItem);

const Positive4Quiz = {
	//bgImage
	bg: "field-day",
	pages: [
		{
			templateName: Quiz,
			heading: "Present Progressive",
			subheading: "Quiz",
			bgClass: "cloud-up",
			items,
		},
	],
};

module.exports = Positive4Quiz;
