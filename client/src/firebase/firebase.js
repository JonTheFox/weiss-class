import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
	//apiKey: "super secret keys.....asgvegxgevergfvr",
	//authDomain: "tallans-imageupload-tutorial.firebaseapp.com",
	//databaseURL: "https://tallans-imageupload-tutorial.firebaseio.com",
	// storageBucket: "tallans-imageupload-tutorial.appspot.com",
	messagingSenderId: "super secret keys.....asgvegxgevergfvr",
	measurementId: "super secret as;dlkfjal;dskjf",

	appId: "1:165508430741:web:23c00812a4ed477ef9d49c",
	projectId: "weiss-server-a0b22",
	serverKey:
		"AAAAJokSO5U:APA91bGxgVt3UETv3R3wtoOyWsfyHuV-PDxadN9yUw-ubieBoi6l-DDQhXB7y-qOKqR3Fm6HePt1AUokMOoWdiwrTF3pzaUezqEFAKEky1645pKHpx9KwyCLLRJq2W-9shanMWizzFAu",
	senderId: "165508430741",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage = firebase.storage();

export { storage, firebase as default };
