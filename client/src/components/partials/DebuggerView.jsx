import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import View from "../layout/View.jsx";
import SuperBasicTable from "./SuperBasicTable.jsx";
import "./_DebuggerView.scss";

//import POSES from "../../constants/poses.js";
import posed from "react-pose"; //yay!:)

const dragBoxPoses = {
	draggable: true,
	dragEnd: { transition: "spring", scale: 1 },
	drag: { scale: 0.8 }
};

const PosedBox = posed.div(dragBoxPoses);

// const exampleActions = [
// 	{
// 		label: "Refresh",
// 		callback: () => window.location.reload()
// 	}
// ];

//let animationFrame;
let logg;
let promiseKeeper;
const label = "DevbuggerView";

const DevbuggerView = React.forwardRef((props, ref) => {
	const { show = false } = props;
	const [appState] = useContext(AppContext);
	const { Logger, PromiseKeeper, DEBUGGING } = appState;

	logg = logg || new Logger({ label }).logg;
	promiseKeeper = promiseKeeper || new PromiseKeeper({ label });

	if (!show || !DEBUGGING) return null;

	return (
		<PosedBox className={clsx("draggable-box")}>
			<View fullsize={false} className={clsx("debugger-view")} ref={ref}>
				<SuperBasicTable className={clsx("table")} {...props} />
			</View>
		</PosedBox>
	);
});

DevbuggerView.propTypes = {
	show: PropTypes.bool,
	columns: PropTypes.arrayOf(PropTypes.object),
	data: PropTypes.arrayOf(PropTypes.object),
	noHeader: PropTypes.bool
};

export default DevbuggerView;
