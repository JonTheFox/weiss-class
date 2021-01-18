import roomState from "./room.atom.js";

import {
	// atom,
	selector,
} from "recoil";

const recoilState = selector({
	key: "currentSlideState",
	default: {},
	get: ({ get }) => {
		const { slides, currentSlideIndex = 0 } = get(roomState);

		if (!slides || !slides[currentSlideIndex]) return null;
		return slides[currentSlideIndex];
	},
});

export default recoilState;
