import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	//useCallback,
	//useMemo
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import useLogg from "../hooks/useLogg.jsx";

//import PropTypes from "prop-types";
import clsx from "clsx";
import View from "../layout/View.jsx";
import usePromiseKeeper from "../hooks/usePromiseKeeper.jsx";
import "./_OrdinalsTable.scss";

// import SpeedDial from "@material-ui/lab/SpeedDial";
//import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
//import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
//import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
//import SaveIcon from "@material-ui/icons/Save";
//import PrintIcon from "@material-ui/icons/Print";
//import ShareIcon from "@material-ui/icons/Share";
//import FavoriteIcon from "@material-ui/icons/Favorite";
//import ClearAllIcon from "@material-ui/icons/ClearAll";

import Paper from "@material-ui/core/Paper";

import SuperBasicTable from "../partials/SuperBasicTable.jsx";
import Swiper from "../partials/Swiper.jsx";

import { getOrdinal } from "../../esl/ordinals.js";

const columns = [
	{ field: "ordinal_shortened", title: "Abbreviation" },
	{ field: "ordinal_full", title: "Full" },
	// { field: "number", title: "Number" },
	// { field: "cardinal", title: "Cardinal" },
];

const tables = [];
for (let i = 0; i < 100; i += 10) {
	const table = [];
	for (let j = i; j < i + 10; j++) {
		const numObj = getOrdinal(j + 1);
		const [a, b, c, d] = numObj;
		const row = {
			number: a,
			cardinal: b,
			ordinal_shortened: c,
			ordinal_full: d,
		};

		table.push(row);
	}
	tables.push(table);
}

let animationFrame;
const label = "OrdinaslTable";

const toggleShowWord = function(ev, domNode) {
	try {
		//onCellClick sets "this" to the cell data
		const cellRef = this ? this.ref : domNode;
		cellRef.classList.toggle("show");
	} catch (err) {
		console.error(err.message);
		return null;
	}
};

const OrdinaslTable = React.forwardRef((props, ref) => {
	const { withPaper, showMarquee } = props;
	const mediaContext = useContext(DeviceContext);
	const [appUtils, appState] = useContext(AppContext);
	const { DURATIONS } = appUtils;
	const { logg, loggError } = useLogg({ label });
	const [items] = useState(tables);
	//const [direction, setDirection] = React.useState("down");
	// const [open, setOpen] = React.useState(false);
	//const [hidden, setHidden] = React.useState(false);
	const refs = useRef({});
	const promiseKeeper = usePromiseKeeper(label);

	// const handleClose = () => {
	// 	setOpen(false);
	// };

	// const handleOpen = () => {
	// 	setOpen(true);
	// };

	const mapTable = function(tableData, i) {
		const data = tableData.map((numObj, i) => {
			const {
				number,
				cardinal,
				ordinal_shortened,
				ordinal_full,
			} = numObj;
			return {
				number,
				cardinal,
				ordinal_shortened,
				ordinal_full,
			};
		});

		const renderWrapper = (props) => {
			return <div className="table--wrapper">{props.children}</div>;
		};

		// 			{ transcript: "hello", confidence: 1 },
		// // 	{ transcript: "goodbye", confidence: 1 },

		return (
			<renderWrapper>
				<SuperBasicTable
					key={`table-num-${i}`}
					className={`num-rows-${i}`}
					cellClass="unselectable readable"
					noHeader
					columnClasses={[
						"ordinal-shortened  readable show",
						"ordinal-full readable show",
						"number readable",
						"cardinal readable",
					]}
					data={tableData}
					columns={columns}
					headerClass={"dynamic-stroke"}
					editable={false}
					sharedRefs={refs}
					onCellClick={toggleShowWord}
				></SuperBasicTable>
			</renderWrapper>
		);
	};

	useEffect(() => {
		return () => {
			window.cancelAnimationFrame(animationFrame);
			appState.setSearchables({});
		};
	}, []);

	return (
		<View
			className={clsx(
				"ordinals-table fullsize position--relative",
				showMarquee && "ordinals-table--show-marquee",
				withPaper && "ordinals-table--with-paper"
			)}
			ref={ref}
		>
			<div className={"page-header"}>
				<h2>Ordinal Numbers</h2>
			</div>
			<Swiper
				//sharedRefs={refs}
				className={clsx(
					"x-fast transition--opaque animation animation-delay--2"
				)}
				size={mediaContext.size}
				items={tables}
				mapItem={mapTable}
				sharedRefs={refs}
				//mapItem={mapStanza.bind(null, refs)}
				noFullscreen={true}
				justifyContent="space-between"
				showHeader={false}
				headerClass={
					"table-header-section x-fast transition--opaque animation animation-delay--1"
				}
				axis="y"
				nextKey={"arrowDown"}
				prevKey={"arrowUp"}
			></Swiper>
		</View>
	);
});

// OrdinaslTable.propTypes = {
// 	sharedRefs: PropTypes.objectOf(PropTypes.objectOf)
// };

export default OrdinaslTable;

/*
<SpeedDial
				ariaLabel="SpeedDial example"
				className={clsx("speed-dial")}
				hidden={hidden}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
				direction={direction}
			>
				{actions.map(action => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={actions.handleClick}
					/>
				))}
			</SpeedDial>
*/
