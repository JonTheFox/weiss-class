import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

const recoilState = atom({
	key: "videoState",
	default: {
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
	},
});

export default recoilState;
