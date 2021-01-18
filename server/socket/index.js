const label = "socketIO";
const {
	logger,
	request,
	sanitizeVarName,
	getRandomUpTo,
	is,
	getUniqueString,
} = global;
// const { logg, loggError } = logger.createSubLogger(label, "kettem");
const authenticate = require("../api/auth.js");
const classroomLogger = logger.createSubLogger({ label, style: "orange" });
const { logg, loggError } = classroomLogger;

const MOCK_CLASSROOMS = require("../mockData/mockClassrooms.js");

const USER_TYPES = ["student", "teacher", "platform"];

const assertValidCredentials = (creds = {}) => {
	if (!creds)
		throw new Error(`assertValidCredentials: No credentials provided`);
	const requiredCredentials = [
		"email",
		"password",
		"first_name",
		"last_name",
		//"clientId",
	];

	requiredCredentials.forEach((cred) => {
		if (!creds[cred]) {
			throw new Error(`Invalid credentials. Missing parameter "${cred}"`);
		}
	});
	return true;
};

const isClient = (user) => {
	if (!is(user).anObject) return false;
	const { first_name, last_name, email } = user;
	return first_name && last_name && email;
};

class ClassroomClient {
	clientId;
	email;
	first_name;
	last_name;
	roomKey;
	img = {};
	constructor(config = {}) {
		const {
			email,
			first_name,
			last_name,
			clientId,
			userTypes,
			roomKey,
			img,
		} = config;
		if (!email || !first_name || !last_name)
			throw new Error("Invalid user credentials");

		const _userTypes =
			userTypes &&
			userTypes.length &&
			userTypes.map((userType) => userType.toLowerCase());

		Object.assign(this, {
			email,
			first_name,
			last_name,
			clientId,
			userTypes: _userTypes,
			roomKey,
			img,
		});
	}
	getInfo = () => {
		const { clientId, email, first_name, last_name, roomKey } = this;
		return { clientId, email, first_name, last_name, roomKey };
	};
	getFullName = () => {
		const result = `${this.first_name} ${this.last_name}`;
		return result;
	};
}

class Teacher extends ClassroomClient {
	constructor(config = {}) {
		super(config);
	}
}
class Student extends ClassroomClient {
	constructor(config = {}) {
		super(config);
		this.role = "student";
		this.clientType = "student";
	}
}
class Platform extends ClassroomClient {
	constructor(config = {}) {
		super(config);
		this.role = "platform";
		this.clientType = "platform";
	}
}

class ClassroomClientList {
	clients = [];
	constructor(config = {}) {
		const { clientType, clients = [], roomKey } = config;
		if (!clientType) throw new Error(`No client type provided`);
		this.clientType = clientType;
		//passed clients are Plain ol' JS objects. convert them to dedicated type
		this.clients = clients.map((basicClient, i) => {
			return new ClassroomClient(basicClient);
		});
		this.roomKey = roomKey;
	}
	getInfo = () => {
		const { clients } = this;
		const clientsInfo = clients.map((client) => {
			if (client.getInfo) {
				const clientInfo = client.getInfo();
				return clientInfo;
			} else {
				loggError("NO client.getInfo()");
			}
			return {};
		});

		return clientsInfo;
	};
	getClientsNames = () => {
		const { clients } = this;
		const clientsNames = clients.map((client) => {
			if (client.getFullName) {
				const clientFullname = client.getFullName();
				return clientFullname;
			} else {
				loggError("NO client.getFullName()");
			}
			return {};
		});

		const concatenatedNames = clientsNames.join(", ");
		return concatenatedNames;
	};
	addClient = (client = {}) => {
		const newClient = new ClassroomClient(client);
		newClient.roomKey = this.roomKey;
		this.clients.push(new ClassroomClient(client));
		logg(
			"classroomClientList.getClientsNames: ",
			this.clients.getClientsNames()
		);
	};
}

