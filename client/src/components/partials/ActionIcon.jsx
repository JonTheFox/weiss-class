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

let animationFrame;
let logg;
let promiseKeeper;
const label = "ActionIcon";

const ActionIcon = React.forwardRef((props, ref) => {
	const { show, icon } = props;
	const [appUtils] = useContext(AppContext);
	const { issy, Logger } = appUtils;
	const { PromiseKeeper } = issy;
	promiseKeeper = promiseKeeper || new PromiseKeeper({ label });
	logg = logg || new Logger({ label }).logg;

	return (
		<div
			className={clsx("action-icon fullsize centered", show && "show")}
		></div>
	);
});

ActionIcon.propTypes = {
	show: PropTypes.object,
	icon: PropTypes.object
};

export default ActionIcon;
