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
		img: {},
		video: {},
		gif: {},
		students: [],
		teachers: [],
		platforms: [],
		currentSlideIndex: 0,
	},
});

export default recoilState;
