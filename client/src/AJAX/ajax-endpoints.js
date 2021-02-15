// const USER_SERVER_URL = "/api/";

// const USER_SERVER_URL = "https://weiss-english-server.herokuapp.com/api/";
// const USER_SERVER_URL = "https://weiss-server-a0b22.web.app/api/";
const USER_SERVER_URL = "https://weiss-server.web.app/api/";
// const USER_SERVER_URL = "http://localhost:5001/api/";

// const DOMESTIC_SERVER_URL = "https://weiss-class.herokuapp.com/api/";
const DOMESTIC_SERVER_URL = "https://weiss-class.web.app/api/"; // Firebase hosting
// const DOMESTIC_SERVER_URL = "https://localhost:3000/api/";
//
//
export { USER_SERVER_URL };

const ENDPOINTS = {
	animals: {
		GET: {
			search: {
				path: USER_SERVER_URL + "animals/search",
			},
		},
		POST: {
			getAll: {
				path: USER_SERVER_URL + "animals/getAll",
			},
			updateRow: {
				path: USER_SERVER_URL + "animals/update-row",
			},
		},
		DELETE: {
			animal: {
				path: USER_SERVER_URL + "animals/animal",
			},
		},
		PUT: {
			animal: {
				path: USER_SERVER_URL + "animal",
			},
		},
	},
	users: {
		GET: {},
		POST: {
			getAll: {
				path: USER_SERVER_URL + "users/getAll",
			},
			updateOne: {
				path: USER_SERVER_URL + "users/update-one",
			},

			signup: {
				path: USER_SERVER_URL + "users/signup",
			},
			login: {
				path: USER_SERVER_URL + "users/login",
			},
		},
		DELETE: {
			user: {
				path: USER_SERVER_URL + "users/user",
			},
		},
		PUT: {
			user: {
				path: USER_SERVER_URL + "users/user",
			},
		},
	},
	lyrics: {
		GET: {},
		POST: {
			getAll: {
				path: USER_SERVER_URL + "lyrics/getAll",
			},
			find: {
				path: USER_SERVER_URL + "lyrics/find",
				// path: `https://weiss-english.now.sh/api/lyrics`,
				// path: `http://localhost:3000/api/lyrics`,
			},
			updateRow: {
				path: USER_SERVER_URL + "lyrics/update-row",
			},
			updateAll: {
				path: USER_SERVER_URL + "lyrics/updateAll",
			},
		},
		DELETE: {
			song: {
				path: USER_SERVER_URL + "lyrics/song",
			},
		},
		PUT: {
			song: {
				path: USER_SERVER_URL + "lyrics/song",
			},
		},
	},
	images: {
		GET: {},
		POST: {
			getAll: {
				path: USER_SERVER_URL + "images/getAll",
			},
			updateRow: {
				path: USER_SERVER_URL + "images/update-row",
			},
		},
		DELETE: {
			category: {
				path: USER_SERVER_URL + "images/category",
			},
		},
		PUT: {
			category: {
				path: USER_SERVER_URL + "images/category",
			},
		},
	},
	foods: {
		GET: {},
		POST: {
			getAll: {
				path: USER_SERVER_URL + "foods/getAll",
			},
			updateRow: {
				path: USER_SERVER_URL + "foods/update-row",
			},
			search: {
				path: USER_SERVER_URL + "foods/search",
			},
			add: {
				path: USER_SERVER_URL + "foods/add",
			},
			addByName: {
				path: USER_SERVER_URL + "foods/add/by-name",
			},
		},
		DELETE: {
			one: {
				path: USER_SERVER_URL + "images/one",
			},
		},
		PUT: {
			category: {
				path: USER_SERVER_URL + "images/category",
			},
		},
	},
	ninjaCode: {
		POST: {
			ninjaCodeUser: {
				path: USER_SERVER_URL + "ninjaCode",
			},
			ninjaCodeDomestic: {
				path: DOMESTIC_SERVER_URL + "ninjaCode",
			},
		},
	},
	userImages: {
		POST: {
			uploadOne: { path: USER_SERVER_URL + "userImages/uploadOne" },
		},
	},
};

export default ENDPOINTS;
