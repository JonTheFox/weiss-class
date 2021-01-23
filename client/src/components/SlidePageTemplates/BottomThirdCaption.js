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

const label = "BottomThirdCaption";

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

const BottomThirdCaption = ({ slide = {} }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { heading = "", subheading = "", p = [""], bgImage = "" } = slide;

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
			{p && (
				<Page>
					{p.map((paragraph) => {
						return <Text>{paragraph}</Text>;
					})}
				</Page>
			)}
		</StyledSlide>
	);
};

export default BottomThirdCaption;

/*



*/
