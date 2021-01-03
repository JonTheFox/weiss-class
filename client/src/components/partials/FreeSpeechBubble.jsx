import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
//import posed from "react-pose";
import "./_FreeSpeechBubble.scss";

let logg;
let promiseKeeper;
const label = "FreeSpeechBubble";

const FreeSpeechBubble = React.forwardRef((props, ref) => {
	const { Text, show, className, anchor, onClick = () => {} } = props;
	const [appUtils] = useContext(AppContext);
	const responsiveData = useContext(DeviceContext);
	const { appbarHeight } = responsiveData;
	const { Logger, PromiseKeeper, alignElements } = appUtils;
	const refs = useRef({ appbarHeight });

	promiseKeeper = promiseKeeper || new PromiseKeeper({ label });
	logg = logg || new Logger({ label }).logg;

	useEffect(() => {
		refs.current.appbarHeight = appbarHeight;
	}, [appbarHeight]);

	useEffect(() => {
		const { appbarHeight } = refs.current;
		const bubbleHeight = ref.current.clientHeight || 0;

		if (show) {
			logg(appbarHeight, bubbleHeight);
			alignElements({
				targetElem: anchor,
				movingElem: ref,
				//top: (appbarHeight || 0) - 0.33 * bubbleHeight
				top: -0.66 * bubbleHeight
			});
		}
	}, [show, alignElements, ref, anchor]);

	return (
		<div
			className={clsx(
				"speech-bubble free-speech-bubble",
				className && className,
				show ? "show-speech-bubble" : "hide-speech-bubble"
			)}
			onClick={onClick}
			ref={ref}
		>
			{" "}
			{Text}
		</div>
	);
});

FreeSpeechBubble.propTypes = {
	Text: PropTypes.element,
	show: PropTypes.bool,
	onPressEnd: PropTypes.func,
	className: PropTypes.string,
	anchor: PropTypes.object,
	onClick: PropTypes.func
};

export default FreeSpeechBubble;
