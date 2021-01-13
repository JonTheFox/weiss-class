import {
	atom,
	// selector,
} from "recoil";

const recoilState = atom({
	key: "authenticatedUser",
	default: null,
});

export default recoilState;
