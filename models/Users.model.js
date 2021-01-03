const mongoose = require("mongoose");

const { logg } = global;

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

const validateEmail = function(email) {
	var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return regex.test(email);
};

const SUPPORTED_ROLES = ["user", "admin"];
const SUPPORTED_CLIENT_TYPES = ["student", "teacher", "platform"];

const passwordRequirements =
	"Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter and a digit.";
const validatePassword = function(password) {
	var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
	return regex.test(password);
};

const UserSchema = new Schema({
	first_name: {
		type: String,
		lowercase: true,
		trim: true,
		required: true
	},
	last_name: {
		type: String,
		lowercase: true,
		trim: true,
		required: true
	},
	middle_name: {
		type: String,
		lowercase: true,
		trim: true,
		default: ""
	},
	role: {
		type: String,
		enum: SUPPORTED_ROLES,
		default: SUPPORTED_ROLES[0],
		required: true,
		lowercase: true
	},
	client_type: {
		type: String,
		enum: SUPPORTED_CLIENT_TYPES,
		default: SUPPORTED_CLIENT_TYPES[0],
		required: true,
		lowercase: true,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
		validate: [validateEmail, "Please fill a valid email address"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address"
		]
	},
	gender: {
		type: String,
		enum: ["male", "female", "fluid", "transgender"],
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true,
		validate: [validatePassword, passwordRequirements]
	},

	bday: {
		type: Date,
		required: true
	},
	street_name: {
		type: String,
		lowercase: true,
		trim: true,
		required: true
	},
	street_number: {
		type: Number,
		min: 1,
		max: 2000,
		lowercase: true,
		trim: true,
		required: true
	},
	city: {
		type: String,
		lowercase: true,
		trim: true,
		required: true
	},
	state: {
		type: String,
		lowercase: true,
		trim: true,
		required: false
	},
	country: {
		type: String,
		trim: true,
		required: true
	},
	friends: {
		type: Array
	},

	updated: { type: Date, default: Date.now() }
});

// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// UserSchema.methods.getColumns = function() {
// 	//inside a Model instance, `this` correctly points to that instance, i.e: a particular AnimalImage record
// 	const columns = Object.keys(UserSchema.tree);
// 	global.logg("this.tree keys: ", columns);
// 	return columns;
// };

class UserClass {
	static findByEmail(email) {
		return this.findOne({ email });
	}
}

// `schema` will now have a `findByEmail()` static
UserSchema.loadClass(UserClass);

//static Model method. Will be availabe via UserModel.doSomething
// UserSchema.statics.getFields = function() {
// 	const fieldNames = Object.keys(UserSchema.tree);
// 	logg("fields: ", fieldNames);
// 	return fieldNames;
// };

const UsersModel = mongoose.model("User", UserSchema);
//my own custom lil' addition:)
UsersModel.type = "User";

//we export the Models themselves. If we want to query the collection, importing the Models will do. If we want to perform some other CRUD (create, update or delete) operation, we'll then need to also instantiate the relevant Model, and word with a specific document (record) in the Model.
module.exports = { UsersModel, UserSchema };