const createRoomKey = (str) => {
	const result = str
		? `_${sanitizeVarName(str).toLowerCase()}${getUniqueString(8)}`
		: `_${getUniqueString(10)}`;
	return result;
};

class Classroom {
	roomKey;
	index;
	name;
	title;
	teachers;
	students;
	platforms;
	slides = [];
	img;
	video;
	gif;

	constructor(config = {}) {
		const {
			teachers,
			students,
			platforms,
			title = "",
			index = 1,
			name = "",
			userTypes,
			img = {},
			video = {},
			gif = {},
			slides = [],
		} = config;

		const roomNum = is(index).aNumber
			? index
			: parseInt(`${"0" + getRandomUpTo(999) + getRandomUpTo(999)}`);
		this.index = roomNum;

		const getTeacherFullName = (firstTeacher = {}) => {
			if (!firstTeacher) return null;
			const { first_name, last_name } = firstTeacher;
			//capitalize first letters
			const _first_name =
				first_name[0].toUpperCase() + first_name.slice(1);
			const _last_name =
				last_name &&
				last_name[0] &&
				last_name[0].toUpperCase() + last_name.slice(1);
			return `${_first_name} ${_last_name} Room`;
		};

		const createRoomTitle = (classroomConfig = {}) => {
			const {
				title = "",
				name = "",
				roomKey = "",
				teachers = [],
			} = classroomConfig;
			if (title && is(title).aString) return title;
			if (name && is(name).aString) return name;
			if (roomKey && is(roomKey).aString) return roomKey;

			//name the room after the first teacher, if provided
			const _title = getTeacherFullName(teachers[0]);
			return _title;
		};

		let _title = title && is(title).aString && title;
		const _name = sanitizeVarName(
			name || _title || getTeacherFullName(teachers[0])
		);
		if (!_title) {
			//give a title based on the room name,
			if (_name) {
				_title = _name;
			} else {
				//OR based on the first teacher's name,
				_title = createRoomTitle(config);
				_name = sanitizeVarName(_title);
			}
		}
		this.title = _title;
		this.name = _name;
		this.slides = slides;
		this.img = img;
		const roomKey = createRoomKey(_name);
		this.roomKey = roomKey;

		this.teachers = new ClassroomClientList({
			clients: teachers,
			clientType: "teacher",
			roomKey,
		});
		this.students = new ClassroomClientList({
			clients: students,
			clientType: "student",
			roomKey,
		});
		this.platforms = new ClassroomClientList({
			clients: platforms,
			clientType: "platform",
			roomKey,
		});
	}

	hasTeacher = ({ email } = {}) => {
		let indeedHasTeacher = false;
		try {
			if (!email) {
				throw new Error(
					`Can't find a teacher without its email address`
				);
			}
			const _email = email.toLowerCase();
			const teachers = this.teachers;
			if (!teachers) {
				loggError("no teachers???");
			}
			const teachersInfo = teachers && teachers.getInfo();

			for (let i = 0; i < teachersInfo.length; i++) {
				const teacher = teachersInfo[i];
				if (
					teacher &&
					teacher.email &&
					teacher.email.toLowerCase &&
					teacher.email.toLowerCase() === _email
				) {
					indeedHasTeacher = true;
					break;
				}
			}

			return indeedHasTeacher;
		} catch (err) {
			loggError(err);
		}
	};

	addClient = (client) => {
		if (!isClient(client)) throw new Error(`Invalid client`);
		const {
			first_name,
			last_name,
			email,
			userTypes = ["student"],
			clientId,
		} = client;

		const newClient = new ClassroomClient(client);
		newClient.roomKey = this.roomKey;

		const addedTo = [];
		//client may have more than one userType. For example, he can be both a platform and a user
		userTypes.forEach((userType = "") => {
			this[userType + "s"].addClient(client);
			addedTo.push(userType);
		});
		if (!addedTo.length)
			throw new Error(`Did not add client to any user list!`);
		logg(
			`Classroom "${this.getName()}": User ${first_name} ${last_name} (${email}) was added to the following list(s): ${addedTo.join(
				", "
			)}.`
		);
		logg(
			`Classroom "${this.getName()}": User ${first_name} ${last_name} (${email}): ${
				newClient.roomKey
			}`
		);
		return addedTo;
	};

