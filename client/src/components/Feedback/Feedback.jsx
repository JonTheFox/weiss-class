import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import View from "../layout/View.jsx";
import posed, { PoseGroup } from "react-pose";

let animationFrame;
let logg;
let loggError;
let promiseKeeper;
const label = "Feedback";

const feedbackPoses = {
	enter: {
		opacity: 1,
		rotateY: "0deg"
	},
	exit: {
		opacity: 0,
		delay: 0,
		rotateY: "180deg"
	}
};

const PosedFeedback = posed.div(feedbackPoses);

const Feedback = React.forwardRef((props, ref) => {
	const { show, msg } = props;
	const [appUtils] = useContext(AppContext);
	const { Logger, PromiseKeeper } = appUtils;

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
		<PoseGroup>
			{show && (
				<PosedFeedback key="server-msg--container">
					<p className={props.className}>{props.children}</p>
				</PosedFeedback>
			)}
		</PoseGroup>
	);
});

Feedback.propTypes = {
	show: PropTypes.bool
};

export default Feedback;
