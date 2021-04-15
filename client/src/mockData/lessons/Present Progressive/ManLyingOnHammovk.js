const {
	VideoCentered,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").manLyingOnHammock;

const manLyingOnHammock = {
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoCentered,
			//bgClass: "field-day",
			heading: "Present Progressive",
			//subheading: "Quiz",
			videoSet,
			paragraphs: [{ text: "He is resting. ", className: "caption" }],
		},
	],
};

module.exports = manLyingOnHammock;
