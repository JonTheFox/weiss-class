const getPublicUserInfo = (user) => {
	// assertValidCredentials(user);
	if (!is(user).anObject) return null;
	const { first_name, last_name, email } = user;
	return { first_name, last_name, email };
};

module.exports = getPublicUserInfo;
