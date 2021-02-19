import soundState from "./soundState.atom.js";

import {
	// atom,
	selector,
} from "recoil";

const recoilState = selector({
	key: "isSoundOnSelector",
	default: false,
	get: ({ get }) => {
		const { isSoundOn } = get(soundState);
		return isSoundOn;
	},
});

export default recoilState;
