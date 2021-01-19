import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";

// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";
import StyledText from "./Text.styles.js";

const label = "Text";
const Text = ({ children = "" }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledText className={"Text"}>
			<p>{children}</p>
		</StyledText>
	);
};

export default Text;
