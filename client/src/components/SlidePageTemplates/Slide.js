import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import Heading from "../Heading/Heading.js";
import View from "../../components/layout/View.jsx";
import Page from "./Page.js";
import Text from "../Text/Text.js";
//import PropTypes from "prop-types";
// import clsx from "clsx";
// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";
// import { localStorage } from "../../../../lib/issy/index.js";
import StyledContainer from "./Slide.styles.js";
import CenteredContainer from "../CenteredContainer/CenteredContainer.js";
const label = "Slide";

const Slide = (props) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { pages = [], templateName = "" } = props;

	debugger;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledContainer
			className={"Slide Slide--centered-headings"}
			style={{ padding: 0 }}
		>
			{pages &&
				pages.map((page, i) => {
					// const {
					// 	id,
					// 	templateName,
					// 	heading = "",
					// 	subheading = "",
					// 	p = [""],
					// 	bgImage = "",
					// } = page;

					// const PageTemplate =
					// 	SLIDE_TEMPLATES[templateName] ||
					// 	SLIDE_TEMPLATES["CenteredHeadings"];

					debugger;
					return <Page {...page}></Page>;
				})}
		</StyledContainer>
	);
};

export default Slide;

/*

background={{
								backgroundImage: bgImage,
								backgroundAttachment: "fixed",
							}}
*/
