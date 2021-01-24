import roomState from "./room.atom.js";

import {
	atom,
	// selector,
} from "recoil";

const recoilState = atom({
	key: "currentSlideIndexState",
	default: 0,
});

export default recoilState;
