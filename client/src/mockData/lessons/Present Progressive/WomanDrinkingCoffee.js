const {
	VideoCentered,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js")
	.womanDrinkingCoffeeAndReading;

const womanDrinkingCoffeeAndReading = {
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoCentered,
			//bgClass: "field-day",
			heading: "Present Progressive",
			subheading: "Quiz",
			//title: "I am driving.",
			videoSet,
			paragraphs: [
				{ text: "She is eating pizza. ", className: "caption" },
			],
		},
	],
};

module.exports = womanDrinkingCoffeeAndReading;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
