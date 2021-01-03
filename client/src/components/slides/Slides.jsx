import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import View from "../layout/View.jsx";
import PresentSimpleDeck from "./PresentSimple.slides.jsx";
import "./_Slides.scss";

const presentSimpleSlides = {
	name: "present-simple-deck",
	Deck: PresentSimpleDeck,
};

let animationFrame;
let logg;
let loggError;
let promiseKeeper;
const label = "Presentation";

const Presentation = React.forwardRef((props, ref) => {
	const { slides, onComplete } = props;
	const [appUtils] = useContext(AppContext);
	const { Logger, PromiseKeeper } = appUtils;
	const [presentation, setPresentation] = useState(presentSimpleSlides);

	useEffect(() => {
		promiseKeeper = new PromiseKeeper({ label });
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;

		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	return (
		<View
			className={clsx(
				"slides-presentation full-vh--minus-appbar",
				presentation.name
			)}
			ref={ref}
		>
			<presentation.Deck></presentation.Deck>
		</View>
	);
});

Presentation.propTypes = {
	slides: PropTypes.object,
	onComplete: PropTypes.func,
};

export default Presentation;
