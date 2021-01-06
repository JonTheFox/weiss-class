import { atom } from "recoil";

const state = atom({
	key: "socketConnection", // unique ID (with respect to other atoms/selectors)
	default: null, // default value (aka initial value)
});

export default state;
