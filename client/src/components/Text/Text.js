import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";

import StyledText from "./Text.styles.js";

const Text = (props) => {
	const { children, readable = false } = props;
	return (
		<StyledText
			className={`Text-Container ${readable ? "readable" : ""}`}
			{...props}
		>
			<p className="text">{children}</p>
		</StyledText>
	);
};

export default Text;
