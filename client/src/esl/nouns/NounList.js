import WordList from "../WordList.js";

class NounList extends WordList {
	partOfSpeech = "noun";
	// groups = {
	// 	singular: [],
	// 	plural: [],
	// 	nonCount: [],
	// };
	constructor(config={}) {
		super(config);
	
	}	
}

export default NounList;