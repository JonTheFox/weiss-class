const pos = require("pos");

const TAGS = {
	CC: { partName: "Coord Conjuncn", eg: "and,but,or" },
	CD: { partName: "Cardinal number", eg: "one,two" },
	DT: { partName: "Determiner", eg: "the,some" },
	EX: { partName: "Existential there", eg: "there" },
	FW: { partName: "Foreign Word", eg: "mon dieu" },
	IN: { partName: "Preposition Conjuncn", eg: "of,in,by" },
	JJ: { partName: "Adjective", eg: "big" },
	JJR: { partName: "Adj., comparative", eg: "bigger" },
	JJS: { partName: "Adj., superlative", eg: "biggest" },
	LS: { partName: "List item marker", eg: "1,One" },
	MD: { partName: "Modal", eg: "can,should" },
	NN: { partName: "Noun, sing. or mass", eg: "dog" },
	NNS: { partName: "Noun, plural", eg: "dogs" },
	NNP: { partName: "Proper noun, sing.", eg: "Edinburgh" },
	NNPS: { partName: "Proper noun, plural", eg: "Smiths" },
	POS: { partName: "Possessive ending", eg: "'s" },
	PDT: { partName: "Predeterminer", eg: "all, both" },
	//NOTE: the tag name is actually PP$. Consider this fact when trying to access a tag in this TAGS object
	PP_: { partName: "Possessive pronoun", eg: "my,one's" },
	PRP: { partName: "Personal pronoun", eg: "I,you,she" },
	RB: { partName: "Adverb", eg: "quickly" },
	RBR: { partName: "Adverb, comparative", eg: "faster" },
	RBS: { partName: "Adverb, superlative", eg: "fastest" },
	RP: { partName: "Particle", eg: "up,off" },
	SYM: { partName: "Symbol", eg: "+,%,&" },
	TO: { partName: `"to"`, eg: "to" },
	UH: { partName: "Interjection", eg: "oh, oops" },
	VB: { partName: "verb, base form", eg: "eat" },
	VBG: { partName: "verb, gerund", eg: "eating" },
	VBD: { partName: "verb, past part", eg: "eaten" },
	VBP: { partName: "Verb, present", eg: "eat" },
	VBZ: { partName: "Verb, present (snobbish)", eg: "eats" },
	WDT: { partName: "Wh-determiner", eg: "which,that" },
	WP: { partName: "Wh pronoun", eg: "who,what" },
	//NOTE: the actual tag name is WP$
	WP_: { partName: "Wh-adverb", eg: "how,where" },
	WRB: { partName: "Possessive-Wh", eg: "whose" },
	signs: {
		partNames:
			"comma, sent-final punct, mid-sent punct., dollar sign, pound sign, quote, left paren, right parent",
		partName: "signs and punctuations",

		eg: `. ! ? : ;  $ # " ( )`,
	},
};
