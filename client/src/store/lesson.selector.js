import roomState from "./room.atom.js";

import {
	// atom,
	selector,
} from "recoil";

const recoilState = selector({
	key: "lessonState",
	default: {},
	get: ({ get }) => {
		const { slides = [], currentSlideIndex = 0 } = get(roomState);

		if (!slides) return [];
		return slides;
	},
});

export default recoilState;
