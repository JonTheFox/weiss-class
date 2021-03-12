const { CenteredHeadings, ListMain } = require("../../slideTemplates.js");

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
			templateName: ListMain,
			p: [
				"When we talk about general truths we use Present Simple. ",
				"Specifically, we use Present Simple when we talk about a... ",
			],
			bottomParagraphs: ["Let's see some examples. Swipe right -->  "],

			bullets: ["Fact", "Routine", "Hobby"],
			bgImage:
				//"https://images.unsplash.com/photo-1519331379826-f10be5486c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwzMTI2M3wwfDF8c2VhcmNofDF8fHBhcmt8ZW58MHwwfHw&ixlib=rb-1.2.1&q=80&w=1080",
				"https://images.unsplash.com/photo-1588712132993-92b2f7ab6fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwzMTI2M3wwfDF8c2VhcmNofDExfHxwYXJrfGVufDB8MHx8&ixlib=rb-1.2.1&q=80&w=1080",
			bgClass: "glass",
			opacity: 9,
		},
	],
};

module.exports = CoverPage;
