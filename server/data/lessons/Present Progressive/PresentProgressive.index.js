const CoverPage = require("./CoverPage.js");
const UseCaseExample1 = require("./UseCaseExample1.js");
const CatsResting = require("./CatsResting.page.js");
const DogPlaying = require("./DogPlaying.page.js");
const BikeRidingFirstPerson = require("./BikeRidingFirstPerson.page.js");
const Raining = require("./Raining.page.js");
const Skiing = require("./Skiing.page.js");
const FlyingAboveMountain = require("./FlyingAboveMountain.page.js");

const PresentProgressiveSlides = [
	CoverPage,
	Raining,
	BikeRidingFirstPerson,
	Skiing,
	FlyingAboveMountain,
	CatsResting,
	DogPlaying,
];

module.exports = PresentProgressiveSlides;
