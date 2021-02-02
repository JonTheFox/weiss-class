// const BASE_PATH = "/api/";
const BASE_PATH = "https://weiss-english-server.herokuapp.com/api/";

const ENDPOINTS = {
	animals: {
		GET: {
			search: {
				path: BASE_PATH + "animals/search",
			},
		},
		POST: {
			getAll: {
				path: BASE_PATH + "animals/getAll",
			},
			updateRow: {
				path: BASE_PATH + "animals/update-row",
			},
		},
		DELETE: {
			animal: {
				path: BASE_PATH + "animals/animal",
			},
		},
		PUT: {
			animal: {
				path: BASE_PATH + "animal",
			},
		},
	},
	users: {
		GET: {},
		POST: {
			getAll: {
				path: BASE_PATH + "users/getAll",
			},
			updateOne: {
				path: BASE_PATH + "users/update-one",
			},

			signup: {
				path: BASE_PATH + "users/signup",
			},
			login: {
				path: BASE_PATH + "users/login",
			},
		},
		DELETE: {
			user: {
				path: BASE_PATH + "users/user",
			},
		},
		PUT: {
			user: {
				path: BASE_PATH + "users/user",
			},
		},
	},
	lyrics: {
		GET: {},
		POST: {
			getAll: {
				path: BASE_PATH + "lyrics/getAll",
			},
			find: {
				path: BASE_PATH + "lyrics/find",
				// path: `https://weiss-english.now.sh/api/lyrics`,
				// path: `http://localhost:3000/api/lyrics`,
			},
			updateRow: {
				path: BASE_PATH + "lyrics/update-row",
			},
			updateAll: {
				path: BASE_PATH + "lyrics/updateAll",
			},
		},
		DELETE: {
			song: {
				path: BASE_PATH + "lyrics/song",
			},
		},
		PUT: {
			song: {
				path: BASE_PATH + "lyrics/song",
			},
		},
	},
	images: {
		GET: {},
		POST: {
			getAll: {
				path: BASE_PATH + "images/getAll",
			},
			updateRow: {
				path: BASE_PATH + "images/update-row",
			},
		},
		DELETE: {
			category: {
				path: BASE_PATH + "images/category",
			},
		},
		PUT: {
			category: {
				path: BASE_PATH + "images/category",
			},
		},
	},
	foods: {
		GET: {},
		POST: {
			getAll: {
				path: BASE_PATH + "foods/getAll",
			},
			updateRow: {
				path: BASE_PATH + "foods/update-row",
			},
			search: {
				path: BASE_PATH + "foods/search",
			},
			add: {
				path: BASE_PATH + "foods/add",
			},
			addByName: {
				path: BASE_PATH + "foods/add/by-name",
			},
		},
		DELETE: {
			one: {
				path: BASE_PATH + "images/one",
			},
		},
		PUT: {
			category: {
				path: BASE_PATH + "images/category",
			},
		},
	},
};

export default ENDPOINTS;
