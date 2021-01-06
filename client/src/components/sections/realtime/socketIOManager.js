const CONNECTION_STATES = {
	IS_NOT_READY: "inactive",
	IDLE: "isIdle",
	CONNECTING: "isConnecting",
	ENTERING_ROOM: "isEnteringRoom",
	ALREADY_INSIDE_ROOM: "isAlreadyConnected",
	ENTERED_ROOM: "isConnected",
	CONNECTION_FAILED: "connectionFailed",
	DISCONNECTED: "isDisconnected",
};

const {
	IS_NOT_READY,
	IDLE,
	CONNECTING,
	ENTERING_ROOM,
	ALREADY_INSIDE_ROOM,
	ENTERED_ROOM,
	CONNECTION_FAILED,
	DISCONNECTED,
} = CONNECTION_STATES;

const initSocket = ({ clientType = "student", user = {}, socket }) => {
	try {
		const { email, password } = user;
		if (!email || !password) {
			throw new Error(
				`Can't connect to Socket server without user credentials`
			);
		}

		// const { setConnectionStatus } = socketIO;

		// setConnectionStatus(CONNECTING);
		socket = io("/classrooms");

		const WAIT_TILL_FAIL = 10 * 1000;

		promiseKeeper
			.stall(WAIT_TILL_FAIL, CONNECTION_TIMEOUT_LABEL)
			.then(() => {
				if (refs.current.connectionStatus === CONNECTING) {
					setConnectionStatus(CONNECTION_FAILED);
				}
			})
			.catch((reason) => {
				logg(
					"Timeout for connection attemp was cancelled. Reason: ",
					reason
				);
			});

		socket.on("userConnectedHandled", (serverMsg) => {
			const { content, sender, id } = serverMsg;
			setConnectionStatus(ENTERED_ROOM);
			logg("SocketIO: userConnectedHandled: ", content);
		});

		socket.on("userIsAlreadyConnected", (serverMsg) => {
			const { content, sender, id } = serverMsg;
			setConnectionStatus(ALREADY_INSIDE_ROOM);
		});

		socket.on("connect", function(msg) {
			const content = `User ${email} has entered to realtime room.`;
			setConnectionStatus(ENTERING_ROOM);
			logg(content);
			socket.emit("clientFinalizesConnection", {
				user,
				clientID,
				userType: clientType.toLowerCase(),
			});
		});
		socket.on("disconnect", function(msg) {
			logg("Disconnected from realtime room. \n", msg);
			setConnectionStatus(DISCONNECTED);
		});
		socket.on("anotherUserJoined", function(joiningUser) {
			const { first_name, last_name } = joiningUser;
			logg(
				`User ${first_name} ${last_name} has joined the RTEntrance room`
			);
		});

		socket.emit("dispatchToStudents", {
			user,
			action: {
				type: "sayHi",
				payload: { msg: "hi" },
			},
		});
	} catch (err) {
		loggError(err.message);
	}
};

export { initSocket };
