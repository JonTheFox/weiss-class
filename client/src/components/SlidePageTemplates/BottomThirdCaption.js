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

	const {
		heading = "",
		subheading = "",
		paragraphs = [],
		bgImage = "",
	} = props;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	// const renderTexts = () => {
	// 	if (!p || !p.length) return null;
	// 	return p.map((paragraph) => {
	// 		return <Text pClassName="">{paragraph}</Text>;
	// 	});
	// };

	return (
		<StyledPage className={"Page Page--bottom-third-caption"}>
			<div className="Headings-Container">
				<Heading variant="marquee" shadow="dark" textLook="flat">
					{heading}
				</Heading>
				<Heading
					h="2"
					variant="sub-marquee"
					textLook="flat"
					shadow="dark"
				>
					{subheading}
				</Heading>
			</div>

			<Subtitle paragraphs={paragraphs} />
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
