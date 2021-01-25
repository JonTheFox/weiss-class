import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";

import StyledText from "./Text.styles.js";

const Text = (props) => {
	const {
		children,
		pClassName = "",
		readable = false,
		variant = "cloudy",
	} = props;
	return (
		<StyledText
			className={`Text-Container ${readable ? "readable" : ""}`}
			{...props}
		>
			<p className={`text ${variant} ${pClassName}`}>{children}</p>
		</StyledText>
	);
};

export default Text;
