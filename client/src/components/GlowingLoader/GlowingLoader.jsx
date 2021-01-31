import React, {
	useReducer,
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";
// import { AppContext } from "../../state/AppContext.js";
import { DeviceContext } from "../../state/DeviceContext.js";
import PropTypes from "prop-types";
import clsx from "clsx";
// import useLogg from "../../utils/useLogg.js";
// import usePromiseKeeper from "../../utils/usePromiseKeeper.js";
import styles from "./GlowingLoader.module.scss";

import DraggableBall from "../DraggableBall/DraggableBall.jsx";

import posed from "react-pose";

const PosedOpacity = posed.div({
	enter: { opacity: 1, transition: { duration: 20000 } },
	exit: { opacity: 0, transition: { duration: 20000 } },
});

// let animationFrame;
// const label = "GlowingLoader";

const GlowingLoader = React.forwardRef((props, ref) => {
	const {
		className,
		fullpage,
		background = false,
		ringBackground = true,
	} = props;

	// const [appUtils, appState] = useContext(AppContext);
	const deviceState = useContext(DeviceContext);
	// const { our, request } = appUtils;
	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	// useEffect(() => {
	// 	return () => {
	// 		window.cancelAnimationFrame(animationFrame);
	// 	};
	// }, []);

	return (
		<PosedOpacity
			className={clsx(
				// label,
				fullpage && "page gradient--diagonal",
				fullpage && styles.fullpage,
				styles.root,
				styles[deviceState.device]
			)}
			ref={ref}
		>
			<DraggableBall>
				<div
					className={clsx(
						styles.ring,
						ringBackground && "gradient--diagonal"
					)}
				>
					Loading
					<span></span>
				</div>
			</DraggableBall>
		</PosedOpacity>
	);
});

GlowingLoader.propTypes = {
	className: PropTypes.object,
	fullpage: PropTypes.bool,
};

export default GlowingLoader;
