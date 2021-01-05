import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

const recoilState = atom({
	key: "roomsState", // unique ID (with respect to other atoms/selectors)
	default: {
		name: "",
		students: [],
		teachers: [],
		platforms: [],
	}, // default, initial value
});

export default recoilState;
