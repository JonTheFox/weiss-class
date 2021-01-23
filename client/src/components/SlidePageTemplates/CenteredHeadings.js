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
import StyledSlide from "./Slide.styles.js";

const label = "CenteredHeadings";

const insideStyles = {
	background: "white",
	padding: 20,
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%,-50%)",
};
const image1 =
	"https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";

const CenteredHeadings = ({ slide = {} }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const {
		heading = "",
		subheading = "",
		p = [""],
		bgImage = "",
		pages = [],
	} = slide;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledSlide
			className={"Slide Slide--centered-headings"}
			style={{ padding: 0 }}
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
