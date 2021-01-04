// LOAD ENCRYPT LIBRARY
const CryptoJS = require("crypto-js");
const { logg, loggError, is } = global;

// ENCRYPTION KEY
const KEY = process.env.AL_PAY_TO_DIE; //salt
const ENCODING = "Utf8";

const encrypt = str => {
	const encrypted = CryptoJS.AES.encrypt(str, KEY).toString();
	return encrypted;
};

const decrypt = cipherStr => {
	const decrypted = CryptoJS.AES.decrypt(cipherStr, KEY).toString(
		CryptoJS.enc[ENCODING]
	);
	return decrypted;
};

module.exports = { encrypt, decrypt };
