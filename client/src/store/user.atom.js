import {
	// RecoilRoot,
	atom,
	// selector,
	// useRecoilState,
	// useSetRecoilState,
	// useRecoilValue,
} from "recoil";

const initialValue = null;

/*
Example user:

{
email: wawa@gmail.com,
password: WaWa931012w1edfmasfsfsfdas,
first_name: "avihai",
last_name: "Lux"
}

*/

const recoilState = atom({
	key: "authenticatedUser", // unique ID (with respect to other atoms/selectors)
	default: initialValue, // default value (aka initial value),
});

export { recoilState };
