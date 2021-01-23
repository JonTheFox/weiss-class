const TEMPLATES = require("../slideTemplates.js");

const PRESENT_SIMPLE_SLIDES = [
	{
		id: 1,
		pages: [
			{
				templateName: TEMPLATES.CenteredHeadings,
				heading: "Present Simple",
				subheading: "Life, in general.",
				marquee: "",
				subMarquee: "",
				p: [
					"When we talk about general truths, we use Present Simple.",
					"For example: ",
					"You study very well.",
					"I go to school every day.",
					"We wash our car once a week.",
					"When the subject is he/she/it, we add s/es/ies to the end of the verb.",
					"For example: ",
					"She studies very well.",
					"He goes to school every day.",
					"It helps us.",
				],
				bgImage:
					"https://images.unsplash.com/photo-1508060698845-34709bc12e1c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
			},
		],
	},
	{
		id: 2,
		pages: [
			{
				templateName: TEMPLATES.Text1,
				//heading: "Present Simple",
				//subheading: "He / She / It",
				marquee: "Present Simple",
				subMarquee: "Examples",
				p: ["You study very well.", "I go to school every day."],
				bgImage:
					"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
			},
		],
	},
	{
		id: 3,
		pages: [
			{
				templateName: TEMPLATES.BottomThirdCaption,
				heading: "Present Simple",
				subheading: "Examples.",
				p: ["You study very well."],
				bgImage:
					"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
			},
		],
	},
];

const classrooms = [
	{
		slides: PRESENT_SIMPLE_SLIDES,
		currentSlideIndex: 0,
		teachers: [
			{
				first_name: "Robert",
				last_name: "Drake",
				email: "iceman@marvel.com",
				clientId: 777,
				img: {
					url:
						"https://images.unsplash.com/photo-1474710820418-dd5406ee35d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwzMTI2M3wwfDF8c2VhcmNofDF8fGljZSUyMG1hbnxlbnwwfDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
				},
			},
		],
	},
	{
		teachers: [
			{
				first_name: "Peter",
				last_name: "Parker",
				email: "spiderman@marvel.com",
				clientId: 360,
				img: {
					url:
						"https://images.unsplash.com/photo-1521714161819-15534968fc5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwzMTI2M3wwfDF8c2VhcmNofDF8fHNwaWRlcm1hbnxlbnwwfDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
				},
			},
		],
	},
	{
		id: "1",
		roomKey: 1,
		name: "The Cloudy Horizon",
		title: "The Cloudy Horizon",

		teachers: [
			{
				first_name: "Sam",
				last_name: "Willbrew",
				email: "angiemarvel.com",
				clientId: 1,
			},
		],
		img: {
			url:
				"https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwzMTI2M3wwfDF8c2VhcmNofDE0fHxtYW58ZW58MHwwfHw&ixlib=rb-1.2.1&q=80&w=400",
		},
		gif: {
			url: "",
		},
		video: {
			url: "",
		},
	},
	{
		id: "2",
		roomKey: 2,
		name: "Misty Mountain",
		title: "Misty Mountain",

		teachers: [
			{
				first_name: "Anna",
				img: {
					url:
						"https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwzMTI2M3wwfDF8c2VhcmNofDE5fHx3b21hbnxlbnwwfDB8fA&ixlib=rb-1.2.1&q=80&w=400",
				},
				last_name: "Slice",
				email: "anna@marvel.com",
				clientId: 1,
			},
		],

		gif: {
			url: "",
		},
		video: {
			url: "",
		},
	},
];

module.exports = classrooms;
