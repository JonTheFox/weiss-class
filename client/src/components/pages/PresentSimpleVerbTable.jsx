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
import "./_VerbTable.scss";
import "./_PresentSimpleVerbForms.scss";

import Paper from "@material-ui/core/Paper";

import SuperBasicTable from "../partials/SuperBasicTable.jsx";
import Swiper from "../partials/Swiper.jsx";

// import tensify from "tensify";
import {
	VERB_GROUPS,
	//VERB_GROUP_NAMES
} from "../../esl/present-simple.verbs.js";

const columns = [
	{ field: "v1", title: "I / we / you / they" },
	{
		field: "vSnob",
		title: "He / she / it",
		subtitle: "Third-person singular",
	},
];

let animationFrame;
const label = "PresentSimpleVerbFormsTable";

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

const PresentSimpleVerbFormsTable = React.forwardRef((props, ref) => {
	const { withPaper, showMarquee } = props;
	const mediaContext = useContext(DeviceContext);
	const [appUtils, appState] = useContext(AppContext);
	const { DURATIONS } = appUtils;
	const { logg, loggError } = useLogg({ label });
	const [items] = useState(VERB_GROUPS.flat());
	const refs = useRef({});
	const promiseKeeper = usePromiseKeeper(label);

	const mapTable = function(tableData, i) {
		const { groupName = "", formula = "", verbs, suffix = "" } = tableData;

		if (!verbs) {
			loggError("no verbs in ", tableData);
		}

		const renderWrapper = (props) => {
			if (withPaper)
				return (
					<Paper elevation={3} className="table--paper">
						{props.children}
					</Paper>
				);
			return <div className="table--wrapper">{props.children}</div>;
		};

		return (
			<renderWrapper>
				{showMarquee && (
					<div className="table-marquee" key={`table-${i}`}>
						{formula && (
							<h4
								className={
									"table-marquee--formula scale-up--onhover unselectable shadow scale-up--onhover"
								}
							>
								{suffix || formula}
							</h4>
						)}

						<div class="ribbon ribbon-top-left readable">
							<span>{groupName}</span>
						</div>
					</div>
				)}

				<SuperBasicTable
					key={`table-num-${i}`}
					className={`num-rows-${verbs.length || tableData.length}`}
					cellClass="unselectable readable"
					columnClasses={[
						"gradient-v1 readable show",
						"gradient-v2 readable",
						"gradient-v3 readable",
					]}
					data={verbs}
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
		// promiseKeeper = new PromiseKeeper({ label });
		const allVerbs = VERB_GROUPS.map((verbGroup, i, originalArray) => {
			const verbsInGroup = [];
			for (let [key, verb] of Object.entries(verbGroup.verbs)) {
				verb.groupName = verbGroup.groupName;

				verbsInGroup.push(verb);
			}
			return verbsInGroup;
		});
		appState.setSearchables({
			options: allVerbs.flat(),
			getOptionLabel: (option) => {
				if (!option) {
					return "no label";
				}

				return option.v1;
			},
			onChange: (searchable) => {
				logg("searchable: ", searchable);
				if (!searchable) return null;
				const groupInItems = items.find(
					(verbGroup) => verbGroup.groupName === searchable.groupName
				);

				if (!groupInItems) {
					loggError(
						"selected search option was not found in items state"
					);
					return null;
				}
				const groupIndex = items.indexOf(groupInItems);
				const { swiper_goToStep, swiper_items, swiper } = refs.current;
				swiper_goToStep(groupIndex);

				promiseKeeper
					.stall(DURATIONS.enter, "goToTableOfSelectedVerb")
					.then(() => {
						//find the DOM element of the V1 of the selected verb, and show it.
						const { swiper_items, swiper } = refs.current;
						const verbRowInTable = swiper_items[
							groupIndex
						].verbs.find((verb) => verb.v1 === searchable.v1);
						if (!verbRowInTable) return;
						const rowIndex = swiper_items[groupIndex].verbs.indexOf(
							verbRowInTable
						);

						const v1DomNode = swiper.ref.querySelector(
							`.react-swipeable-view-container > div:nth-child(${groupIndex +
								1}) table tbody .row.row-${rowIndex} .table-cell.v1`
						);
						if (!v1DomNode) return;
						toggleShowWord(null, v1DomNode);
					})
					.catch((reason) => {
						loggError(reason);
						return null;
					});
			},
		});

		return () => {
			window.cancelAnimationFrame(animationFrame);
			appState.setSearchables({});
		};
	}, []);

	return (
		<View
			className={clsx(
				"PresentSimpleVerbFormsTable fullsize position--relative",
				showMarquee && "verb-table--show-marquee",
				withPaper && "verb-table--with-paper"
			)}
			ref={ref}
		>
			<Swiper
				//sharedRefs={refs}
				className={clsx(
					"x-fast transition--opaque animation animation-delay--1"
				)}
				size={mediaContext.size}
				items={VERB_GROUPS}
				mapItem={mapTable}
				sharedRefs={refs}
				//mapItem={mapStanza.bind(null, refs)}
				noFullscreen={true}
				justifyContent="space-between"
				//showHeader={true}
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

// PresentSimpleVerbFormsTable.propTypes = {
// 	sharedRefs: PropTypes.objectOf(PropTypes.objectOf)
// };

export default PresentSimpleVerbFormsTable;
