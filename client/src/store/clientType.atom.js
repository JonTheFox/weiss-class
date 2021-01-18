import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

const recoilState = atom({
	key: "clientTypeState", // unique ID (with respect to other atoms/selectors)
	default: "student", // default, initial value\//accepted values: "student, "teacher" and "platform"
});

export default recoilState;
