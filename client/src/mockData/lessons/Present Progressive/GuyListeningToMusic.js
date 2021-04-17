const { VideoCentered } = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").guyListeningToMusic;

const GuyListeningToMusic = {
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
				{ text: "He is listening to music. ", className: "caption" },
			],
		},
	],
};

module.exports = GuyListeningToMusic;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
