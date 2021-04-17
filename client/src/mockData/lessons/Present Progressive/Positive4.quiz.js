const { Quiz } = require("../../slideTemplates.js");
const {
	guyListeningToMusic,
	manThinking,
	practicingJudo,
} = require("./presentProgressiveVideos.js");
const mapVideoObjectToQuizItem = require("../../../components/Quiz/mapVideoObjectToQuizItem.js");
const videoObjects = [guyListeningToMusic, manThinking, practicingJudo];

const items = videoObjects.map(mapVideoObjectToQuizItem);

const Positive4Quiz = {
	//bgImage
	bg: "fun-gumi",
	pages: [
		{
			templateName: Quiz,
			heading: "Present Progressive",
			subheading: "Quiz",
			bgClass: "fun-gumi",
			items,
		},
	],
};

module.exports = Positive4Quiz;
