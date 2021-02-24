import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";

import clsx from "clsx";

import StyledText from "./Text.styles.js";

const Text = (props) => {
	const {
		children,
		pClassName = "",
		readable = false,
		variant = "cloudy", // or: "small"
		style,
		shadow = "", // One of: "dark"
	} = props;
	return (
		<StyledText
			className={`Text-Container ${readable ? "readable" : ""}`}
			{...props}
			style={style}
		>
			<p
				className={clsx(
					"text",
					variant,
					pClassName,
					shadow && `shadow--${shadow}`
				)}
			>
				{children}
			</p>
		</StyledText>
	);
};

export default Text;
