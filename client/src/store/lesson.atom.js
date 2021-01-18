import {
	atom,
	//selector,
} from "recoil";

const recoilState = atom({
	key: "lessonState",
	default: {
		currentSlideIndex: 0,
		slides: [],
	},
});

export default recoilState;
