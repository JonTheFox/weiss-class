const {
	VideoCentered,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").girlStudying;

const girlStudying = {
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
				{
					text: "She is studying for her test. ",
					className: "caption",
				},
			],
		},
	],
};

module.exports = girlStudying;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
