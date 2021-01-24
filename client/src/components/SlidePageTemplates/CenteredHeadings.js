import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import CenteredContainer from "../CenteredContainer/CenteredContainer.js";
import Heading from "../Heading/Heading.js";
import View from "../layout/View.jsx";
import Page from "../SlidePageTemplates/Page.js";
import Text from "../Text/Text.js";
import StyledPage from "./Slide.styles.js";

const label = "CenteredHeadings";

const CenteredHeadings = (props) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;
	const {
		heading = "",
		subheading = "",
		p = [""],
		bgImage = "",
		pages = [],
	} = props;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledPage
			className={"Page--centered-headings centered"}
			style={{ padding: 0 }}
		>
			<Heading>{heading}</Heading>
			<Heading h="2">{subheading}</Heading>
		</StyledPage>
	);
};

export default CenteredHeadings;

/*



*/
