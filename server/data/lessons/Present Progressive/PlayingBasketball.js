const {
	VideoCentered,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").PlayingBasketball;

const PlayingBasketball = {
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
				{ text: "He is playing basketball. ", className: "caption" },
			],
		},
	],
};

module.exports = PlayingBasketball;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/