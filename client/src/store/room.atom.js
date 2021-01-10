import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

const recoilState = atom({
	key: "roomState", // unique ID (with respect to other atoms/selectors)
	default: {
		roomKey: "",
		name: "",
		students: [],
		teachers: [],
		platforms: [],
	}, // default, initial value
});

export default recoilState;
