import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";

import StyledText from "./Text.styles.js";

const Text = (props) => {
	return (
		<StyledText className={"Text-Container"} {...props}>
			<p className="text">{props.children}</p>
		</StyledText>
	);
};

export default Text;
