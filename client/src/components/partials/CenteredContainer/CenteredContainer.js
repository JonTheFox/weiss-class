import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";

// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";

import StyledCenteredContainer from "./CenteredContainer.styles.js";

const label = "CenteredContainer";
const CenteredContainer = ({ children = "" }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledCenteredContainer className={`${label} centered`} style={{}}>
			{children}
		</StyledCenteredContainer>
	);
};

export default CenteredContainer;