	getInfo = (exclude = {}) => {
		const {
			teachers,
			students,
			platforms,
			roomKey,
			name,
			title,
			index,
		} = this;

		return {
			teachers,
			students,
			platforms,
			roomKey,
			name,
			title,
			index,
		};
	};
	getName = () => {
		return this.name;
	};
}

class ClassroomManager {
	classrooms = [];
	clients = [];
	addClassroom = (config = {}) => {
		const existingRoomsKeys = this.getRoomsNames() || [];
		const classroom = new Classroom({
			existingRoomsKeys,
			index: this.classrooms.length + 1,
			...config,
		});

		this.classrooms.push(classroom);

		return classroom;
	};
	addClient = (client) => {
		if (!client) return null;
		const classroomClient = new ClassroomClient(client);
		this.clients.push(classroomClient);
		logg("added client ", classroomClient.getFullName());
		return classroomClient;
	};
	get clients() {
		return this.clients;
	}
	getRoom = (config = {}) => {
		const { roomKey = "" } = config;
		if (!roomKey) return null;
		const desiredRoom = this.classrooms.filter((room) => {
			return roomKey === room.key;
		})[0];
		return desiredRoom;
	};
	getRooms = () => {
		logg("getRooms: num rooms: ", this.classrooms.length);
		return this.classrooms;
	};
	getRoomsNames = () => {
		const roomsNames = this.classrooms.map((room) => {
			return room.name;
		});
		return roomsNames;
	};
	getRoomsKeys = () => {
		const roomsKeys = this.classrooms.map((room) => {
			return room.roomKey;
		});
		return roomsKeys;
	};

	getClientById = (clientId) => {
		const allClients = this.clients;
		const foundClient = allClients.find((client) => {
			return client.clientId === clientId;
		});
		return foundClient || null;
		// const clientTypes = ["students", "teachers", "platforms"];

		// const { classrooms } = this;
		// logg("classrooms: ", classrooms);
		// if (!classrooms) throw new Error(`no this.clssrooms??`);
		// for (let i = 0; i < classrooms.length; i++) {
		// 	if (foundClient) break;
		// 	const classroom = classrooms[i];
		// 	for (let i = 0; i < clientTypes; i++) {
		// 		if (foundClient) break;
		// 		const clients = classroom[clientTypes[i]];
		// 		foundClient = clients.find(
		// 			(client) => client.clientId === clientId
		// 		);
		// 	}
		// }
	};

	get numClassrooms() {
		return this.classrooms.length;
	}

	isUniqueKey = (key = "") => {
		if (!key || !is(key).aString) {
			return false;
		}
		const allRoomsKeys = this.classrooms.map((room) => {
			return room.getName();
		});
		return !allRoomsKeys.includes(key);
	};

	getTeacherRoom = ({ email }) => {
		let teacherRoom;
		const { classrooms } = this;
		for (let i = 0; i < classrooms.length; i++) {
			const classroom = classrooms[i];
			if (classroom.hasTeacher({ email })) {
				teacherRoom = classroom;
				break;
			}
		}

		return teacherRoom || null;
	};
	getRoomsInfo = () => {
		const { classrooms } = this;
		const roomsInfo = classrooms.map((room) => {
			return room.getInfo();
		});
		return roomsInfo;
	};

	getRoomsNames = () => {
		return this.classrooms.map((room) => {
			return room.getName();
		});
	};

	getRoomByKey = (roomKey) => {
		const { classrooms } = this;
		const desiredRoom = classrooms.find((room) => room.roomKey === roomKey);
		return desiredRoom;
	};
}
const classroomsManager = new ClassroomManager();

