import {
	atom,
	// selector,
} from "recoil";

const recoilState = atom({
	key: "client",
	default: { id: "", types: ["student"] },
});

export default recoilState;
