import {
	atom,
	//selector,
} from "recoil";

const recoilState = atom({
	key: "roomState",
	default: {
		roomKey: "",
		name: "",
		title: "",
		slides: [],
		students: [],
		teachers: [],
		platforms: [],
		currentSlideIndex: 0,
		currentStepIndex: 0,
	},
});

export default recoilState;
