const classrooms = [
	{
		teachers: [
			{
				first_name: "Robert",
				last_name: "Drake",
				email: "iceman@marvel.com",
				clientId: 777,
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
			},
		],
	},
	{
		id: "1",
		roomKey: 1,
		name: "The Cloudy Horizon",
		title: "The Cloudy Horizon",

		teachers: [{ first_name: "Jake" }],
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

const MOCK_DATA = { classrooms };
export default MOCK_DATA;
