import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import clsx from "clsx";

// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";
import StyledSubtitle from "./Subtitle.styles.js";
import Text from "../Text/Text.js";

const label = "Subtitle";

const Subtitle = ({
	paragraphs,
	readable = true,
	children = "",
	className = "",
	variant = "footer",
	size = "small", //or: "regular" or "large"
}) => {
	if (!paragraphs.length || !paragraphs[0]) return null;

	console.log("size: ", size);

	return (
		<StyledSubtitle
			className={clsx(
				label,
				variant,
				className && className,
				size && `size--${size}`
			)}
		>
			{paragraphs &&
				paragraphs.map(({ text, className }, index) => {
					return (
						<Text
							className={clsx(
								className && className,
								readable && "readable"
							)}
							variant="cloudy"
							shadow="dark"
							key={className + index}
						>
							{text}
						</Text>
					);
				})}
		</StyledSubtitle>
	);
};

export default Subtitle;
