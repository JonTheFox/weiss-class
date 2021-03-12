const { List } = require("../../slideTemplates.js");

const Intro = {
	id: 1,
	bgImage:
		"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwzMTI2M3wwfDF8c2VhcmNofDF8fHN0dWR5fGVufDB8MHx8&ixlib=rb-1.2.1&q=80&w=1080",
	pages: [
		{
			templateName: List,
			heading: "Present Simple",
			subheading: "Facts",
		},
	],
};

module.exports = Intro;
