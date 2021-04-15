const { Quiz } = require("../../slideTemplates.js");

// const videoSet = require("./presentProgressiveVideos.js").skiing;

const DrivingQuiz = {
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: Quiz,
			heading: "Present Progressive",
			subheading: "Quiz",
			//title: "I am driving.",
			//videoSet,
			bgClass: "gradient",
			//items: [],
			//paragraphs: [{ text: "They are skiing. " }],
		},
	],
};

module.exports = DrivingQuiz;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
