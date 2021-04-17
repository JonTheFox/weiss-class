const {
	VideoCentered,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").ManThinking;

const ManThinking = {
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoCentered,
			//bgClass: "field-day",
			heading: "Present Progressive",
			//subheading: "Quiz",
			videoSet,
			paragraphs: [{ text: "He is thinking. ", className: "caption" }],
		},
	],
};

module.exports = ManThinking;
