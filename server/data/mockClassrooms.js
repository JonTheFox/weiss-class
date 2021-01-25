const TEMPLATES = require("../slideTemplates.js");

const classrooms = [
	{
		slides: TEMPLATES,
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
