import {
	// RecoilRoot,
	atom,
	// selector,
	// useRecoilState,
	// useSetRecoilState,
	// useRecoilValue,
} from "recoil";

const initialValue = {};

const recoilState = atom({
	key: "itemsState", // unique ID (with respect to other atoms/selectors)
	default: initialValue, // default value (aka initial value),
});

export { recoilState };
