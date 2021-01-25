import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";

// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";
import StyledSubtitle from "./Subtitle.styles.js";
import Text from "../Text/Text.js";

const label = "Subtitle";

const Subtitle = ({ paragraphs, children = "" }) => {
	return (
		<StyledSubtitle className={`${label}`}>
			{paragraphs &&
				paragraphs.map((paragraph) => {
					return <Text>{paragraph}</Text>;
				})}
		</StyledSubtitle>
	);
};

export default Subtitle;
