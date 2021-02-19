const PRESENT_SIMPLE_SLIDES = require("../lessons/PresentSimple/PresentSimple.index.js");

const IMAGE_URL =
	"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6ef2ac77-f635-4fb1-b1b4-2bb99461f0bf/d6wlypl-c478010e-0337-487b-9226-4143a526665c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmVmMmFjNzctZjYzNS00ZmIxLWIxYjQtMmJiOTk0NjFmMGJmXC9kNndseXBsLWM0NzgwMTBlLTAzMzctNDg3Yi05MjI2LTQxNDNhNTI2NjY1Yy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.FuXpR9U7MVT6Erp2E1xGR9YJK7mdYItYtCEmO3kah7s";

const classroom = {
	id: 3,
	image: { url: IMAGE_URL },
	subject: "Future Simple",
	title: "Your Future",
	subtitle: "The Fiery Lady",
	slides: PRESENT_SIMPLE_SLIDES,
	//currentSlideIndex: 0,
	teachers: [
		{
			first_name: "Angelica",
			last_name: "Jones",
			email: "firestar@marvel.com",
			clientId: 777,
			img: {
				url: "",
			},
			title: "Firestar",
			subtitle: "The Fiery Lady",
		},
	],
};

module.exports = classroom;
