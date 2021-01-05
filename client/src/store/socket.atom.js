import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

const recoilState = atom({
	key: "socketState", // unique ID (with respect to other atoms/selectors)
	default: null, // default value (aka initial value)
});

export default recoilState;
