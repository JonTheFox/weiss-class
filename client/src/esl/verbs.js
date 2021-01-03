//NOTE: it's important to put the regular verbs first, and only then the irregulars. Reasons: The table logic assumes and relies on this structures

//The verbs are grouped according to their past simple and past participle forms

const VERB_GROUP_NAMES = [
	"Default",
	"C.V.C.",
	"C.V. + w/x/y",
	"e",
	"C. + y",
	"V. + y",
	"Non-changing",
	"Important",
	"Tell & Sell",
	"Stand & understand",
	"half",
	"half + t",
	"d -> t",
	"Say / Pay",
	"ind -> ound",
	"i -> u",
	"it => at",
	"ean/eam + t",
	"V1 Comeback",
	"old -> eld",
	"ought /aught",
	"en",
	"i -> a > u",
	"ow -> own",
	"ite -> dobule + en",
	"ow/ew -> own/ewn",
	"ear -> orn",
	"lie / lay"
];
const VERBS = {
	ED: {
		regular: true,
		formula: "V + ed",
		suffix: "ed",
		verbs: [
			{
				v1: "talk",
				vSnob: "talks",
				vIng: "talking",
				v2: "talked",
				v3: "talked"
			},
			{
				v1: "walk",
				vSnob: "walks",
				vIng: "walking",
				v2: "walked",
				v3: "walked"
			},
			{
				v1: "look",
				vSnob: "looks",
				vIng: "looking",
				v2: "looked",
				v3: "looked"
			},
			{
				v1: "ask",
				vSnob: "asks",
				vIng: "asking",
				v2: "asked",
				v3: "asked"
			},
			{
				v1: "answer",
				vSnob: "answers",
				vIng: "answering",
				v2: "answered",
				v3: "answered"
			},
			{
				//maybe should be moved because its vSnob has "es" suffix
				v1: "guess",
				vSnob: "guesses",
				vIng: "guessing",
				v2: "guessed",
				v3: "guessed"
			},
			{
				v1: "succeed",
				vSnob: "succeeds",
				vIng: "succeeding",
				v2: "succeeded",
				v3: "succeeded"
			},
			{
				v1: "fail",
				vSnob: "fails",
				vIng: "failing",
				v2: "failed",
				v3: "failed"
			}
		]
	},
	ED_CVC_DOUBLE: {
		regular: true,
		suffix: "ed",
		formula: "V + double the last letter + ed",
		verbs: [
			{
				v1: "stop",
				vSnob: "stops",
				vIng: "stopping",
				v2: "stopped",
				v3: "stopped"
			},
			{
				v1: "pat",
				vSnob: "pats",
				vIng: "patting",
				v2: "patted",
				v3: "patted"
			},
			{
				v1: "hop",
				vSnob: "hops",
				vIng: "hopping",
				v2: "hopped",
				v3: "hopped"
			}
		]
	},
	ED_CVC_DONT_DOUBLE: {
		regular: true,
		suffix: "ed",
		formula: "V + ed",
		verbs: [
			{
				v1: "flow",
				vSnob: "flows",
				vIng: "flowing",
				v2: "flowed",
				v3: "flowed"
			},
			{
				v1: "glow",
				vSnob: "glows",
				vIng: "glowing",
				v2: "glowed",
				v3: "glowed"
			},
			{
				v1: "fix",
				vSnob: "fixes",
				vIng: "fixing",
				v2: "fixed",
				v3: "fixed"
			},
			{
				v1: "mix",
				vSnob: "mixes",
				vIng: "mixing",
				v2: "mixed",
				v3: "mixed"
			},
			{
				v1: "delay",
				vSnob: "delays",
				vIng: "delaying",
				v2: "delayed",
				v3: "delayed"
			},
			{
				v1: "employ",
				vSnob: "employs",
				vIng: "employing",
				v2: "employed",
				v3: "employed"
			}
		]
	},
	D: {
		regular: true,
		formula: "V + d",
		suffix: "d",
		verbs: [
			{
				v1: "like",
				vSnob: "likes",
				vIng: "liking",
				v2: "liked",
				v3: "liked"
			},

			{
				v1: "smile",
				vSnob: "smiles",
				vIng: "smiling",
				v2: "smiled",
				v3: "smiled"
			},
			{
				v1: "surprise",
				vSnob: "surprises",
				vIng: "surprising",
				v2: "surprised",
				v3: "surprised"
			},

			{
				v1: "save",
				vSnob: "saves",
				vIng: "saving",
				v2: "saved",
				v3: "saved"
			},
			{
				v1: "taste",
				vSnob: "tastes",
				vIng: "tasting",
				v2: "tasted",
				v3: "tasted"
			},

			{
				v1: "hope",
				vSnob: "hopes",
				vIng: "hoping",
				v2: "hoped",
				v3: "hoped"
			},
			{
				v1: "live",
				vSnob: "lives",
				vIng: "living",
				v2: "lived",
				v3: "lived"
			},

			{
				v1: "compete",
				vSnob: "competes",
				vIng: "competing",
				v2: "competed",
				v3: "competed"
			}
		]
	},
	Y_IED: {
		regular: true,
		suffix: "ied",
		formula: "V - y + ied",
		verbs: [
			{
				v1: "try",
				vSnob: "tries",
				vIng: "trying",
				v2: "tried",
				v3: "tried"
			},
			{
				v1: "cry",
				vSnob: "cries",
				vIng: "crying",
				v2: "cried",
				v3: "cried"
			},
			{
				v1: "study",
				vSnob: "studies",
				vIng: "studying",
				v2: "studied",
				v3: "studied"
			},
			{
				v1: "tidy",
				vSnob: "tidies",
				vIng: "tidying",
				v2: "tidied",
				v3: "tidied"
			},
			{
				v1: "hurry",
				vSnob: "hurries",
				vIng: "hurrying",
				v2: "hurried",
				v3: "hurried"
			}
		]
	},
	Y__ED: {
		regular: true,
		formula: "V + ed",
		suffix: "ed",
		verbs: [
			{
				v1: "play",
				vSnob: "plays",
				vIng: "playing",
				v2: "played",
				v3: "played"
			},

			{
				v1: "stay",
				vSnob: "stays",
				vIng: "staying",
				v2: "stayed",
				v3: "stayed"
			},

			{
				v1: "enjoy",
				vSnob: "enjoys",
				vIng: "enjoying",
				v2: "enjoyed",
				v3: "enjoyed"
			},

			{
				v1: "destroy",
				vSnob: "destroys",
				vIng: "destroying",
				v2: "destroyed",
				v3: "destroyed"
			}
		]
	},

	//irregular
	Y_ALL_SAME: {
		formula: "No change!",
		verbs: [
			{
				v1: "cost",
				vSnob: "cost",
				vIng: "cost",
				v2: "cost",
				v3: "cost"
			},
			{
				v1: "put",
				vSnob: "put",
				vIng: "put",
				v2: "put",
				v3: "put"
			},
			{
				v1: "hit",
				vSnob: "hit",
				vIng: "hit",
				v2: "hit",
				v3: "hit"
			},
			{
				v1: "set",
				vSnob: "set",
				vIng: "set",
				v2: "set",
				v3: "set"
			},

			{
				v1: "bet",
				vSnob: "bet",
				vIng: "bet",
				v2: "bet",
				v3: "bet"
			},

			{
				v1: "hurt",
				vSnob: "hurt",
				vIng: "hurt",
				v2: "hurt",
				v3: "hurt"
			},
			{
				v1: "burst",
				vSnob: "burst",
				vIng: "burst",
				v2: "burst",
				v3: "burst"
			},
			{
				v1: "shut",
				vSnob: "shut",
				vIng: "shut",
				v2: "shut",
				v3: "shut"
			},
			{
				v1: "cut",
				vSnob: "cut",
				vIng: "cut",
				v2: "cut",
				v3: "cut"
			},
			{
				v1: "let",
				vSnob: "let",
				vIng: "let",
				v2: "let",
				v3: "let"
			},
			{
				v1: "spread",
				vSnob: "spread",
				vIng: "spread",
				v2: "spread",
				v3: "spread"
			},
			{
				v1: "read",
				vSnob: "read",
				vIng: "read",
				v2: `read ("red")`,
				v3: `read ("red")`
			}
		]
	},

	MOST_COMMON: {
		verbs: [
			{
				v1: "be / am / is / are",
				vSnob: "is",
				vIng: "being",
				v2: "was / were",
				v3: "been"
			},
			{
				v1: "do",
				vSnob: "does",
				vIng: "doing",
				v2: "did",
				v3: "done"
			},
			{
				v1: "have",
				vSnob: "has",
				vIng: "having",
				v2: "had",
				v3: "had"
			},
			{
				v1: "make",
				vSnob: "makes",
				vIng: "making",
				v2: "made",
				v3: "made"
			},
			{
				v1: "get",
				vSnob: "gets",
				vIng: "getting",
				v2: "got",
				v3: "got / gotten"
			},
			{
				v1: "go",
				vSnob: "gpes",
				vIng: "going",
				v2: "went",
				v3: "gone"
			},

			{
				v1: "see",
				vSnob: "sees",
				vIng: "seeing",
				v2: "saw",
				v3: "seen"
			},
			{
				v1: "eat",
				vSnob: "eats",
				vIng: "eating",
				v2: "ate",
				v3: "eaten"
			}
		]
	},
	OLD: {
		formula: "ell => old",
		verbs: [
			{
				v1: "tell",
				vSnob: "tells",
				vIng: "telling",
				v2: "told",
				v3: "told"
			},
			{
				v1: "sell",
				vSnob: "sells",
				vIng: "selling",
				v2: "sold",
				v3: "sold"
			}
		]
	},
	OOD: {
		verbs: [
			{
				v1: "stand",
				vSnob: "stands",
				vIng: "standing",
				v2: "stood",
				v3: "stood"
			},
			{
				v1: "understand",
				vSnob: "understands",
				vIng: "understanding",
				v2: "understood",
				v3: "understood"
			}
		]
	},

	HALF: {
		verbs: [
			{
				v1: "meet",
				vSnob: "meets",
				vIng: "meeting",
				v2: "met",
				v3: "met"
			},
			{
				v1: "shoot",
				vSnob: "shoots",
				vIng: "shooting",
				v2: "shot",
				v3: "shot"
			},
			{
				v1: "feed",
				vSnob: "feeds",
				vIng: "feeding",
				v2: "fed",
				v3: "fed"
			},
			{
				v1: "bleed",
				vSnob: "bleeds",
				vIng: "bleeding",
				v2: "bled",
				v3: "bled"
			},
			{
				v1: "lead",
				vSnob: "leads",
				vIng: "leading",
				v2: "led",
				v3: "led"
			}
		]
	},
	HALF_PLUS_T: {
		verbs: [
			{
				v1: "sleep",
				vSnob: "sleeps",
				vIng: "sleeping",
				v2: "slept",
				v3: "slept"
			},
			{
				v1: "feel",
				vSnob: "feels",
				vIng: "feeling",
				v2: "felt",
				v3: "felt"
			},
			{
				v1: "keep",
				vSnob: "keeps",
				vIng: "keeping",
				v2: "kept",
				v3: "kept"
			},
			{
				v1: "sweep",
				vSnob: "sweeps",
				vIng: "sweeping",
				v2: "swept",
				v3: "swept"
			},
			{
				v1: "weep",
				vSnob: "weeps",
				vIng: "weeping",
				v2: "wept",
				v3: "wept"
			}
		]
	},

	D_TO_T: {
		verbs: [
			{
				v1: "send",
				vSnob: "sends",
				vIng: "sending",
				v2: "sent",
				v3: "sent"
			},
			{
				v1: "spend",
				vSnob: "spends",
				vIng: "spending",
				v2: "spent",
				v3: "spent"
			},
			{
				v1: "build",
				vSnob: "builds",
				vIng: "building",
				v2: "built",
				v3: "built"
			},
			{
				v1: "bend",
				vSnob: "bends",
				vIng: "bending",
				v2: "bent",
				v3: "bent"
			},
			{
				v1: "feed",
				vSnob: "feeds",
				vIng: "feeding",
				v2: "fed",
				v3: "fed"
			}
		]
	},

	AID: {
		verbs: [
			{
				v1: "say",
				vSnob: "says",
				vIng: "saying",
				v2: "said",
				v3: "said"
			},
			{
				v1: "pay",
				vSnob: "pays",
				vIng: "paying",
				v2: "paid",
				v3: "paid"
			}
		]
	},
	OUND: {
		verbs: [
			{
				v1: "find",
				vSnob: "finds",
				vIng: "finding",
				v2: "found",
				v3: "found"
			},
			{
				v1: "bind",
				vSnob: "binds",
				vIng: "binding",
				v2: "bound",
				v3: "bound"
			},
			{
				v1: "grind",
				vSnob: "grinds",
				vIng: "grinding",
				v2: "ground",
				v3: "ground"
			}
		]
	},
	U: {
		verbs: [
			{
				v1: "stick",
				vSnob: "sticks",
				vIng: "sticking",
				v2: "stuck",
				v3: "stuck"
			},
			{
				v1: "sting",
				vSnob: "stings",
				vIng: "stinging",
				v2: "stung",
				v3: "stung"
			},
			{
				v1: "dig",
				vSnob: "digs",
				vIng: "digging",
				v2: "dug",
				v3: "dug"
			},
			{
				v1: "swing",
				vSnob: "swings",
				vIng: "swinging",
				v2: "swung",
				v3: "swung"
			},
			{
				v1: "shrink",
				vSnob: "shrinks",
				vIng: "shrinking",
				v2: "shrunk",
				v3: "shrunk"
			},
			{
				v1: "hang",
				vSnob: "hangs",
				vIng: "hanging",
				v2: "hung",
				v3: "hung"
			},
			{
				v1: "strike",
				vSnob: "strikes",
				vIng: "striking",
				v2: "struck",
				v3: "struck"
			}
		]
	},

	AT: {
		verbs: [
			{
				v1: "sit",
				vSnob: "sits",
				vIng: "sitting",
				v2: "sat",
				v3: "sat"
			},
			{
				v1: "spit",
				vSnob: "spits",
				vIng: "spitting",
				v2: "spat",
				v3: "spat"
			}
		]
	},
	T: {
		verbs: [
			{
				v1: "hear",
				vSnob: "hears",
				vIng: "hearing",
				v2: "heard",
				v3: "heard"
			},
			{
				v1: "mean",
				vSnob: "means",
				vIng: "meaning",
				v2: "meant",
				v3: "meant"
			},
			{
				v1: "dream",
				vSnob: "dreams",
				vIng: "dreaming",
				v2: "dreamt / dreamed",
				v3: "dreamt / dreamed"
			}
		]
	},

	COMEBACK: {
		verbs: [
			{
				v1: "come",
				vSnob: "comes",
				vIng: "coming",
				v2: "came",
				v3: "come"
			},
			{
				v1: "become",
				vSnob: "becomes",
				vIng: "becoming",
				v2: "became",
				v3: "become"
			},
			{
				v1: "run",
				vSnob: "runs",
				vIng: "running",
				v2: "ran",
				v3: "run"
			}
		]
	},

	ELD: {
		verbs: [
			{
				v1: "hold",
				vSnob: "holds",
				vIng: "holding",
				v2: "held",
				v3: "held"
			},
			{
				v1: "behold",
				vSnob: "beholds",
				vIng: "beholding",
				v2: "beheld",
				v3: "beheld"
			}
		]
	},

	OUGHT: {
		verbs: [
			{
				v1: "think",
				vSnob: "thinks",
				vIng: "thinking",
				v2: "thought",
				v3: "thought"
			},
			{
				v1: "bring",
				vSnob: "brings",
				vIng: "bringing",
				v2: "brought",
				v3: "brought"
			},
			{
				v1: "fight",
				vSnob: "fights",
				vIng: "fighting",
				v2: "fought",
				v3: "fought"
			},
			{
				v1: "catch",
				vSnob: "catches",
				vIng: "catching",
				v2: "caught",
				v3: "caught"
			},
			{
				v1: "teach",
				vSnob: "teaches",
				vIng: "teaching",
				v2: "taught",
				v3: "taught"
			}
		]
	},

	EN: {
		verbs: [
			{
				v1: "take",
				vSnob: "takes",
				vIng: "taking",
				v2: "took",
				v3: "taken"
			},
			{
				v1: "give",
				vSnob: "gives",
				vIng: "giving",
				v2: "gave",
				v3: "given"
			},
			{
				v1: "forgive",
				vSnob: "forgives",
				vIng: "forgiving",
				v2: "forgave",
				v3: "forgiven"
			},
			{
				v1: "forget",
				vSnob: "forgets",
				vIng: "forgetting",
				v2: "forgot",
				v3: "forgotton"
			},
			{
				v1: "speak",
				vSnob: "speaks",
				vIng: "speaking",
				v2: "spoke",
				v3: "spoken"
			},
			{
				v1: "choose",
				vSnob: "chooses",
				vIng: "choosing",
				v2: "chose",
				v3: "chosen"
			},
			{
				v1: "freeze",
				vSnob: "freezes",
				vIng: "freezing",
				v2: "froze",
				v3: "frozen"
			},
			{
				v1: "break",
				vSnob: "breaks",
				vIng: "breaking",
				v2: "broke",
				v3: "broken"
			},
			{
				v1: "wake",
				vSnob: "wakes",
				vIng: "waking",
				v2: "woke",
				v3: "awaken"
			},
			{
				v1: "steal",
				vSnob: "steals",
				vIng: "stealing",
				v2: "stole",
				v3: "stolen"
			},
			{
				v1: "rise",
				vSnob: "rises",
				vIng: "rising",
				v2: "rose",
				v3: "risen"
			}
		]
	},

	UN: {
		verbs: [
			{
				v1: "begin",
				vSnob: "begins",
				vIng: "beginning",
				v2: "began",
				v3: "begun"
			},
			{
				v1: "sing",
				vSnob: "sings",
				vIng: "singing",
				v2: "sang",
				v3: "sung"
			},
			{
				v1: "ring",
				vSnob: "rings",
				vIng: "ringing",
				v2: "rang",
				v3: "rung"
			},
			{
				v1: "sink",
				vSnob: "sinks",
				vIng: "sinking",
				v2: "sank",
				v3: "sunk"
			},
			{
				v1: "drink",
				vSnob: "drinks",
				vIng: "drinking",
				v2: "drank",
				v3: "drunk"
			}
		]
	},

	OWN: {
		verbs: [
			{
				v1: "know",
				vSnob: "knows",
				vIng: "knowing",
				v2: "knew",
				v3: "known"
			},
			{
				v1: "grow",
				vSnob: "grows",
				vIng: "growing",
				v2: "grew",
				v3: "grown"
			},
			{
				v1: "throw",
				vSnob: "throws",
				vIng: "throwing",
				v2: "threw",
				v3: "thrown"
			},
			{
				v1: "fly",
				vSnob: "flies",
				vIng: "flying",
				v2: "flew",
				v3: "flown"
			},
			{
				v1: "blow",
				vSnob: "blows",
				vIng: "blowing",
				v2: "blew",
				v3: "blown"
			},
			{
				v1: "draw",
				vSnob: "draws",
				vIng: "drawing",
				v2: "drew",
				v3: "drawn"
			}
		]
	},

	ITTEN: {
		verbs: [
			{
				v1: "write",
				vSnob: "writes",
				vIng: "writing",
				v2: "wrote",
				v3: "written"
			},
			{
				v1: "ride",
				vSnob: "rides",
				vIng: "riding",
				v2: "rode",
				v3: "ridden"
			},
			{
				v1: "bite",
				vSnob: "bites",
				vIng: "biting",
				v2: "bit",
				v3: "bitten"
			}
		]
	},

	N: {
		verbs: [
			{
				v1: "show",
				vSnob: "shows",
				vIng: "showing",
				v2: "showed",
				v3: "shown"
			},
			{
				v1: "sew",
				vSnob: "sews",
				vIng: "sewing",
				v2: "sewed",
				v3: "sewn"
			}
		]
	},

	ORN: {
		verbs: [
			{
				v1: "wear",
				vSnob: "wears",
				vIng: "wearing",
				v2: "wore",
				v3: "worn"
			},
			{
				v1: "swear",
				vSnob: "swears",
				vIng: "swearing",
				v2: "swore",
				v3: "sworn"
			},
			{
				v1: "tear",
				vSnob: "tears",
				vIng: "tearing",
				v2: "tore",
				v3: "torn"
			},
			{
				v1: "bear",
				vSnob: "bears",
				vIng: "bearing",
				v2: "bore",
				v3: "born"
			}
		]
	},
	LIE: {
		verbs: [
			{
				v1: "lie",
				vSnob: "lies",
				vIng: "lying",
				v2: "lied",
				v3: "lied"
			},
			{
				v1: "lie",
				vSnob: "lies",
				vIng: "lying",
				v2: "lay",
				v3: "lain"
			},
			{
				v1: "lay",
				vSnob: "lays",
				vIng: "laying",
				v2: "laid",
				v3: "laid"
			}
		]
	}
};

const VERB_LIST = [];
let i = 0;
for (let [key, value] of Object.entries(VERBS)) {
	// value.title = VERB_GROUP_NAMES[i];
	value.groupName = VERB_GROUP_NAMES[i];
	VERB_LIST[i] = value;
	i++;
}

export { VERB_LIST as VERB_GROUPS, VERB_GROUP_NAMES };
