import NounList from "./NounList.js";

const PASTRIES = ["roll", "bread", "pitta", "cookie", "baguette"];

class NounGroup  {
	constructor({ title, parentGroups, singular, plural, nonCount } = {}) {
	
		this.title = title || "";
		this.parentGroups = parentGroups || [];
		this.singular = singular || [];
		this.plural = plural || [];
		this.nonCount = nonCount || [];

		this.getAll = this.getAll.bind(this);
	}
	getAll() {
		const { singular, plural, nonCount } = this;
		const all = [singular, plural, nonCount].flat();
		debugger;
		return all;
	}
}

const VEGETABLES = new NounGroup({
	title: "vegetables",
	parentGroups: ["food"],
	singular: [
		"cucumber",
		"tomato",
		"zookini",
		"beet",
		"small radish",
		"carrot",
		"onion",
		"garlic",
		"potato",
		"sweet potato",
	],
	nonCount: ["lettuce", "cabbage", "kayle", "parsley"],
	plural: [],
});

const FRUIT = new NounGroup({
	title: "fruit",
	parentGroups: ["food"],
	singular: [
		"apple",
		"orange",
		"pear",
		"peach",
		"plum",
		"lemon",
		"melon",
		"watermelon",
		"grapefruit",
		"clementine",
		"mandarin",
		"tangerine",
		"pineapple",
		"grape",
		"palm",
		"strawberry",
		"blueberry",
		"cherry",
	],
	nonCount: [],
	plural: ["grapes"],
});

const FAST_FOOD = new NounGroup({
	title: "fast food",
	parentGroups: ["food"],
	singular: ["pizza", "hamburger", "boritto", "shawarrma", "hot dog"],
	plural: ["french fries", "meat balls"],
	nonCount: ["falafel"],
});



const ALL_FOODS = [VEGETABLES, FRUIT, FAST_FOOD].reduce(
	(accumulated, group, i) => {

		["singular", "plural", "nonCount"].forEach((subgroup, j)=>{
			if(!accumulated[subgroup]) {
				accumulated[subgroup] = [];
			}
		
			// let _subgroup = accumulated[subgroup];
			const thusFar = accumulated[subgroup];
			const newSubgroup = group[subgroup];
			const conjoinedSubgroup = [...accumulated[subgroup], ...group[subgroup]];
			accumulated[subgroup] = conjoinedSubgroup;
		});

		return accumulated;
	},
	{}
);

// nonCount: [ "spaghetti", "pasta"],

// const ALCHOHOL = [
// 	"beer",
// 	"soda",
// 	"wine",
// 	"vodka",
// 	"tequila",
// 	"gin",
// 	"rum",
// 	"Martini",
// 	"cocktail",
// 	"coke",
// 	"water",
// 	"lemonade",
// 	"milk",
// 	"chocolate milk",
// ];
// const JUICE = ["apple juice", "orange juice", "smoothie"];

// const DRINKS = { SINGULAR: [...ALCHOHOL, ...JUICE], NON_COUNT: [], PLURAL: [] };

// const FEELINGS = {
// 	NON_COUNT: [
// 		"hair",
// 		"flair",
// 		"love",
// 		"amazement",
// 		"enjoyment",
// 		"entertainment",
// 	],
// };

// const PERSONAL_PRONOUNS = ["I", "we", "you", "he", "she", "it", "they"];

export { VEGETABLES, FRUIT, FAST_FOOD, ALL_FOODS };
