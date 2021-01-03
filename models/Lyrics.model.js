const mongoose = require("mongoose");

//A schema describes the data shape of a model.
const Schema = mongoose.Schema;

//You can think of a Mongoose Schema as the configuration object for a Mongoose Model.

// A SchemaType is then a configuration object for an individual property (of a Model). A SchemaType says:
// what *type* a given path should have,
// whether it has any getters/setters,
// and what values are valid for that path.

//Once you have a model you can use it to query the collection to get all documents (records) stored in it, or to find a particular subset of documents. You can also use the model to create, update, and delete records.

//Note:
// a Model (e.g.: "Animals") represents a *collection* of documents in the database (e.g.: dog, cat, lion..),
// An instance of a Model represents an individual *document* (e.g.: dog) in the collection.

const SUPPORTED_LANGS = ["en", "he"];

//for each individual stanza (verse/chorus/bridge, etc.) in a song
const StanzaSchema = new Schema({
	lines: {
		type: [Object],
		required: true
	},
	partType: {
		type: String,
		enum: [
			"intro",
			"verse",
			"pre-chorus",
			"pre-chorus-2",
			"chorus",
			"chorus-2",
			"interlude",
			"interlude-2",
			"bridge",
			"bridge-2",
			"outro",
			"outro-2",
			"outro-3"
		],
		default: "verse"
	},
	indexInType: {
		type: Number,
		min: 1,
		max: 100
	},
	segmentIndex: {
		//e.g. if a verse is devided into 2 parts for display purposes
		type: Number,
		min: 1,
		max: 50
	},

	updated: { type: Date, default: Date.now() }
});
// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// StanzaSchema.methods.getAllImages = function() {
// 	//inside a Model instance, `this` correctly points to that instance, i.e: a particular AnimalImage record
// 	return this.images || [];
// };

const StanzaModel = mongoose.model("Stanza", StanzaSchema);
StanzaModel.type = "Stanza";

//for an entire song
const SongSchema = new Schema({
	title: { type: String, required: true }, //Heading Case Only
	artist: { type: String, required: true }, //Ditto
	written_by: { type: String },
	producer: { type: String },
	label: { type: String },
	is_cover: { type: Boolean },
	original_performer: { type: String },
	images: { type: [String] },
	lyrics: {
		//a MongoDB document array
		type: [StanzaSchema],
		basicType: "array",
		required: true,
		default: []
	},
	lang: {
		type: String,
		enum: SUPPORTED_LANGS,
		default: SUPPORTED_LANGS[0]
	},
	tags: {
		//e.g. "Present Simple"
		type: Array,
		required: true,
		default: []
	}
});
// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// StanzaSchema.methods.getAllImages = function() {
// 	//inside a Model instance, `this` correctly points to that instance, i.e: a particular AnimalImage record
// 	return this.images || [];
// };
const SongModel = mongoose.model("Song", SongSchema);
SongModel.type = "Song";

//we export the Models themselves. If we want to query the collection, importing the Models will do. If we want to perform some other CRUD (create, update or delete) operation, we'll then need to also instantiate the relevant Model, and word with a specific document (record) in the Model.
module.exports = { StanzaSchema, StanzaModel, SongSchema, SongModel };
