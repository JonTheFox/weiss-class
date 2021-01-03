import pos from "pos";
const TAG_SPECS = {
	CC: { partName: "coord Conjuncn", eg: "and,but,or" },
	CD: { partName: "cardinal number", eg: "one,two" },
	DT: { partName: "determiner", eg: "the,some" },
	EX: { partName: "Existential there", eg: "there" },
	FW: { partName: "foreign Word", eg: "mon dieu" },
	IN: { partName: "preposition Conjunction", eg: "of,in,by" },
	JJ: { partName: "adjective", eg: "big" },
	JJR: { partName: "adj., comparative", eg: "bigger" },
	JJS: { partName: "adj., superlative", eg: "biggest" },
	LS: { partName: "list item marker", eg: "1,One" },
	MD: { partName: "modal", eg: "can,should" },
	NN: { partName: "noun, singular or mass", eg: "dog" },
	NNS: { partName: "noun, plural", eg: "dogs" },
	NNP: { partName: "proper noun, singular", eg: "Edinburgh" },
	NNPS: { partName: "proper noun, plural", eg: "Smiths" },
	POS: { partName: "possessive ending", eg: "'s" },
	PDT: { partName: "predeterminer", eg: "all, both" },

	PRP: { partName: "personal pronoun", eg: "I,you,she" },
	//NOTE: the tag name is actually PP$. Consider this fact when trying to access a tag in this TAG_SPECS object
	PRP_DOLLAR: { partName: "possessive pronoun", eg: "my,one's" },
	RB: { partName: "adverb", eg: "quickly" },
	RBR: { partName: "adverb, comparative", eg: "faster" },
	RBS: { partName: "adverb, superlative", eg: "fastest" },
	RP: { partName: "particle", eg: "up, off" },
	SYM: { partName: "symbol", eg: "+, %, &" },
	TO: { partName: `"to"`, eg: "to" },
	UH: { partName: "interjection", eg: "oh, oops" },
	VB: { partName: "verb, base form", eg: "eat" },
	VBG: { partName: "verb, gerund", eg: "eating" },
	VBD: { partName: "verb, past part", eg: "eaten" },
	VBP: { partName: "verb, present", eg: "eat" },
	VBZ: { partName: "verb, present (snobbish)", eg: "eats" },
	WDT: { partName: "wh-determiner", eg: "which,that" },
	WP: { partName: "wh pronoun", eg: "who,what" },
	//NOTE: the actual tag name is WP$
	WP_DOLLAR: { partName: "possessive wh-pronoun", eg: "whose" },
	WRB: { partName: "wh-adverb", eg: "how,where" },
	signs: {
		partNames:
			"comma, sent-final punct, mid-sent punct., dollar sign, pound sign, quote, left paren, right parent",
		partName: "signs and punctuations",

		eg: `. ! ? : ;  $ # " ( )`,
	},
};

const getSpecsOfTag = (tagName) => {
	if (!tagName) return null;
	let tagSpec = TAG_SPECS[tagName.toUpperCase()];
	if (tagSpec) return tagSpec;
	//Some tags end with a "$" character. This character cannot be a part of a variable name in JS, so we replace it with "_DOLLAR"
	let sanitizedTag = tagName.slice(0, -1) + "_DOLLAR";
	tagSpec = TAG_SPECS[sanitizedTag];
	if (tagSpec) return tagSpec;
	// no tagName was found. It's probably some sign or punctuation mark..?
	return TAG_SPECS.signs;
};

let tagger;

const tagWords = (
	words,
	config = {
		capitalize: { firstWord: true, properNouns: true },
		extendLexiconWith: { Iceman: ["NNP"] },
	}
) => {
	if (!tagger) tagger = new pos.Tagger();
	if (config.extendLexiconWith) {
		tagger.extendLexicon(config.extendLexiconWith);
	}

	let _words = new pos.Lexer().lex(words);

	// let apostropheIndex = _words.indexOf("'");
	// // debugger;
	// while (apostropheIndex > 0) {
	// 	_words[apostropheIndex - 1] =
	// 		_words[apostropheIndex - 1] + "'" + _words[apostropheIndex + 1];
	// 	_words = [
	// 		_words.slice(0, apostropheIndex),
	// 		_words.slice(apostropheIndex + 2)
	// 	].flat();
	// 	// debugger;
	// 	apostropheIndex = _words.indexOf("'");
	// }

	// _words = new pos.Lexer().lex(words);
	// const wordWithApostrophe = _words.indexOf("'") > -1;

	const taggedWords = tagger.tag(_words);

	const capitalizeProperNouns = config?.capitalize?.properNouns;

	//transform each tagged word
	//supported transformations: capitalize first letter, capitalize proper nouns (added to the lexicon; otherwise it will only recognize proper nouns by their starting capital letter)
	//adds the part name, e.g.:  "wh pronoun".
	// Example Transformed tagged word:
	// [ ["What", "WP", "wh pronoun", ] ]
	for (let i in taggedWords) {
		const taggedWord = taggedWords[i]; //e.g. ["I", "PRP"]
		let word = taggedWord[0];
		let tagName = taggedWord[1];
		if (i == 0 && config?.capitalize?.firstWord) {
			word = word[0].toUpperCase() + word.slice(1);
		}

		if (capitalizeProperNouns && ["NNP", "NNPS"].includes(tagName)) {
			//the lexicon lacks many names
			//TODO: manually add a list of names --- and most importantly, the client and other student's names
			word = word[0].toUpperCase() + word.slice(1);
		}

		taggedWord[0] = word;

		//add the partName (e.g. "pronoun") to the taggedWord object
		taggedWord.push(getSpecsOfTag(tagName).partName);
	}
	return taggedWords;
};

// extend the lexicon
// tagger.extendLexicon({ Obama: ["NNP"] });
// tagger.tag(["Mr", "Obama"]);
// --> [[ 'Mr', 'NNP' ], [ 'Obama', 'NNP' ]]

export { TAG_SPECS as TAGS, tagWords };
