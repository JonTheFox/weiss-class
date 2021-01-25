const PRESENT_SIMPLE_SLIDES = require("../lessons/PresentSimple/PresentSimple.index.js");

const classroom = {
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
};

module.exports = classroom;
