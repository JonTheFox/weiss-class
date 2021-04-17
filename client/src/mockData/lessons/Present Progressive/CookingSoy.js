const {
	VideoCentered,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").cookingSoy;

const cookingSoy = {
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
			paragraphs: [{ text: "He is cooking. ", className: "caption" }],
		},
	],
};

module.exports = cookingSoy;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
