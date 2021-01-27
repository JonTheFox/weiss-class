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
	},
});

export default recoilState;
