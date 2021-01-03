import Logger from "../../../lib/logg.js";
import { is, pickRandomFrom } from "../../../lib/issy/index.js";

const label = "VocabularyReducer";
const { logg, loggError } = new Logger({ label });

const DEFAULT_INITIAL_STATE = {
	// items: [],
	category: "foods",
	subcategory: "",
	subcategories: [],
	itemGroups: [],
	item: {},
	displayedItemType: "subcategory",
	displayedSubItemsType: "itemGroup",
	displayedItems: [],
	displayedSubItems: [],
	displayedItem: {},
	selected: {},
	title: "",
};

/*displayedItemType options: 

caterogry (e.g.: "foods", "animals")
subcategory (e.g.: "vegetables", "fruits")
itemGroup (e.g. "cucumber", "tomato")
item (e.g. "pile of cucumbers", "one cucumber")

*/

const initReducer = (config = {}) => {
	if (!is(config).anObject) {
		logg("config should be an object!");
		return null;
	}
	const initialState = { ...DEFAULT_INITIAL_STATE, ...config };

	logg("initial state (default + config): ", initialState);
	return initialState;
};

const VocabularyReducer = (state, action) => {
	const { itemGroups, subcategories } = state;
	const newState = { ...state };

	const { type, payload } = action;

	if (!payload || payload === -1) {
		//state will remain the same, though as a new object which might trigger re-renders
		return newState;
	}

	switch (type) {
		case "setItems":
			//pull relevant data from the payload
			const { items: newItems, itemGroups } = payload;

			//update the new state
			Object.assign(newState, {
				items: newItems,
			});

			//the new state will be returned after the switch statement
			break;

		case "setCategories":
			//pull relevant data from the payload
			const { categories: newCategories } = payload;

			//update the new state
			Object.assign(newState, {
				categories: newCategories,
			});

			//the new state will be returned after the switch statement
			break;

		case "setDisplayedItemType":
			//pull relevant data from the payload
			const { displayedItemType: newDisplayedItemType } = payload;

			const __state = newState;

			let newSubItems;

			switch (displayedItemType) {
				case "subcategory":
					newSubItems = __state.itemGroups || [];

					break;
				case "itemGroup":
					newSubItems = __state.items || [];
					break;
				case "item":
					// newSubItems = __state.items || [];
					break;
				default:
					//If none of the above is the case..
					break;
			}

			//update the new state
			Object.assign(newState, {
				displayedItemType: newDisplayedItemType,
			});

			debugger;
			break;

		case "setItemGroups":
			//pull relevant data from the payload
			const { itemGroups: newItemGroups } = payload;

			//update the new state
			Object.assign(newState, {
				itemGroups: newItemGroups,
			});

			//the new state will be returned after the switch statement
			break;

		case "setDisplayedItems":
			//pull relevant data from the payload
			const { items, displayedItemType } = payload;

			//sometimes the items are set in this action excplicitly
			if (items) {
				newState.displayedItems = items;
			}

			//the items can also be set implicitly, i.e. deferred from the the displayedItemType that was passed.
			//e.g: when displayedItemType === "item",
			//the displayedItems will be set to the itemGroups that are stored in the state.
			// when displayedItemType === "imageGroup",
			//the displayedItems will be set to the subcategories that are stored in the state.

			if (displayedItemType) {
				newState.displayedItemType = displayedItemType;
				if (displayedItemType === "subcategory") {
					newState.title = newState.category;
					//use newly passed subcategories, or fallback to the existing ones in the state
					const _items = items || subcategories;
					newState.subcategories = _items;

					const _displayedItems = _items
						.map((subcategory, i) => {
							// if (i === 0) {
							// 	debugger;
							// }
							const rand = pickRandomFrom(subcategory[1]);
							return [subcategory[0], rand];
						})
						.sort();

					newState.displayedItems = _displayedItems;
				}

				if (displayedItemType === "itemGroup") {
					if (payload.subcategory) {
						const subcategory = subcategories.find(
							(subcat) => subcat[0] === payload.subcategory
						);
						const _items = subcategory
							? subcategory
							: items || newState.itemGroups;
						//make them fit the right object shape
						const __items = _items[1].map((ite, j) => {
							return [payload.subcategory, ite];
						});
						const sortedItems = __items.sort((a, b) => {
							return a[1].label.localeCompare(b[1].label);
						});

						newState.itemGroups = __items;
						newState.displayedItems = __items;
						const selected = __items[0];
						newState.selected = selected;
						// newState.displayedSubItems = selected;

						const _displayedSubItems = selected[1];
						_displayedSubItems.parentLabel = selected[0];

						newState.displayedSubItems = _displayedSubItems;

						// newState.subTitle = displayedSubItems.label;

						newState.title = __items[0][0];

						break;
					}

					newState.displayedItems = newState.itemGroups;
				}

				if (displayedItemType === "item") {
					if (!items) {
						debugger;
						newState.displayedItems = newState.itemGroups;
						break;
					}

					newState.itemGroup = items;
				}
			}
			break;

		case "goBack":
			//pull relevant data from the payload
			// const { items, displayedItemType } = payload;

			// const { displayedItemType } = newState;

			debugger;

			if (newState.displayedItemType === "subcategory") {
				// newState.displayedItemType = "category";
				// const _items = subcategories;
				// newState.subcategories = _items;

				// const _displayedItems = _items.map((subcategory, i) => {
				// 	// if (i === 0) {
				// 	// 	debugger;
				// 	// }
				// 	debugger;
				// 	const rand = pickRandomFrom(subcategory[1]);
				// 	return [subcategory[0], rand];
				// });

				// newState.displayedItems = _displayedItems;
				// debugger;
				debugger;
				//displaying categories is not implemented yet
				return newState;
			}
			if (newState.displayedItemType === "itemGroup") {
				const _items = newState.subcategories;
				// newState.subcategories = _items;
				const _displayedItems = _items.map((subcategory, i) => {
					// if (i === 0) {
					// 	debugger;
					// }
					const rand = pickRandomFrom(subcategory[1]);
					return [subcategory[0], rand];
				});

				newState.displayedItems = _displayedItems;
				newState.displayedItemType = "subcategory";

				debugger;
				return newState;
			}

			if (newState.displayedItemType === "item") {
				debugger;
				newState.displayedItemType = "itemGroup";
				newState.displayedItems = itemGroups;
				//shouldnt be dispatched. item is the lowest level
				return newState;
			}

			break;

		case "setSelected":
			//pull relevant data from the payload
			const { selected } = payload;
			newState.selected = selected;

			//set subitems of selected item
			let displayedSubItems;

			switch (newState.displayedItemType) {
				case "subcategory":
					//when showing subcategories (e.g. fruits, vegetables, etc), we can click-select a specific subcategory.
					//click-selecting a subcategory (e.g. fruits) will set the displayedSubItems to be the various fruit itemGroups (e.g. banana, apple..)

					const subcategoryLabel = selected[0];

					const subcategory = subcategories.find(
						(subcat) => subcat[0] === subcategoryLabel
					);

					newState.displayedSubItemsType = subcategory[0]; //e.g. "fruits";
					displayedSubItems = subcategory[1]; //e.g. [apple, banana...]

					break;
				case "itemGroup":
					//when showing itemGroups (e.g. banana, apple...), clicking on an itemGroup (e.g. banana) will set the displayedSubItem to be the various items (e.g. the various banana image objects)

					displayedSubItems = selected[1];
					displayedSubItems.parentLabel = selected[0];
					newState.subTitle = displayedSubItems.label;

					break;
				case "item":
					break;
				default:
					//If none of the above is the case..
					break;
			}

			newState.displayedSubItems = displayedSubItems;

			break;

		case "goNext":
			//pull relevant data from the payload
			const _selected = newState.selected;

			debugger;
			break;

		default:
			return newState; //actually unchanged, but still a newly created object
	}

	return newState;
};

export { DEFAULT_INITIAL_STATE, initReducer }; // initReducer should be passed as a the 2nd (and optionally 3rd, after a config object) argument(s) for useReducer
export default VocabularyReducer;
