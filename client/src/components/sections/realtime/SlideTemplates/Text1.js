import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import Heading from "../../../partials/Heading/Heading.js";
import Text from "../../../partials/Text/Text.js";
import Page from "../Page/Page.js";
//import PropTypes from "prop-types";
// import clsx from "clsx";

// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";

// import { localStorage } from "../../../../lib/issy/index.js";
import StyledSlide from "./Slide.styles.js";
import CenteredContainer from "../../../partials/CenteredContainer/CenteredContainer.js";

const label = "Slide";

const Slide = ({ slide = {} }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const {
		heading = "",
		subheading = "",
		p = [""],
		bgImage = "",
		marquee = "",
		subMarquee = "",
	} = slide;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledSlide className={"Slide Slide--base1"}>
			<Heading>{marquee}</Heading>
			<Heading h="2">{subheading}</Heading>
			<Page>
				{p.map((paragraph) => {
					return <Text>{paragraph}</Text>;
				})}
			</Page>
		</StyledSlide>
	);
};

export default Slide;

/*

{p.map((paragraph) => {
					return <Text>{paragraph}</Text>;
				})}

*/
