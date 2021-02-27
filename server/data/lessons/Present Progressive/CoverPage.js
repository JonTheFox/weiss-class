const { VideoCentered, ListMain } = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").tropicalBeach;

const CoverPage = {
	id: 201,
	//bgImage
	//bg: "var(--white)",
	pages: [
		{
			templateName: VideoCentered,
			heading: "Present Progressive",
			subheading: "Living the moment",
			//title: "I am driving.",
			videoSet,
			bgClass: "beach",
			// paragraphs: [
			// 	{ text: "I'm living the dream! ", className: "caption" },
			// ],
		},

		{
			templateName: ListMain,
			p: [
				"When we are talking about what's happening at the moment, we are using 'Present Progressive. For example: ",
			],

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
