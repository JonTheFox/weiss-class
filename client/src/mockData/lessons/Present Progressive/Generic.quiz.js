const { Quiz } = require("../../slideTemplates.js");

// const videoSet = require("./presentProgressiveVideos.js").skiing;

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
			//items: [],
			//paragraphs: [{ text: "They are skiing. " }],
		},
	],
};

module.exports = GenericQuiz;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
