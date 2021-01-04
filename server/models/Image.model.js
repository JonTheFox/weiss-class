const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	imageId: String,
	name: { type: String, lowercase: true, trim: true, required: true },
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
	numEntities: {
		type: Number
	}
});

const ImageModel = mongoose.model("Image", ImageSchema);
ImageModel.type = "Image";

module.exports = {
	ImageModel,
	ImageSchema
};
