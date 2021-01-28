const PRESENT_SIMPLE_SLIDES = require("../lessons/PresentSimple/PresentSimple.index.js");

const IMAGE_URL =
	"https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwzMTI2M3wwfDF8c2VhcmNofDE5fHx3b21hbnxlbnwwfDB8fA&ixlib=rb-1.2.1&q=80&w=400";

const classroom = {
	id: 2,
	//image: { url: IMAGE_URL },
	subject: "Present Simple",
	title: "Our Everday",
	subtitle: "Our Everday",
	slides: PRESENT_SIMPLE_SLIDES,
	//currentSlideIndex: 0,
	teachers: [
		{
			first_name: "Angelina",
			last_name: "Bloom",
			email: "angelina@bloom.com",
			clientId: 111,
			img: {
				url: IMAGE_URL,
			},
			title: "Firestar",
			subtitle: "The Fiery Lady",
		},
	],
};

module.exports = classroom;
