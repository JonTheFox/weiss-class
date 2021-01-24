import roomState from "./room.atom.js";

import {
	// atom,
	selector,
} from "recoil";

const recoilState = selector({
	key: "lessonStateSelector",
	default: {},
	get: ({ get }) => {
		const { slides = [], currentSlideIndex = 0 } = get(roomState);

		debugger;

		if (!slides) return [];
		return slides;
	},
});

export default recoilState;
