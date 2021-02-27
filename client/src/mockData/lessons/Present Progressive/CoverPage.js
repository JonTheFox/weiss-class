const {
	VideoWithContent,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").tropicalBeach2;

const CoverPage = {
	id: 201,
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoWithContent,
			bgClass: "sunny",
			heading: "Present Progressive",
			subheading: "Living the moment",
			//title: "I am driving.",
			videoSet,
			bgClass: "sunny",
			// paragraphs: [
			// 	{ text: "I'm living the dream! ", className: "caption" },
			// ],
		},

		{
			templateName: ListMain,
			bgClass: "sunny",
			p: [
				"When we are talking about what's happening at the moment, we are using 'Present Progressive. ",
			],
			//bullets: ["Fact", "Routine", "Hobby"],

			bullets: [
				"The sun is shining. ",
				"The wind is blowing. ",
				"I am having a good time 😎",
			],
		},
	],
};

module.exports = CoverPage;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
