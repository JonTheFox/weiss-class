import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import Card from "../../../partials/Card.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";
import View from "../../../layout/View.jsx";

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

	const { header = "", subheader = "", p = [""], bgImage = "" } = slide;
	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledSlide
			style={{ backgroundImage: bgImage }}
			className={"Slide Slide--base1"}
		>
			<h1>{header}</h1>
			<h2>{subheader}</h2>
			{p.map((paragraph) => {
				return <p>{paragraph}</p>;
			})}
		</StyledSlide>
	);
};

export default Slide;
