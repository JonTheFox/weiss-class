import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import Heading from "../../../partials/Heading/Heading.js";
import View from "../../../layout/View.jsx";
import Page from "../Page/Page.js";
import Text from "../../../partials/Text/Text.js";
//import PropTypes from "prop-types";
// import clsx from "clsx";

// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";

// import { localStorage } from "../../../../lib/issy/index.js";
import StyledSlide from "./Slide.styles.js";
import CenteredContainer from "../../../partials/CenteredContainer/CenteredContainer.js";

const label = "CenteredHeadings";

const CenteredHeadings = ({ slide = {} }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { heading = "", subheading = "", p = [""], bgImage = "" } = slide;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });
	return (
		<StyledSlide
			className={"Slide Slide--centered-headings style={{padding:0}}"}
		>
			<Page>
				<CenteredContainer>
					<Heading>{heading}</Heading>
					<Heading h="2">{subheading}</Heading>
				</CenteredContainer>
			</Page>
			<Page>
				{p.map((paragraph) => {
					return <Text>{paragraph}</Text>;
				})}
			</Page>
		</StyledSlide>
	);
};

export default CenteredHeadings;

/*



*/
