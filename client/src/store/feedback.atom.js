import {
	atom,
	//selector,
} from "recoil";

//see actionTypes.js for a list of possible values

const recoilState = atom({
	key: "feedbackState",
	default: {
		headingText: "",
		bodyText: "",
	},
});

export default recoilState;
