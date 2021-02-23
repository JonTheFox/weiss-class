class PexelsUser {
	id;
	name;
	url;
	constructor(config) {
		Object.assign(this, config);
	}
}

class PexelsVideoFile {
	file_type;
	height;
	id;
	link;
	quality;
	width;
	constructor(config) {
		Object.assign(this, config);
	}
}

class PexelsVideoPicture {
	file_type;
	height;
	id;
	link;
	quality;
	width;
	constructor(config) {
		Object.assign(this, config);
	}
}

class PexelsVideo {
	avg_color;
	duration;
	full_res;
	height;
	id;
	image;
	tags = [];
	url;
	user;
	video_files;
	video_pictures;
	width;
	constructor(config = {}) {
		Object.assign(this, config);
	}
}

class Video {
	links = {};
	image;
	user;
	id;
	constructor(config = {}) {
		Object.assign(this, config);
	}
}

const raining = new Video({
	image:
		"https://images.pexels.com/videos/4154268/pexels-photo-4154268.jpeg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
	user: {
		id: 2560608,
		name: "Suraj  Behra",
		url: "https://www.pexels.com/@suraj-behra-2560608",
	},
	links: {
		fullHd:
			"https://player.vimeo.com/external/407639430.hd.mp4?s=c5351a21941f38726ee6160dc4714c385ca42cfd&profile_id=175&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/407639430.hd.mp4?s=c5351a21941f38726ee6160dc4714c385ca42cfd&profile_id=174&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/407639430.sd.mp4?s=741a25839672bf671c00f51fc19fc145c9c24aef&profile_id=165&oauth2_token_id=57447761",
		phone:
			"https://player.vimeo.com/external/407639430.sd.mp4?s=741a25839672bf671c00f51fc19fc145c9c24aef&profile_id=139&oauth2_token_id=57447761",
	},
});