MOCK_CLASSROOMS.map((room) => {
	return classroomsManager.addClassroom(room);
});

const getPublicUserData = (user) => {
	// assertValidCredentials(user);
	if (!is(user).anObject) return null;
	const { first_name, last_name, email } = user;
	return { first_name, last_name, email };
};

const supplementIO = function(io) {
	//create a SocketIO namespace for interactive Classrooms
	const classroomsIO = io.of("/classrooms");
	//client connection - step 1 - connect client socket to server socket
	classroomsIO.on("connection", function(socket) {
		logg(`A user has connected to "classroomsIO" namespace.`);

		socket.on(
			"client__selectsRoom",
			({ clientId, roomKey, clientTypes }) => {
				logg("client__selectsRoom. clientTypes: ", clientTypes);

				if (!clientId || !roomKey) {
					loggError(
						"client__selectsRoom: Missing parameter arguments"
					);
					return socket.emit("re:client__selectsRoom", {
						badCredentials: true,
					});
				}

				let client = classroomsManager.getClientById(clientId);

				if (!client) {
					return socket.emit("re:client__selectsRoom", {
						isClienFound: false,
					});

					//client = classroomsManager.addClient()

					// client = new ClassroomClient({ clientTypes });
					// return socket.emit("re:client__selectsRoom", {
					// 	userFound: false,
					// });
				}
				const userWithoutPass = getPublicUserData(client);
				socket.join(roomKey);
				logg(
					`${userWithoutPass.first_name} ${userWithoutPass.last_name} joined room ${roomKey}`
				);

				const classroom = classroomsManager.getRoomByKey(roomKey);

				socket.emit("re:client__selectsRoom", {
					classroom,
					isClientFound: !!client,
					isClassroomFound: !!classroom,
				});

				return classroomsIO
					.to(roomKey)
					.emit("server__admitsAnotherUser", {
						...userWithoutPass,
					});
			}
		);

		socket.on("client__providesCredentials", async function(payload) {
			try {
				if (!payload) throw new Error(`No payload`);
				const { user } = payload;
				let { userTypes } = payload;
				if (!user) throw new Error(`No user provided`);
				assertValidCredentials(user);

				const { role } = user;
				const roles = user.roles || (role && [role]) || ["user"];
				user.roles = roles;

				const authenticatedUser = await authenticate(user);
				const clientId = getUniqueString(12);
				const userWithoutPass = getPublicUserData(authenticatedUser);
				userWithoutPass.clientId = clientId;
				const { first_name, last_name } = userWithoutPass;

				//make sure that the userType is one of the accepted types (teacher, student, platform)
				if (!userTypes || !is(userTypes).anArray) {
					userTypes = ["student"];
				}
				let userType;
				const firstUserType = userTypes[0];
				if (
					!firstUserType ||
					!is(firstUserType).aString ||
					!USER_TYPES.includes(firstUserType.toLowerCase())
				) {
					userType = "student";
				} else {
					userType = firstUserType.toLowerCase();
				}

				const clientTypeMsg = `${userType} ${first_name +
					" " +
					last_name} is authenticated.`;
				logg(clientTypeMsg);

				classroomsManager.addClient(userWithoutPass);

				const availableRooms = classroomsManager.getRooms();

				const availableRoomsKeys = classroomsManager.getRoomsKeys();
				logg(
					`${userType} ${authenticatedUser.first_name} ${authenticatedUser.last_name} can try to enter one of the following rooms: `,
					availableRoomsKeys
				);

				return socket.emit("server__authedClient", {
					user: userWithoutPass,
					userType,
					classrooms: availableRooms,
					clientId,
				});

				// socket.join(roomKey);
				// classroomsIO.to(roomKey).emit("anotherUserJoined", {
				// 	...userWithoutPass,
				// });
			} catch (err) {
				loggError("client__providesCredentials(): ", err);
				return socket.emit("server_failedAuth", { error: err.message });
			}
		});
		socket.on("disconnect", function() {
			const msg = `User ${socket.id} disconnected.`;
			logg(msg);
			io.emit(msg);
		});

		socket.on("teacher__setsSlideIndex", function({ index }) {
			const msg = `User ${socket.id} disconnected.`;
			socket.emit("yo", msg);
			// socket.to(roomName).emit("yo", {
			// 	user: getPublicUserData(user),
			// });
		});

		socket.on("clientSelectsRoom", function({ user, intent }) {
			try {
				assertValidCredentials(user);
				const roomName = sanitizeVarName(intent.classroomName);
				const requestedRoom = classroomsManager[roomName];
				if (!requestedRoom) {
					return socket.emit("classroomNotFound");
				}

				requestedRoom.addClient({ ...user });
				socket.join(roomName);
				socket.emit("clientEnteredClassroom");
				socket.to(roomName).emit("anotherUserJoined", {
					user: getPublicUserData(user),
				});
			} catch (err) {
				const errMsg = err.message;
				loggError(err);
				socket.emit("clientAuthFailed", { err: errMsg });
			}
		});

		socket.on("client__createRoom", function(payload) {
			try {
				// validatePayload(payload);
				const { user = {}, clientId, intent } = payload;
				if (!intent) {
					throw new Error(
						`user_createRoom was sent without an intent`
					);
				}
				//make sure that a room with the same key does not already exist! current logic is off
				// const existingRoom = classroomsManager.getRoom(intent.roomKey);
				// if (existingRoom) {
				// 	return socket.emit("server__classroomAlreadyExists", {
				// 		classroom: existingRoom,
				// 	});
				// }

				const newClassroom = classroomsManager.addClassroom(intent);
				newClassroom.addClient({ ...user, ...intent, clientId });

				const classroomInfo = newClassroom.getInfo();
				socket.join(classroomInfo.roomKey);
				const classrooms = classroomsManager.getRoomsInfo();
				socket.emit("server__roomCreated", {
					classroom: classroomInfo,
					classrooms,
				});
				// socket.emit("server__providesRooms", {
				// 	classrooms,
				// });

				//broadcat to all clients in the classrooms namespace
				classroomsIO.emit("server__providesRooms", {
					classrooms,
				});
				// classroomsIO.emit("anotherUserJoined", {
				// 	user: getPublicUserData(user),
				// });
				return;
			} catch (err) {
				const errMsg = err.message;

				loggError(err);
				socket.emit("clientAuthFailed", { err: errMsg });
			}
		});

		socket.on("client__requestsRooms", function(payload) {
			try {
				// validatePayload(payload);
				const { user = {}, clientId, intent } = payload;
				// if (!intent) {
				// 	throw new Error(
				// 		`user_createRoom was sent without an intent`
				// 	);
				// }
				//
				const existingRooms = classroomsManager.getRoomsInfo();
				return socket.emit("server__providesRooms", {
					classrooms: existingRooms,
				});
			} catch (err) {
				const errMsg = err.message;
				loggError(err);
				socket.emit("client__getRooms_error", { err: errMsg });
			}
		});

		// socket.on("createClassroom", function(payload) {
		// 	try {
		// 		validatePayload(payload);
		// 		const { user = {}, clientId, intent } = payload;
		// 		if (classroomsManager[intent.classroomName]) {
		// 			return socket.emit();
		// 		}

		// 		socket.join("some room");
		// 	} catch (err) {
		// 		loggError(err.message);
		// 	}
		// });

		classroomsIO.emit("anotherUserConnected", {
			content: "someone connected",
		});

		socket.on("userConnected", (msg) => {
			return { content: "someone connected" };
		});

		socket.on("msg", function(msg) {
			const { sender, content, id } = msg;
			logg(`User ${sender} sent a message (msg.id: ${id}): ${content}`);
			//send to all connected clients (including the sender, to emulate a successful delivery)
			io.emit("msg", { sender, content, for: msg.for || "everyone", id });
		});
	});
};

module.exports = supplementIO;
