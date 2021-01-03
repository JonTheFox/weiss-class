import NounList from "./NounList.js";

const PERSONAL_PRONOUNS = new NounList({
	groups: {
		singular: ["I", "you", "he", "she", "it"],
		plural: ["we", "they"],
	},
});

export default PERSONAL_PRONOUNS;
