class WordList {
	groups={};
	groupNames=[]; //will be deferred from groups
	partOfSpeech;
	constructor(config = {}) {
		if(config.groups) {
			 for (let groupName of Object.keys(config.groups)) {
				this.groupNames.push(groupName);
			
			 }
		}

		Object.assign(this.groups, config.groups);

	}
	get = (groupName = "") => {
		if (!groupName || !groupName.length) return null;
		return this.groups[groupName];
	};
	getAllItems =()=>{
		let flattenedGroups = [];
		 for (let group of Object.values(this.groups)) {
		 	flattenedGroups= [...flattenedGroups, ...group];
		 }
		return flattenedGroups;
	}
}

export default WordList;
