import {
	atom,
	//selector,
	// useRecoilState,
	//useRecoilValue,
	// RecoilRoot,
} from "recoil";

import { CONNECTION_STATES } from "../store/CONNECTION_STATES";

const recoilState = atom({
	key: "socketState", // unique ID (with respect to other atoms/selectors)
	default: CONNECTION_STATES.IS_NOT_READY,
	// default value (aka initial value),
	dangerouslyAllowMutability: true, //to allow adding event handlers (on()) and emitting events (emit())
});

export default recoilState;
