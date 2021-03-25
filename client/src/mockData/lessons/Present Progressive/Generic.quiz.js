const { Quiz } = require("../../slideTemplates.js");
const { cookingSoy } = require("./presentProgressiveVideos.js");
const videoObjects = [cookingSoy];
const mapVideoObjectToQuizItem = require("../../../components/Quiz/mapVideoObjectToQuizItem.js");

const items = videoObjects.map(mapVideoObjectToQuizItem);

const GenericQuiz = {
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: Quiz,
			heading: "Present Progressive",
			//subheading: "Living the moment",
			//title: "I am driving.",
			//videoSet,
			bgClass: "gradient",
			items,
			//paragraphs: [{ text: "They are skiing. " }],
		},
	],
};

module.exports = GenericQuiz;
