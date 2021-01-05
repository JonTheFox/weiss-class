import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

const textState = atom({
	key: "textState", // unique ID (with respect to other atoms/selectors)
	default: "yo", // default value (aka initial value)
});

export default textState;
