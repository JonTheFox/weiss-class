const { Quiz } = require("../../slideTemplates.js");
const {
	drivingInNiceScenery,
	workingOnComputer,
} = require("./presentProgressiveVideos.js");
const mapVideoObjectToQuizItem = require("../../../../client/src/components/Quiz/mapVideoObjectToQuizItem.js");
const videoObjects = [drivingInNiceScenery, workingOnComputer];

const items = videoObjects.map(mapVideoObjectToQuizItem);

// const videoSet = require("./presentProgressiveVideos.js").skiing;

const DrivingQuiz = {
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

module.exports = DrivingQuiz;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
