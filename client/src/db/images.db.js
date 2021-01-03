// import React from "react";
import ENDPOINTS from "../AJAX/ajax-endpoints.js";

const imagesDB = {
	name: "images",
	title: "Images",
	uris: {
		getAll: ENDPOINTS.images.POST.getAll.path,
		updateRow: ENDPOINTS.images.POST.updateRow.path,
		deleteRecord: ENDPOINTS.images.DELETE.category.path
	},
	// columns: [
	// 	{ title: "Title", field: "title" },
	// 	{ title: "Artist", field: "artist" },
	// 	{ title: "First Line", field: "firstLine" }, //deferred from item.lyrics
	// 	{ title: "Written By", field: "written_by" },
	// 	{ title: "Producer", field: "producer" },
	// 	{ title: "Label", field: "label" },
	// 	{ title: "Is Cover", field: "is_cover" },
	// 	{ title: "Original Performer", field: "original_performer" },
	// 	{ title: "Images", field: "images" },
	// 	{ title: "Lang", field: "lang" }
	// ],
	// extraColumns: [{ title: "first line", field: "first_line", startIndex: 2 }],
	// augmentRecord: song => {
	// 	song.name = song.artist + " - " + song.title;
	// 	song.first_line = song.lyrics[0].lines[0];
	// },
	// addStylesToColumns: {
	// 	title: { minWidth: "12rem" },
	// 	artist: { minWidth: "10rem" },
	// 	first_line: { minWidth: "20rem" },
	// 	_id: { minWidth: "20rem" }
	// },
	addRecord: ENDPOINTS.images.PUT.category.path
};

export default imagesDB;
