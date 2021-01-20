import {
	atom,
	// selector,
} from "recoil";

const recoilState = atom({
	key: "client",
	default: { id: "", type: "student" },
});

export default recoilState;
