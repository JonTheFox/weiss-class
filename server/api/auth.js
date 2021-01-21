const { logger, is, request } = global;
const { logg, loggError } = logger.createSubLogger({ label: "auth" });
const { authenticatedUsers, USER_SERVER_URL } = global;

// logg("host:", HOST);

const authenticateUser = async (credentials) => {
	if (!credentials || !is(credentials).anObject)
		throw new Error(`No credentials provided`);
	const { email, password, role = "user" } = credentials;
	// logg("authenticateUser: credentials: ", credentials);
	let { roles } = credentials;
	logg("email: ", email);
	// logg("password: ", password);
	if (!email || !password) throw new Error(`bad credentials`);

	//accept either an array of roles, or a single role string. Property -roles- takes precedence
	//supported roles: admin & user
	if (!roles || !is(roles).anArray || !roles.length) {
		if (role === "admin") {
			roles = ["admin"];
		} else {
			logg(
				`Client ${email} did not specify role. Using default role: user`
			);
			roles = ["user"];
		}
	}

	if (!global.authenticatedUsers) {
		global.authenticatedUsers = {
			users: {},
			admins: {},
		};
	}
	const { authenticatedUsers } = global;

	let authedUser;
	for (let i = 0; i < roles.length; i++) {
		const _role = roles[i];
		const _userList = authenticatedUsers[_role + "s"];
		if (!_userList) {
			continue;
		}
		const _user = _userList[email];
		if (_user) {
			authedUser = _user;
			//
		}

		continue;
	}
	if (authedUser) {
		logg(`User ${email} has already been authenticated`);
		return authedUser;
	}

	console.log(
		"USER_SERVER_URL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ",
		USER_SERVER_URL
	);

	const ajaxResult = await request(
		"POST",
		`${USER_SERVER_URL}/api/users/authenticate`,
		credentials
	);

	const {
		error,
		auth,
		userFound,
		role: returnedRole,
		first_name,
		last_name,
	} = ajaxResult;

	if (error) throw new Error(error);
	if (!userFound) throw new Error(`user not found`);
	if (!auth) throw new Error(`Authentication failed for ${email}`);

	authedUser = ajaxResult;
	delete authedUser.auth;
	delete authedUser.userFound;

	//User is authorized. Add him to the list of connected user to avoid looking him up in subsequent queries
	authenticatedUsers[returnedRole + "s"][email] = authedUser;
	logg(
		`Authentication succeeded for ${returnedRole} ${first_name} ${last_name}.`
	);
	// logg("authenticatedUsers: ", authenticatedUsers);
	return authedUser;
};

module.exports = authenticateUser;
