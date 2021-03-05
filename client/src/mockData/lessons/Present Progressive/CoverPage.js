const {
	//VideoWithContent,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

const videoSet = require("./presentProgressiveVideos.js").tropicalBeach2;

const CoverPage = {
	//bgImage
	pages: [
		{
			templateName: CenteredHeadings,
			//bgClass: "cloud-up",
			heading: "Present Progressive",
			subheading: "Living the moment",
			//title: "I am driving.",
			videoSet,
			// paragraphs: [
			// 	{ text: "I'm living the dream! ", className: "caption" },
			// ],
		},

		{
			templateName: ListMain,
			//bgClass: "cloud-up",
			p: [
				"When we are talking about what's happening at the moment, we are using 'Present Progressive'. ",
				"Here arhttps://i.pinimg.com/originals/1a/60/70/1a6070e136db70744a4103d2c71882c0.pnge a few examples: ",
			],
			bgClass: "cloud-up",
			opacity: 9,
			bullets: [
				"The sun is shining. ☀️",
				"The wind is blowing. 🌬️ ",
				"I am having a good time. 😎",
			],
		},
	],
};

module.exports = CoverPage;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
