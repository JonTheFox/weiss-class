const { Quiz } = require("../../slideTemplates.js");
const {
	playingSoccer,
	playingBasketball,
	girlPlayingWithCat,
} = require("./presentProgressiveVideos.js");
const mapVideoObjectToQuizItem = require("../../../components/Quiz/mapVideoObjectToQuizItem.js");
const videoObjects = [playingSoccer, playingBasketball, girlPlayingWithCat];
// const videoObjects = [playingSoccer, playingBasketball];

const items = videoObjects.map(mapVideoObjectToQuizItem);

const Positive4Quiz = {
	//bgImage
	bg: "field-day",
	pages: [
		{
			templateName: Quiz,
			heading: "Present Progressive",
			subheading: "Quiz",
			bgClass: "field-day",
			items,
		},
	],
};

module.exports = Positive4Quiz;
