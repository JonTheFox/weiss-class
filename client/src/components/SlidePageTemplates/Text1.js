import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import Heading from "../Heading/Heading.js";
import Text from "../Text/Text.js";
import Page from "../SlidePageTemplates/Page.js";
import CenteredContainer from "../CenteredContainer/CenteredContainer.js";
import StyledSlide from "./Slide.styles.js";

const label = "Slide";

const Slide = (props) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const {
		heading = "",
		subheading = "",
		p = [""],
		bgImage = "",
		marquee = "",
		subMarquee = "",
	} = props;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledSlide className={"Page Page--text1"}>
			<Heading>{marquee}</Heading>
			<Heading h="2">{subheading}</Heading>

			{p.map((paragraph) => {
				return <Text>{paragraph}</Text>;
			})}
		</StyledSlide>
	);
};

export default Slide;

/*

{p.map((paragraph) => {
					return <Text>{paragraph}</Text>;
				})}

*/
