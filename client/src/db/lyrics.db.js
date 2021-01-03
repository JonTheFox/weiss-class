import ENDPOINTS from "../AJAX/ajax-endpoints.js";

const lyricsDB = {
	name: "lyrics",
	title: "Lyrics",
	uris: {
		getAll: ENDPOINTS.lyrics.POST.getAll.path,
		updateRow: ENDPOINTS.lyrics.POST.updateRow.path,
		updateAll: ENDPOINTS.lyrics.POST.updateAll.path,
		deleteRecord: ENDPOINTS.lyrics.DELETE.song.path
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
	ignoredFields: ["lyrics", "images", "tags"],
	extraColumns: [
		{ title: "first line", field: "first_line", startIndex: 2 },
		{ title: "Tags", field: "tags_asString", startIndex: 3 }
	],
	augmentRecord: song => {
		song.name = song.artist + " - " + song.title;
		song.first_line = song.lyrics[0].lines[0];
		song.tags_asString = song.tags.join(", ");
	},
	addStylesToColumns: {
		title: { minWidth: "12rem" },
		artist: { minWidth: "10rem" },
		first_line: { minWidth: "20rem" },
		_id: { minWidth: "20rem" }
	}
};

export default lyricsDB;
