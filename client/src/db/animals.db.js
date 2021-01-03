import React from "react";
import ENDPOINTS from "../AJAX/ajax-endpoints.js";

const animalsDB = {
	name: "animals",
	title: "Animals",
	uris: {
		getAll: ENDPOINTS.animals.POST.getAll.path,
		updateRow: ENDPOINTS.animals.POST.updateRow.path,
		deleteRecord: ENDPOINTS.animals.DELETE.animal.path
	},
	columns: [
		{ field: "animalName", title: "animal" },
		{ field: "num_images", title: "#images" },
		{ field: "primary_image", title: "primary image" }
	],

	// animalName images
	extraColumns: [
		{ field: "num_images", title: "#images", startIndex: 1 },
		{ field: "primary_image", title: "primary image", startIndex: 2 }
	],
	augmentColumns: {
		animalName: { title: "animal", startIndex: 0 }
	},
	augmentRecord: record => {
		record.name = record.animalName; //e.g.: dog
		record.num_images = record.images.length || 0;
		record.primary_image = record.images[0].urls.small;
		return record;
	},
	renderColumns: {
		primary_image: rowData => (
			<img src={rowData.primary_image} alt="" className="image-cell" />
		)
	},
	addStylesToColumns: { primary_image: { padding: 0 } },
	ignoredFields: ["name"]
};

export default animalsDB;
