import Logger from "../../lib/logg.js";

const label = "clientTypes.js";

const { logg, loggError } = new Logger({ label });

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
			userType,
			roomKey,
			img,
		} = config;
		if (!email || !first_name || !last_name)
			throw new Error("Invalid user credentials");
		Object.assign(this, {
			email,
			first_name,
			last_name,
			clientId,
			userType,
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
		this.clientType = "teacher";
	}
}
class Student extends ClassroomClient {
	constructor(config = {}) {
		super(config);
		this.clientType = "student";
	}
}
class Platform extends ClassroomClient {
	constructor(config = {}) {
		super(config);
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

export {
	ClassroomClientList,
	ClassroomClient,
	Teacher,
	Student,
	Platform,
	clientTypes,
};

const clientTypes = ["student", "teacher", "platform"];

export default clientTypes;
