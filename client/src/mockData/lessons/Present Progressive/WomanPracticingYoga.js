const { VideoCentered } = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").womanPracticingYoga;

const WomanPracticingYoga = {
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoCentered,
			//bgClass: "field-day",
			heading: "Present Progressive",
			//subheading: "Living the moment",
			//title: "I am driving.",
			videoSet,
			paragraphs: [
				{ text: "She is practicing yoga. ", className: "caption" },
			],
		},
	],
};

module.exports = WomanPracticingYoga;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
