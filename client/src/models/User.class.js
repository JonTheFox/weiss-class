class User {
  email = "";
  password = "";
  first_name = "";
  middle_name = "";
  last_name = "";
  role = "";
  gender = "";
  street_name = "";
  street_number = 0;
  city = "";
  state = "";
  country = "";
  friends = [];

  constructor(config = {}) {
    Object.assign(this, config);
  }
}

export default User;
