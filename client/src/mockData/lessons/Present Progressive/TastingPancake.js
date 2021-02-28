const {
	VideoWithContent,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").tastingPancake;

const tastingPancake = {
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoWithContent,
			bgClass: "field-day",
			heading: "Present Progressive",
			//subheading: "Living the moment",
			//title: "I am driving.",
			videoSet,
			paragraphs: [
				{ text: "He is tasting his pancake. ", className: "caption" },
			],
		},
	],
};

module.exports = tastingPancake;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
