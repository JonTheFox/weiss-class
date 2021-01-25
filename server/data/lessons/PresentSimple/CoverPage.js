const { CenteredHeadings, Text1 } = require("../../slideTemplates.js");

const CoverPage = {
	id: 1,
	bgImage:
		"https://images.unsplash.com/photo-1508060698845-34709bc12e1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
	pages: [
		{
			templateName: CenteredHeadings,
			heading: "Present Simple",
			subheading: "Life, in general.",
		},
		{
			templateName: Text1,
			p: [
				"When we talk about general truths, we use Present Simple.",
				"For example: ",
				"You study very well.",
				"I go to school every day.",
				"We wash our car once a week.",
			],
		},
	],
};

module.exports = CoverPage;
