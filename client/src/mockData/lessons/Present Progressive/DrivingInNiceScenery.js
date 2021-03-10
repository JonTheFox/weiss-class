const {
	VideoCentered,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").drivingInNiceScenery;

const drivingInNiceScenery = {
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
			paragraphs: [{ text: "I am driving. ", className: "caption" }],
		},
	],
};

module.exports = drivingInNiceScenery;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
