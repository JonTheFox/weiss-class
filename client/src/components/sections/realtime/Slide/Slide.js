import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import Heading from "../../../partials/Heading/Heading.js";
import Text from "../../../partials/Text/Text.js";
//import PropTypes from "prop-types";
// import clsx from "clsx";

import useLogg from "../../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import slidesState from "../../../../store/slides.atom.js";

// import { localStorage } from "../../../../lib/issy/index.js";
import StyledSlide from "./Slide.styles.js";

const label = "Slide";

const Slide = ({ slide = {} }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { heading = "", subheading = "", p = [""], bgImage = "" } = slide;

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledSlide
			style={{ backgroundImage: `url(${bgImage})` }}
			className={"Slide Slide--base1"}
		>
			<Heading>{heading}</Heading>
			<Heading h="2">{subheading}</Heading>
			{p.map((paragraph) => {
				return <Text>{paragraph}</Text>;
			})}
		</StyledSlide>
	);
};

export default Slide;
