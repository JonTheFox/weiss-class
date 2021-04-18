const { Quiz } = require("../../slideTemplates.js");
const {
	womanEatingPizza,
	cookingSoy,
	womanDrinkingCoffeeAndReading,
} = require("./presentProgressiveVideos.js");
const mapVideoObjectToQuizItem = require("../../../../client/src/components/Quiz/mapVideoObjectToQuizItem.js");
const videoObjects = [
	womanEatingPizza,
	cookingSoy,
	womanDrinkingCoffeeAndReading,
];

const items = videoObjects.map(mapVideoObjectToQuizItem);

const Positive4Quiz = {
	//bgImage
	bg: "fun-gumi",
	pages: [
		{
			templateName: Quiz,
			heading: "Present Progressive",
			subheading: "Quiz",
			bgClass: "fun-gumi",
			items,
		},
	],
};

module.exports = Positive4Quiz;
