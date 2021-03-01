import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

import { flyingThroughClouds } from "../mockData/lessons/Present Progressive/presentProgressiveVideos.js";

const recoilState = atom({
	key: "videoState",
	default: flyingThroughClouds,
});

export default recoilState;

/*shape:

id: 0,
	user: {
		name: "",
		url: "",
		id: 0,
	},
	images: {
		phone: "",
		tablet: "",
		hdReady: "",
		fullHd: "",
		fourK: ",",
	},
	links: {
		phone: "",
		tablet: "",
		hdReady: "",
		fullHd: "",
		fourK: ",",
	},



*/