module.exports = {
	raining,
	firstPersonBikeRiding: {
		phone:
			"https://player.vimeo.com/external/343052045.sd.mp4?s=7ff4748243927ebffab3ab3befeb0b8bf4960154&profile_id=139&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/343052045.sd.mp4?s=7ff4748243927ebffab3ab3befeb0b8bf4960154&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/343052045.hd.mp4?s=47f41ee7c9f0aa2838ddd330b8c71b94b30668e0&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/343052045.hd.mp4?s=47f41ee7c9f0aa2838ddd330b8c71b94b30668e0&profile_id=175&oauth2_token_id=57447761",
		fourK:
			"https://player.vimeo.com/external/343052045.hd.mp4?s=47f41ee7c9f0aa2838ddd330b8c71b94b30668e0&profile_id=172&oauth2_token_id=57447761",
	},
	flyingThroughClouds: {
		phone:
			"https://player.vimeo.com/external/368748183.sd.mp4?s=dfa0c269d289bc12aa9f7d978efe9e07c0f2431a&profile_id=139&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/368748183.sd.mp4?s=dfa0c269d289bc12aa9f7d978efe9e07c0f2431a&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/368748183.hd.mp4?s=a08e0776d3956fe948838e92b880e587dbb1020d&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/368748183.hd.mp4?s=a08e0776d3956fe948838e92b880e587dbb1020d&profile_id=175&oauth2_token_id=57447761",
		fourK:
			"https://player.vimeo.com/external/368748183.hd.mp4?s=a08e0776d3956fe948838e92b880e587dbb1020d&profile_id=172&oauth2_token_id=57447761",
	},
	flyingAboveMountains: {
		phone:
			"https://player.vimeo.com/external/357054396.sd.mp4?s=f3c7bf3a310d882b5e615b4c5fef2cfe71d6276d&profile_id=139&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/357054396.sd.mp4?s=f3c7bf3a310d882b5e615b4c5fef2cfe71d6276d&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/357054396.hd.mp4?s=ef459c68bb21079455e64f06719442b345462862&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/357054396.hd.mp4?s=ef459c68bb21079455e64f06719442b345462862&profile_id=175&oauth2_token_id=57447761",
		fourK: "",
	},
	skiing: {
		phone:
			"https://player.vimeo.com/external/413480925.sd.mp4?s=cb37b845a67724b9865756d2371038ae3e14bae6&profile_id=139&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/413480925.sd.mp4?s=cb37b845a67724b9865756d2371038ae3e14bae6&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/413480925.hd.mp4?s=c4ef3c312596d42fa43b5b6402cb202bf951c9f7&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/413480925.hd.mp4?s=c4ef3c312596d42fa43b5b6402cb202bf951c9f7&profile_id=175&oauth2_token_id=57447761",
		fourK:
			"https://player.vimeo.com/external/413480925.hd.mp4?s=c4ef3c312596d42fa43b5b6402cb202bf951c9f7&profile_id=172&oauth2_token_id=57447761",
	},
	tropicalBeach: {
		phone:
			"https://player.vimeo.com/external/314390042.sd.mp4?s=44af9b1a3e7e09ac1c43629c7cae9afb2f234419&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/314390042.sd.mp4?s=44af9b1a3e7e09ac1c43629c7cae9afb2f234419&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/314390042.hd.mp4?s=bd14d2aeb82f21f8bf0514a63f87c75c7fa37332&profile_id=174&oauth2_token_id=57447761",
		fullHd: "",
		fourK: "",
	},
	coupleWalkingOnTheBeach: {
		phone:
			"https://player.vimeo.com/external/240988008.sd.mp4?s=90aefd0715300ea411d1328dcf60245e27c99eaf&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/240988008.sd.mp4?s=90aefd0715300ea411d1328dcf60245e27c99eaf&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/240988008.hd.mp4?s=754c5f41584ff2b7a5fbffbe61f650efa27c0fb0&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/240988008.hd.mp4?s=754c5f41584ff2b7a5fbffbe61f650efa27c0fb0&profile_id=175&oauth2_token_id=57447761",
		fourK:
			"https://player.vimeo.com/external/240988008.hd.mp4?s=754c5f41584ff2b7a5fbffbe61f650efa27c0fb0&profile_id=172&oauth2_token_id=57447761",
	},
	wavesCrashing: {
		phone:
			"https://player.vimeo.com/external/309448537.sd.mp4?s=48b017844b9c4f1758ac43b944e5d39ffd50bc2c&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/309448537.sd.mp4?s=48b017844b9c4f1758ac43b944e5d39ffd50bc2c&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/309448537.hd.mp4?s=6f5d3e21ce3a4ecc8b62e27d3cbdd20084d17de4&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/309448537.hd.mp4?s=6f5d3e21ce3a4ecc8b62e27d3cbdd20084d17de4&profile_id=175&oauth2_token_id=57447761",
		fourK:
			"https://player.vimeo.com/external/309448537.hd.mp4?s=6f5d3e21ce3a4ecc8b62e27d3cbdd20084d17de4&profile_id=172&oauth2_token_id=57447761",
	},
	womanWalkingOnSand: {
		phone:
			"https://player.vimeo.com/external/377073171.sd.mp4?s=8543dab0083118944aabf2afc9b99cded70701a0&profile_id=139&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/377073171.sd.mp4?s=8543dab0083118944aabf2afc9b99cded70701a0&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/377073171.hd.mp4?s=df4c3d6940d0abb1f6faa3b2e2b0a8f0e0a25a8f&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/377073171.hd.mp4?s=df4c3d6940d0abb1f6faa3b2e2b0a8f0e0a25a8f&profile_id=175&oauth2_token_id=57447761",
		fourK: "",
	},
	dogEnjoyingRide: {
		phone:
			"https://player.vimeo.com/external/131908387.mobile.mp4?s=36f32174fc6b1c06174c3d2c8274fac52f37eb53&profile_id=116&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/131908387.sd.mp4?s=0557254994b78897b01c0e751b06fcb687763853&profile_id=112&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/131908387.hd.mp4?s=02db28773681cdb1ea8b63c4af625edc8a7f1248&profile_id=113&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/131908387.hd.mp4?s=02db28773681cdb1ea8b63c4af625edc8a7f1248&profile_id=119&oauth2_token_id=57447761",
		fourK: "",
	},
	driving: {
		phone:
			"https://player.vimeo.com/external/304674147.sd.mp4?s=82a71d58b0bf579e087a937d70c3155fdbb95719&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/304674147.sd.mp4?s=82a71d58b0bf579e087a937d70c3155fdbb95719&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/304674147.hd.mp4?s=0e8543b039b0d09d545eba4a442cbc38970b2ff7&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/304674147.hd.mp4?s=0e8543b039b0d09d545eba4a442cbc38970b2ff7&profile_id=175&oauth2_token_id=57447761",
		fourK: "",
	},
};

/*

coupleWalkingOnTheBeach: {
		phone:
			"",
		tablet:
			"",
		hdReady:
			"",
		fullHd: "",
		fourK: "",
	},

*/
