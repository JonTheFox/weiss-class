const express = require("express");
const mongoose = require("mongoose");

const { logger, is, request, getRandomUpTo } = global;

const label = "imagesAPI";

const { logg, loggError } = logger.createSubLogger({
  label,
  style: "darkBlue",
});

// const { authenticatedUsers, USER_SERVER_URL } = global;
const router = express.Router();

// const mongoose = new Mongoose({
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  id: {
    type: String,
    trim: true,
    required: false,
    unique: false,
  },
  title: { type: String, lowercase: false, trim: true, required: true },
  description: { type: String, trim: true, required: false },
  tags: {
    //e.g. ["surf", "beach"]
    type: Array,
    required: false,
    default: [],
  },
  width: { type: Number, min: 1, required: false },
  height: { type: Number, min: 1, required: false },
  url: {
    required: true,
    type: String,
    unique: true,
  },
});

const modelName = "Image";
const ImageModel = mongoose.model(modelName, ImageSchema);
const DB_NAME = "paintings1";
const COLLECTION_NAME = "1";
const URI = process.env.MONGODB_URI_PAINTINGS;

const saveImageUrl = async ({ url, id, title }) => {
  let errMsg;
  try {
    //connect to db
    console.log("Connecting to db...");
    console.log("URI: ", URI);

    const isConnected = mongoose.connect(URI, {
      dbName: DB_NAME,
    });
    isConnected.catch((err) => {
      // handle connection errors
      errMsg = err.message;
      loggError(
        `Connection to ${DB_NAME} could not be established. Reason: ${errMsg}`
      );
      throw new Error(errMsg);
    });
    await isConnected;
    logg(`Connected to ${DB_NAME} DB. `);

    const ImageModel = mongoose.model(modelName, ImageSchema);
    const mongooseConnection = mongoose.connection;
    // const collection = await mongooseConnection.db.collection(COLLECTION_NAME);
    const imageRecord = new ImageModel({ url, title, id });
    const { _id, tags } = await imageRecord.save();
    console.log("Saved image: ", { title, url, tags, _id });
    return { title, url, tags, _id, id };
  } catch (error) {
    loggError("Could not upload file. ", error);
    return error;
  }
};

router.post("/uploadImageData", async (req, res, next) => {
  try {
    const { url, title, id } = req.body;
    const result = await saveImageUrl({ url, title, id });
    return res.send(result);
  } catch (err) {
    loggError(err);
    return res.send({ error: err.message });
  }
});

module.exports = router;
