import {
	atom,
	// selector,
} from "recoil";

const recoilState = atom({
	key: "refs",
	default: { current: {} },
});

export default recoilState;
