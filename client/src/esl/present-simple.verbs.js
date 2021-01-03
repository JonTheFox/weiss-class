//NOTE: it's important to put the regular verbs first, and only then the irregulars. Reasons: The table logic assumes and relies on this structures

//The verbs are grouped according to their past simple and past participle forms

const VERB_GROUP_NAMES = ["Special", "S", "ES", "IES"];
const VERBS = {
	SPECIAL: {
		regular: false,
		verbs: [
			{
				v1: "am / are",
				vSnob: "is",
			},

			{
				v1: "have",
				vSnob: "has",
			},
			{
				v1: "do",
				vSnob: "does",
			},
		],
	},
	S: {
		regular: true,
		formula: "V + s",
		verbs: [
			{
				v1: "last",
				vSnob: "lasts",
			},
			{
				v1: "train",
				vSnob: "trains",
			},
			{
				v1: "meet",
				vSnob: "meets",
			},
			{
				v1: "work",
				vSnob: "works",
			},
		],
	},
	ES: {
		regular: true,
		formula: "V + es",
		verbs: [
			{
				v1: "pass",
				vSnob: "passes",
			},
			{
				v1: "crash",
				vSnob: "crashes",
			},
			{
				v1: "catch",
				vSnob: "catches",
			},
			{
				v1: "fix",
				vSnob: "fixes",
			},
			{
				v1: "buzz",
				vSnob: "buzzes",
			},
			{
				v1: "go",
				vSnob: "goes",
			},
		],
	},

	IES: {
		regular: true,
		formula: "V + ies",
		verbs: [
			{
				v1: "study",
				vSnob: "studies",
			},
			{
				v1: "try",
				vSnob: "tries",
			},
			{
				v1: "hurry",
				vSnob: "hurries",
			},
		],
	},
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
