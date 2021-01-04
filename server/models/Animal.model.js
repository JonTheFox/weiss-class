const mongoose = require("mongoose");

//A schema describes the data shape of a model.
const Schema = mongoose.Schema;

//You can think of a Mongoose Schema as the configuration object for a Mongoose Model.

// A SchemaType is then a configuration object for an individual property (of a Model). A SchemaType says:
// what *type* a given path should have,
// whether it has any getters/setters,
// and what values are valid for that path.

const AnimalImageSchema = new Schema({
	imageId: String,
	animalName: { type: String, lowercase: true, trim: true, required: true },
	description: String,
	width: { type: Number, min: 1, required: true },
	height: { type: Number, min: 1, required: true },
	photographer: {
		first_name: { type: String, default: "(unknown first name)" },
		last_name: { type: String, default: "(unknown last name)" },
		username: { type: String },
		location: { type: String }
	},
	urls: {
		raw: String,
		regular: { type: String, required: true },
		small: { type: String, required: true },
		thumb: String
	},
	updated: { type: Date, default: Date.now() },
	gender: {
		type: String,
		enum: ["male", "female", "unknown", "mixed"]
	},
	numEntities: {
		type: Number
	}
});

//Once you have a model you can use it to query the collection to get all documents (records) stored in it, or to find a particular subset of documents. You can also use the model to create, update, and delete records.

//Note:
// a Model (e.g.: "Animal") represents a *collection* of documents in the database (e.g.: dog, cat, lion..),
// while a Model instance represents an individual *document* (e.g.: dog) in the collection.
const AnimalImageModel = mongoose.model("AnimalImage", AnimalImageSchema);
AnimalImageModel.type = "AnimalImage";

const AnimalSchema = new Schema({
	animalName: {
		type: String,
		lowercase: true,
		trim: true,
		required: true
	},
	//a MongoDB document array
	images: { type: [AnimalImageSchema], default: [] }
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
AnimalSchema.methods.getAllImages = function() {
	//inside a Model instance, `this` correctly points to that instance, i.e: a particular AnimalImage record
	return this.images || [];
};

const AnimalModel = mongoose.model("Animal", AnimalSchema);
//my own custom lil' addition:)
AnimalModel.type = "Animal";

//we export the Models themselves. If we want to query the collection, importing the Models will do. If we want to perform some other CRUD (create, update or delete) operation, we'll then need to also instantiate the relevant Model, and word with a specific document (record) in the Model.
module.exports = {
	AnimalImageModel,
	AnimalModel,
	AnimalSchema,
	AnimalImageSchema
};
