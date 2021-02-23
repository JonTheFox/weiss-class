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

const CenteredContainer = (props) => {
	return (
		<StyledCenteredContainer
			className={`${label} centered`}
			style={props.style}
		>
			{props.children}
		</StyledCenteredContainer>
	);
};

export default CenteredContainer;
