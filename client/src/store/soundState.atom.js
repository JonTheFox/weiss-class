import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

const recoilState = atom({
	key: "soundState",
	default: {
		isSoundOn: true,
		isMuted: false,
	},
});

export default recoilState;
