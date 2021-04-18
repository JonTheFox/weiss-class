const { Quiz } = require("../../slideTemplates.js");
const {
	guyListeningToMusic,
	manThinking,
	practicingJudo,
	womanPracticingYoga,
} = require("./presentProgressiveVideos.js");

const mapVideoObjectToQuizItem = require("../../../components/Quiz/mapVideoObjectToQuizItem.js");
const videoObjects = [
	guyListeningToMusic,
	manThinking,
	practicingJudo,
	womanPracticingYoga,
];

const items = videoObjects.map(mapVideoObjectToQuizItem);

const Positive4Quiz = {
	//bgImage
	bg: "bg--primary-and-secondary",
	pages: [
		{
			templateName: Quiz,
			heading: "Present Progressive",
			subheading: "Quiz",

			bgClass: "bg--primary-and-secondary",
			items,
		},
	],
};

module.exports = Positive4Quiz;
