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
		readable = true,
		variant = "cloudy", // or: "small"
		style,
		shadow = "",
		textStyle = {}, // One of: "dark"
		pStyle = {},
	} = props;

	const _style = { ...style, padding: "var(--spacing)" };
	return (
		<StyledText
			className={`Text-Container ${readable ? "readable" : ""}`}
			{...props}
			style={_style}
		>
			<p
				className={clsx(
					"text",
					variant,
					pClassName,
					shadow && `shadow--${shadow}`
				)}
				style={pStyle}
			>
				{children}
			</p>
		</StyledText>
	);
};

export default Text;
