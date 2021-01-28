const PRESENT_SIMPLE_SLIDES = require("../lessons/PresentSimple/PresentSimple.index.js");

const IMAGE_URL =
	"https://i.pinimg.com/originals/1a/60/70/1a6070e136db70744a4103d2c71882c0.png";

const classroom = {
	id: 2,
	//image: { url: IMAGE_URL },
	subject: "Present Progressive",
	title: "Living the moment",
	//subtitle: "Our Everday",
	slides: PRESENT_SIMPLE_SLIDES,
	//currentSlideIndex: 0,
	teachers: [
		{
			first_name: "Peter",
			last_name: "Parker",
			email: "spiderman@marvel.com",
			clientId: 111,
			img: {
				url: IMAGE_URL,
			},
		},
	],
};

module.exports = classroom;
