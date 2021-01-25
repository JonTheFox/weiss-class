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
import Page from "./Page.js";
import Text from "../Text/Text.js";
//import PropTypes from "prop-types";
// import clsx from "clsx";

// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";

// import { localStorage } from "../../../../lib/issy/index.js";
import StyledPage from "./Page.styles.js";
import Subtitle from "../Subtitle/Subtitle.js";

const label = "BottomThirdCaption";

const BottomThirdCaption = (props) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { heading = "", subheading = "", p = [""], bgImage = "" } = props;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledPage className={"Page Page--bottom-third-caption"}>
			<Heading variant="marquee">{heading}</Heading>
			<Heading h="2" variant="sub-marquee">
				{subheading}
			</Heading>
			<Subtitle paragraphs={p} />
		</StyledPage>
	);
};

export default BottomThirdCaption;

/*{p && (
				<Page>
					{p.map((paragraph) => {
						return <Text>{paragraph}</Text>;
					})}
				</Page>
			)}*/
