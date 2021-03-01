import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

const recoilState = atom({
	key: "isVideoPlayingState",
	default: false,
});

export default recoilState;
