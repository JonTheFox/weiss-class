import {
	// RecoilRoot,
	atom,
	// selector,
	// useRecoilState,
	// useSetRecoilState,
	// useRecoilValue,
} from "recoil";

/*

possible values: 

const CONNECTION_STATES = {
	IS_NOT_READY: "inactive",
	IDLE: "isIdle",
	CONNECTING: "isConnecting",
	ENTERING_ROOM: "isEnteringRoom",
	ALREADY_INSIDE_ROOM: "isAlreadyConnected",
	ENTERED_ROOM: "isConnected",
	CONNECTION_FAILED: "connectionFailed",
	DISCONNECTED: "isDisconnected",
};

*/

const initialValue = "inactive";

const recoilState = atom({
	key: "connectionStatus", // unique ID (with respect to other atoms/selectors)
	default: initialValue, // default value (aka initial value),
});

export default recoilState;
