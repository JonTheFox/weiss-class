import React, {
	useState,
	useReducer,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AppContext } from "../../../contexts/AppContext.jsx";
import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";
import View from "../../layout/View.jsx";
import VocabularyPage from "./Vocabulary.page.jsx";
import ENDPOINTS from "../../../AJAX/ajax-endpoints.js";

import VocabularyReducer, {
	DEFAULT_INITIAL_STATE,
	initReducer,
} from "./Vocabulary.reducer.js";

let animationFrame;
const label = "VocabularyIndex";

const VocabularyIndex = React.forwardRef((props, ref) => {
	const { rounds, onCorrect } = props;
	const [appUtils, appState] = useContext(AppContext);

	const { request, synthVoice, capitalizeTitle } = appUtils;
	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const [VocabularyState, dispatch] = useReducer(
		VocabularyReducer,
		{ displayedItemType: "subcategory" }, //config for the initial state

		initReducer //will combine the config above with the default initial state defined inside the reducer
	);

	const refs = useRef({ VocabularyState });

	const loadImageGroups = async ({
		collectionName = "all",
		category = "foods",
	}) => {
		try {
			const res = await request(
				"POST",
				ENDPOINTS[category].POST.getAll.path,
				{
					collectionName,
					user: appState.user,
				}
			);

			const desanitize = (sanitizedString) => {
				const withDesanitizedCommas = sanitizedString.replace(
					/__/gi,
					", "
				);
				const withDesanitizedSpaces = withDesanitizedCommas.replace(
					/_/gi,
					" "
				);

				return withDesanitizedSpaces;
			};

			if (res.error) throw new Error(res.error);
			if (!res.data) throw new Error("Dd not receive any data");

			const vals = Object.entries(res.data);
			vals.forEach((val) => {
				const desanitized = desanitize(val[0]);
				val[0] = capitalizeTitle(desanitized);
			});

			let allItems;
			const _displayedItemType =
				refs.current.VocabularyState.displayedItemType;

			if (_displayedItemType === "subcategory") {
				allItems = vals;
			} else if (displayedItemType === "itemGroup") {
				const allItemGroups = vals.reduce((accumulated, entry, i) => {
					//add the value: //eg: {images:[..]}
					accumulated.push(entry[1]);

					return accumulated;
				}, []);

				const flattened = allItemGroups.flat();
				// allItemGroups = flattened;

				const allItems = flattened.map((item, i) => {
					return [item.label, item];
				});

				//e.g: ["fruits", {label: "clementine", _id, images}, ]
			}

			dispatch({
				type: "setDisplayedItems",
				payload: {
					items: allItems,
					displayedItemType: _displayedItemType,
				},
			});
		} catch (err) {
			loggError(err);
			return [];
		}
	};

	useEffect(() => {
		loadImageGroups({ collectionName: "all", category });

		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {
		// const itemsAreTheSame =
		// 	VocabularyState.displayedItems ===
		// 	refs.current.VocabularyState.displayedItems;
		// logg("items are the same: ", itemsAreTheSame);
		refs.current.VocabularyState = VocabularyState;
		const _sub = VocabularyState.displayedSubItems;
	}, [VocabularyState]);

	const {
		displayedItemType,
		category, // e.g.: foods
		// subcategory, //e.g. "fruits"
		itemGroups, // e.g.: all fruit objects
		itemGroup, //e.g.: all apple images
		item, //e.g. a specific apple image
		displayedItems,
		displayedSubItems,
		selected,
	} = VocabularyState;

	const actionBtns = [
		{
			name: "goIn",
			label: "Show",
			disabled: () => {
				const { displayedItemType } = refs.current.VocabularyState;
				return displayedItemType === "item";
			},
		},
	];

	/*["subcategory", "itemGroup"].includes(displayedItemType)
				? "Show"
				: "Go Back",*/

	const handleNavClick = (ev, navBtnName) => {
		if (navBtnName === "back") {
			if (displayedItemType === "item") {
				//go back to displaying itemGroups (e.g. carrots, tomatoes...)

				VocabularyState.displayedItemType = "itemGroup";
				dispatch({
					type: "setDisplayedItems",
					payload: { displayedItemType: "itemGroup" },
				});
				return;
			}
			if (displayedItemType === "itemGroup") {
				//go back to displaying subcategories (e.g. fruits, vegetables...)

				VocabularyState.displayedItemType = "subcategory";
				dispatch({
					type: "setDisplayedItems",
					payload: { displayedItemType: "subcategory" },
				});
				return;
			}
		}
	};

	const handleLiClick = (ev, config = {}) => {
		const { index, selected } = config;

		//simply select the item
		dispatch({ type: "setSelected", payload: { selected } });
		return;

		//this should be used elsewhere

		if (!index && index !== 0) {
			// return dispatch({
			// 	type: "setSelected",
			// 	payload: config,
			// });
			return handleClick(config.selected, "goIn");
		}

		const item = refs.current.VocabularyState.displayedItems?.[index];

		//current view is masonary, which uses imageGallery. The handler receives the item's index in the array. Find the item according to it

		const itemData = item[1];
		const label = itemData?.images[0].title ?? (itemData.label || "");

		dispatch({
			type: "setSelected",
			payload: { selected: item },
		});

		handleClick(item, "goIn");
	};

	const handleSelect = (ev) => {
		const { index } = ev;
		const { displayedItems } = refs.current.VocabularyState;
		const selected = displayedItems[index];
		animationFrame = window.requestAnimationFrame((timestamp) => {
			dispatch({ type: "setSelected", payload: { selected } });
		});
	};

	const handleTitleClick = (ev) => {
		const { index } = ev;
		const { title } = refs.current.VocabularyState;
		synthVoice.say(title);
	};
	const handleSubtitleClick = (ev) => {
		const { index } = ev;

		const { selected } = refs.current.VocabularyState;

		synthVoice.say(selected[1].label);
	};

	const handleActionAreaClick = (
		ev,
		item = {},
		actionType = "",
		info = {}
	) => {
		ev.stopPropagation();
		const label = item[1].label;
		debugger;
		synthVoice.say(label);
		// dispatch({
		// 	type: "setSelected",
		// 	payload: { selected: item },
		// });
	};

	const handleLabelClick = (ev, item = {}, actionType = "", info = {}) => {
		const { label } = item;
		synthVoice.say(label);
		// dispatch({
		// 	type: "setSelected",
		// 	payload: { selected: item },
		// });
	};

	const handleClick = (item = [], btnName = "") => {
		const { VocabularyState } = refs.current;
		const { displayedItemType } = VocabularyState;

		if (btnName === "goBack") {
			if (displayedItemType === "item") {
				//go back to displaying itemGroups (e.g. carrots, tomatoes...)

				VocabularyState.displayedItemType = "itemGroup";
				dispatch({
					type: "setDisplayedItems",
					payload: { displayedItemType: "itemGroup" },
				});
				return;
			}
			if (displayedItemType === "itemGroup") {
				//go back to displaying subcategories (e.g. fruits, vegetables...)

				VocabularyState.displayedItemType = "subcategory";
				dispatch({
					type: "setDisplayedItems",
					payload: { displayedItemType: "subcategory" },
				});
				return;
			}
		}

		if (["select"].includes(btnName)) {
			return dispatch({
				type: "setSelected",
				payload: { selected: item },
			});
		}
		if (["goIn", "tile"].includes(btnName)) {
			if (displayedItemType === "subcategory") {
				//display underlying itemGroups (e.g. carrots, tomatoes...)

				const subcategory = item[0];
				const imageGroup = item[1];
				const { label } = imageGroup;
				const { _id } = imageGroup;
				// const items = imageGroup.images.map((image) => {
				// 	return [subcategory, { images: [image], label, _id }];
				// });

				VocabularyState.displayedItemType = "itemGroup";

				dispatch({
					type: "setDisplayedItems",
					payload: { displayedItemType: "itemGroup", subcategory },
				});
			} else if (displayedItemType === "itemGroup") {
				/*
							//shape of items:
							[
								["grapes", {images: [], label, _id}]
							]
							*/
				const label = item[0];
				const imageGroup = item[1];
				const { _id, label: imageGroupLabel } = imageGroup;

				const items = imageGroup.images.map((image) => {
					return [
						label,
						{ images: [image], label: imageGroupLabel, _id },
					];
				});
				VocabularyState.displayedItemType = "item";

				dispatch({
					type: "setDisplayedItems",
					payload: { items, displayedItemType: "item" },
				});
			}
		}
	};

	let pageTitle = "";
	switch (displayedItemType) {
		case "subcategory":
			pageTitle = category;
			break;
		case "itemGroup":
			pageTitle = displayedItems[0]?.[0];
			break;
		case "item":
			pageTitle = itemGroup[0]?.[1]?.label;
			break;
		default:
			//If none of the above is the case..
			break;
	}

	return (
		<VocabularyPage
			items={displayedItems}
			subItems={displayedSubItems}
			selected={selected}
			title={pageTitle}
			displayType={
				displayedItemType === "item" && displayedItems.length > 3
					? "masonary"
					: displayedItemType === "subcategory"
					? "tiles"
					: "flickings"
			}
			itemType={displayedItemType}
			actionBtns={actionBtns}
			onActionAreaClick={handleActionAreaClick}
			onLabelClick={handleLabelClick}
			onClick={handleClick}
			onNavClick={handleNavClick}
			onLiClick={handleLiClick}
			onSelect={handleSelect}
			onTitleClick={handleTitleClick}
			onSubtitleClick={handleSubtitleClick}
			getTitle={(item, i, items) => {
				// if (i === 0) {
				// 	debugger;
				// }
				const { displayedItemType } = refs.current.VocabularyState;

				if (displayedItemType === "subcategory") {
					return item[0];
				}
				if (displayedItemType === "itemGroup") {
					return item[1].label;
				}
				if (displayedItemType === "item") {
					// debugger;
					const label = item?.[1]?.images?.[0]?.title;
					return label;
				}
			}}
		></VocabularyPage>
	);
});

VocabularyIndex.propTypes = {
	rounds: PropTypes.object,
	onCorrect: PropTypes.func,
};

export default VocabularyIndex;
