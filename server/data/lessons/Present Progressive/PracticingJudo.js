const { VideoCentered } = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").practicingJudo;

const PracticingJudo = {
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoCentered,
			heading: "Present Progressive",
			//subheading: "Living the moment",
			//title: "I am driving.",
			videoSet,
			paragraphs: [{ text: "They are practicing judo. " }],
			//bgClass: ""
		},
	],
};

module.exports = PracticingJudo;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
