const mongoose = require("mongoose");
const { ImageSchema } = require("./Image.model.js");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name: { type: String, lowercase: true, trim: true, required: true },
	keywords: { type: Array, default: [] },
	updated: { type: Date, default: Date.now() },
	//a MongoDB document array
	images: { type: [ImageSchema], default: [] }
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
CategorySchema.methods.getAllImages = function() {
	//inside a Model instance, `this` correctly points to that instance, i.e: a particular AnimalImage record
	return this.images || [];
};

const CategoryModel = mongoose.model("Category", CategorySchema);
//my own custom lil' addition:)
CategoryModel.type = "Category";

module.exports = {
	CategorySchema,
	CategoryModel
};
