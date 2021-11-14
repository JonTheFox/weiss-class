// import { request } from "http";
import { storage } from "../firebase/firebase.js";
import Logger from "../lib/logg";
import issy, { request } from "../lib/issy/index.js";
const logger = new Logger({ label: "uploadImage service" });
const { logg, loggError } = logger;

export const upload = ({ file, path, storageRef }) => {
  return new Promise((resolve, reject) => {
    try {
      if (file === "") {
        const errMsg = `received an empyy string`;
        loggError(errMsg);
        return reject(errMsg);
      }
      const uploadTask = storage.ref(path).put(file);

      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //takes a snap shot of the process as it is happening
        },
        (err) => {
          debugger;
          logg(err);
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url
          storage
            .ref(storageRef || "images")
            .child(file.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              return resolve({ url: fireBaseUrl, file, path, storageRef });
            });
        }
      );
    } catch (error) {
      loggError("Failed to upload. ", error);
      return reject("Failed to upload", error);
    }
  });
};

export const uploadImage = async ({ path, image }) => {
  const storageRef = "/";
  const storagePath = `/${storageRef}/${image.name}`;
  return upload({ file: image, path: storagePath, storageRef });
};

export const uploadImageData = async ({ title, id }) => {
  let errMsg;
  try {
    //connect to db
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const ajaxResult = await request(
      "POST",
      "/api/images/uploadImageData",
      { title, id },
      headers
    );

    //  const ajaxResult = await fetch(

    //  "/api/images/uploadImageData",
    //  {method: "POST"}
    //  { url, name, title },
    //  {
    //    headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers":
    //        "Origin, X-Requested-With, Content-Type, Accept",
    //    },
    //  }
    //  );

    // const ajaxResult = await request(
    //   "POST",
    //   "/api/images/uploadImageData",
    //   { url, name, title },
    //   {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Headers":
    //         "Origin, X-Requested-With, Content-Type, Accept",
    //     },
    //   }
    // );

    console.log("ajaxResult: ", ajaxResult);
    debugger;
  } catch (error) {
    debugger;
    console.log("Could not upload file. ", error);
  }
};
