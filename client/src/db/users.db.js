// import React from "react";
import ENDPOINTS from "../AJAX/ajax-endpoints.js";

const usersDb = {
	name: "users",
	title: "Users",
	uris: {
		getAll: ENDPOINTS.users.POST.getAll.path,
		updateRow: ENDPOINTS.users.POST.updateOne.path,
		add: ENDPOINTS.users.POST.add.path,
		deleteRecord: ENDPOINTS.users.DELETE.user.path
	},
	// columns: [
	// 	// { title: "name", field: "name" }
	// 	{ title: "first name", field: "firstName" }
	// 	// { title: "last name", field: "lastName" }
	// ],
	// extraColumns: [{ field: "fullname", title: "Full Name", startIndex: 0 }],
	augmentRecord: record => {
		const { first_name, middle_name, last_name } = record;
		record.fullname = `${first_name} ${
			middle_name ? middle_name + " " : ""
		}${last_name}`;
		return record;
	}
};

export default usersDb;
