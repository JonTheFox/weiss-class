const {
	VideoWithContent,
	ListMain,
	CenteredHeadings,
} = require("../../slideTemplates.js");

debugger;

const videoSet = require("./presentProgressiveVideos.js").tropicalBeach;

const CoverPage = {
	id: 201,
	//bgImage
	bg: "var(--white)",
	pages: [
		{
			templateName: VideoWithContent,
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
			p: [
				"When we are talking about what's happening at the moment, we are using 'Present Progressive. ",
			],
			//bullets: ["Fact", "Routine", "Hobby"],
		},
	],
};

module.exports = CoverPage;

/*

"When we are talking about what's  happening at the moment, we are using 'Present Progressive."
*/
