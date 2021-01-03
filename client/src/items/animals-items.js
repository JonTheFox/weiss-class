import ANIMALS from "../items/animals.js";

const createItem = ({ originalForm = {}, animalName = "horse" }) => {
	return {
		...originalForm,
		name: animalName
	};
};

const createItems = (maxItems = 80, logg) => {
	const items = [];
	let i = 0;

	for (let animalName in ANIMALS) {
		if (ANIMALS.hasOwnProperty(animalName)) {
			const originalForm = ANIMALS[animalName];
			const item = createItem({ originalForm, animalName });
			items.push(item);
			i++;
		}
		if (i >= maxItems) break;
	}
	if (items.length < maxItems) {
		logg &&
			logg("Animals")(
				`You asked for ${maxItems} items, however there were only ${items.length} available.`
			);
	}

	return items;
};

const items = createItems(80);

const addItem = (item = {}) => {
	if (!item) {
		console.warn("animals-items: addItem() : No item provided!");
		return null;
	}
	items.push(item);
	return true;
};

const animals = { items, addItem };
export default animals;
