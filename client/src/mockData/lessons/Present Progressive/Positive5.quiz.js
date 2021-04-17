const { Quiz } = require("../../slideTemplates.js");
const {
	womanEatingPizza,
	cookingSoy,
	womanDrinkingCoffeeAndReading,
} = require("./presentProgressiveVideos.js");
const mapVideoObjectToQuizItem = require("../../../components/Quiz/mapVideoObjectToQuizItem.js");
const videoObjects = [
	womanEatingPizza,
	cookingSoy,
	womanDrinkingCoffeeAndReading,
];

const items = videoObjects.map(mapVideoObjectToQuizItem);

const Positive4Quiz = {
	//bgImage
	bg: "field-day",
	pages: [
		{
			templateName: Quiz,
			heading: "Present Progressive",
			subheading: "Quiz",
			bgClass: "cloud-up",
			items,
		},
	],
};

module.exports = Positive4Quiz;