const { Quiz } = require("../../slideTemplates.js");

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
			bgClass: "cloud-up",
			//items: [],
			//paragraphs: [{ text: "They are skiing. " }],
		},
	],
};

module.exports = DrivingQuiz;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
