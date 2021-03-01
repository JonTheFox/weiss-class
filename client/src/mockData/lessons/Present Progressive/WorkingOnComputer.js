const {
	VideoCentered,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").workingOnComputer;

const WorkingOnComputer = {
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoCentered,
			//bgClass: "cloud-up",
			heading: "Present Progressive",
			//subheading: "Living the moment",
			//title: "I am driving.",
			videoSet,
			paragraphs: [{ text: "He is working.", className: "caption" }],
		},
	],
};

module.exports = WorkingOnComputer;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
