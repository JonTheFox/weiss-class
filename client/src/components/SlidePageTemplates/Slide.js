import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import Heading from "../Heading/Heading.js";
import View from "../../components/layout/View.jsx";
import Page from "./Page.js";
import Text from "../Text/Text.js";
//import PropTypes from "prop-types";
// import clsx from "clsx";
// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";
// import { localStorage } from "../../../../lib/issy/index.js";
import StyledContainer from "./Slide.styles.js";
import CenteredContainer from "../CenteredContainer/CenteredContainer.js";

import ScrollSnap from "scroll-snap";

import slideState from "../../store/slide.selector.js";

import { useRecoilValue } from "recoil";

const label = "Slide";
const snapConfig = {
	/**
	 * snap-destination for x and y axes
	 * should be a valid css value expressed as px|%|vw|vh
	 */
	snapDestinationX: "0%",
	snapDestinationY: "90%",
	/**
	 * time in ms after which scrolling is considered finished
	 * [default: 100]
	 */
	timeout: 100,
	/**
	 * duration in ms for the smooth snap
	 * [default: 300]
	 */
	duration: 300,
	/**
	 * threshold to reach before scrolling to next/prev element, expressed as a percentage in the range [0, 1]
	 * [default: 0.2]
	 */
	threshold: 0.2,
	/**
	 * when true, the scroll container is not allowed to "pass over" the other snap positions
	 * [default: false]
	 */
	snapStop: false,
	/**
	 * custom easing function
	 * [default: easeInOutQuad]
	 * for reference: https://gist.github.com/gre/1650294
	 * @param t normalized time typically in the range [0, 1]
	 */
	//easing: "easeInOutQuad",
};

const Slide = (props) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { pages = [], templateName = "", pageProps = [] } = props;
	const refs = useRef({ slide: {} });

	const slide = useRecoilValue(slideState);

	const snapObject = new ScrollSnap(refs.current, snapConfig);

	function onSnapEnd() {
		console.log("snap ended");
	}

	const bindScrollSnap = () => {
		const slideElement = refs.current.slide;
		const snapElement = new ScrollSnap(slideElement, {
			snapDestinationY: "100%",
		});

		snapElement.bind(onSnapEnd);
	};

	useEffect(() => {
		bindScrollSnap();

		// const videoSet = slide?.pages?.[0]?.videoSet;
	}, []);

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	return (
		<StyledContainer
			className={"Slide"}
			style={{ padding: 0 }}
			ref={(ref) => {
				if (ref) refs.current.slide = ref;
			}}
		>
			{pages &&
				pages.map((page, i) => {
					return (
						<Page className="Page" {...page} {...pageProps}></Page>
					);
				})}
		</StyledContainer>
	);
};

export default Slide;

/*

background={{
								backgroundImage: bgImage,
								backgroundAttachment: "fixed",
							}}
*/
