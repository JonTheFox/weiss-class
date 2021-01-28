const PRESENT_SIMPLE_SLIDES = require("../lessons/PresentSimple/PresentSimple.index.js");

const IMAGE_URL =
	"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwzMTI2M3wwfDF8c2VhcmNofDF8fHdvbWFufGVufDB8MHx8&ixlib=rb-1.2.1&q=80&w=1080";

const classroom = {
	id: 2,
	// image:
	subject: "Present Simple",
	title: "Easy Peasy",
	//subtitle: "The Fiery Lady",
	slides: PRESENT_SIMPLE_SLIDES,
	//currentSlideIndex: 0,
	teachers: [
		{
			first_name: "Sherry",
			last_name: "Capsi",
			email: "sherry@somewhere.com",
			clientId: 778,
			img: { url: IMAGE_URL },
			title: "Firestar",
			subtitle: "The Fiery Lady",
		},
	],
};

module.exports = classroom;
