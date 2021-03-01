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

const rainingSilent = new Video({
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

const rainyForest = new Video({
	image:
		"https://images.pexels.com/videos/4154268/pexels-photo-4154268.jpeg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
	user: {
		id: 334838,
		name: "Bjorn Nagmussen",
		url: "https://www.pexels.com/@bjorn-nagmussen-334838",
	},
	links: {
		fourK:
			"https://player.vimeo.com/external/259711072.hd.mp4?s=db43c0b0006d1f5f5945f799f75166f1a57492d8&profile_id=172&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/259711072.hd.mp4?s=db43c0b0006d1f5f5945f799f75166f1a57492d8&profile_id=175&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/259711072.hd.mp4?s=db43c0b0006d1f5f5945f799f75166f1a57492d8&profile_id=174&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/259711072.sd.mp4?s=f5889b505764ea2d3beafee42e829ae41a1fada5&profile_id=165&oauth2_token_id=57447761",
		phone:
			"https://player.vimeo.com/external/259711072.sd.mp4?s=f5889b505764ea2d3beafee42e829ae41a1fada5&profile_id=164&oauth2_token_id=57447761",
	},
});

const flyingAboveMountains = new Video({
	image:
		"https://images.pexels.com/videos/2871916/free-video-2871916.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
	user: {
		id: 1491071,
		name: "Stefano Rinaldo",
		url: "https://www.pexels.com/@stefano-rinaldo-1491071",
	},
	links: {
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
});

const tropicalBeach = new Video({
	image:
		"https://images.pexels.com/videos/1854202/free-video-1854202.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
	user: {
		id: 876890,
		name: "INNORECORDS PhotoVideos",
		url: "https://www.pexels.com/@innorecords-photovideos-876890",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/314390042.sd.mp4?s=44af9b1a3e7e09ac1c43629c7cae9afb2f234419&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/314390042.sd.mp4?s=44af9b1a3e7e09ac1c43629c7cae9afb2f234419&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/314390042.hd.mp4?s=bd14d2aeb82f21f8bf0514a63f87c75c7fa37332&profile_id=174&oauth2_token_id=57447761",
		fullHd: "",
		fourK: "",
	},
});

const catsResting = new Video({
	image:
		"https://images.pexels.com/videos/6853901/pexels-photo-6853901.jpeg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
	user: {
		id: 1437723,
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/513397341.sd.mp4?s=dbd28dc3f7bd8cdcd93740c2737345e9631dd3a1&profile_id=139&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/513397341.sd.mp4?s=dbd28dc3f7bd8cdcd93740c2737345e9631dd3a1&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/513397341.hd.mp4?s=7dd2a458bae593b24eeb4b97c1f7d6b5959090c6&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/513397341.hd.mp4?s=7dd2a458bae593b24eeb4b97c1f7d6b5959090c6&profile_id=175&oauth2_token_id=57447761",
		fourK:
			"https://player.vimeo.com/external/513397341.hd.mp4?s=7dd2a458bae593b24eeb4b97c1f7d6b5959090c6&profile_id=172&oauth2_token_id=57447761",
	},
});

const dogPlaying = new Video({
	image:
		"https://images.pexels.com/videos/853936/free-video-853936.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
	user: {
		id: 290887,
		name: "Free Videos",
		url: "https://www.pexels.com/@free-videos",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/210743842.sd.mp4?s=fcf7c509e74a02a35175a2d9294eb2e25d6c74ef&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/210743842.sd.mp4?s=fcf7c509e74a02a35175a2d9294eb2e25d6c74ef&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/210743842.hd.mp4?s=816e9088f196a9a11f754769faa509ed5ba82378&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/210743842.hd.mp4?s=816e9088f196a9a11f754769faa509ed5ba82378&profile_id=119&oauth2_token_id=57447761",
		fourK: "",
	},
});

const bikeRidingFirstPerson = new Video({
	image:
		"https://images.pexels.com/videos/2519660/free-video-2519660.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
	user: {
		id: 1179532,
		name: "Kelly Lacy",
		url: "https://www.pexels.com/@kelly-lacy-1179532",
	},
	links: {
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
});

const skiing = new Video({
	image:
		"https://images.pexels.com/videos/4274798/montagne-piste-de-ski-ski-skier-4274798.jpeg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
	user: {
		id: 2550885,
		name: "Adrien JACTA",
		url: "https://www.pexels.com/@adrien-jacta-2550885",
	},
	links: {
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
});

//portait videos
const seaShoreWaves = {
	user: {
		name: "Dey Kheireddine",
		url: "https://www.pexels.com/@deykhd",
		id: 114448,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/397754027.sd.mp4?s=a38cbaeac00a30f379044291715b15fc6e4ccd85&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/397754027.hd.mp4?s=8bdedf9ad49d8378b6f2afa56e1319195c2ee7ef&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/397754027.hd.mp4?s=8bdedf9ad49d8378b6f2afa56e1319195c2ee7ef&profile_id=175&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/397754027.sd.mp4?s=a38cbaeac00a30f379044291715b15fc6e4ccd85&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/397754027.hd.mp4?s=8bdedf9ad49d8378b6f2afa56e1319195c2ee7ef&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/397754027.hd.mp4?s=8bdedf9ad49d8378b6f2afa56e1319195c2ee7ef&profile_id=175&oauth2_token_id=57447761",
	},
};

const flyingByClouds = {
	user: {},
	images: {},
	links: {
		phone: "https://www.youtube.com/watch?v=6AJl7DsL-1Y",
	},
	startSecond: 15,
	stopSecond: 60 * 5 + 50,
};
const tropicalBeach2 = {
	user: {
		name: "Charlene White",
		url: "https://www.pexels.com/@charlene-white-900631",
		id: 900631,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/312179347.sd.mp4?s=c500fd34361bb8327d9cf616b1025e2057d6acca&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/312179347.hd.mp4?s=d3108f81bd15941edd40163caac3543c15014ff1&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/312179347.hd.mp4?s=d3108f81bd15941edd40163caac3543c15014ff1&profile_id=175&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/312179347.sd.mp4?s=c500fd34361bb8327d9cf616b1025e2057d6acca&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/312179347.hd.mp4?s=d3108f81bd15941edd40163caac3543c15014ff1&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/312179347.hd.mp4?s=d3108f81bd15941edd40163caac3543c15014ff1&profile_id=175&oauth2_token_id=57447761",
	},
};

const catWalkingOnPiano = {
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/513373860.sd.mp4?s=9fc67940b1192611138cfe630478f7618b2d4dd6&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/513373860.hd.mp4?s=3aa9a256b9e4eea8b6ed071af5cf6052c3d88c69&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/513373860.hd.mp4?s=3aa9a256b9e4eea8b6ed071af5cf6052c3d88c69&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/513373860.hd.mp4?s=3aa9a256b9e4eea8b6ed071af5cf6052c3d88c69&profile_id=172&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/513373860.sd.mp4?s=9fc67940b1192611138cfe630478f7618b2d4dd6&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/513373860.hd.mp4?s=3aa9a256b9e4eea8b6ed071af5cf6052c3d88c69&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/513373860.hd.mp4?s=3aa9a256b9e4eea8b6ed071af5cf6052c3d88c69&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/513373860.hd.mp4?s=3aa9a256b9e4eea8b6ed071af5cf6052c3d88c69&profile_id=172&oauth2_token_id=57447761",
	},
};

const PracticingJudo = {
	user: {
		name: "Artem Podrez",
		url: "https://www.pexels.com/@artempodrez",
		id: 2951544,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/493409070.sd.mp4?s=77480349978d6dc7067d1fab5a0cc0368a6b8654&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/493409070.hd.mp4?s=dcf495b2bbbc08b656bf44d32173366349e5bf08&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/493409070.hd.mp4?s=dcf495b2bbbc08b656bf44d32173366349e5bf08&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/493409070.hd.mp4?s=dcf495b2bbbc08b656bf44d32173366349e5bf08&profile_id=172&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/493409070.sd.mp4?s=77480349978d6dc7067d1fab5a0cc0368a6b8654&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/493409070.hd.mp4?s=dcf495b2bbbc08b656bf44d32173366349e5bf08&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/493409070.hd.mp4?s=dcf495b2bbbc08b656bf44d32173366349e5bf08&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/493409070.hd.mp4?s=dcf495b2bbbc08b656bf44d32173366349e5bf08&profile_id=172&oauth2_token_id=57447761",
	},
};

const PlayingBasketball = {
	user: {
		name: "Tima Miroshnichenko",
		url: "https://www.pexels.com/@tima-miroshnichenko",
		id: 3088726,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/467436330.sd.mp4?s=76304706368278640ac086aa2232c50327b2491e&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/467436330.hd.mp4?s=17d8359d3357d31ea836ea898966b17b4af4b34c&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/467436330.hd.mp4?s=17d8359d3357d31ea836ea898966b17b4af4b34c&profile_id=175&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/467436330.sd.mp4?s=76304706368278640ac086aa2232c50327b2491e&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/467436330.hd.mp4?s=17d8359d3357d31ea836ea898966b17b4af4b34c&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/467436330.hd.mp4?s=17d8359d3357d31ea836ea898966b17b4af4b34c&profile_id=175&oauth2_token_id=57447761",
	},
};

const PlayingSoccer = {
	user: {
		name: "Tima Miroshnichenko",
		url: "https://www.pexels.com/@tima-miroshnichenko",
		id: 3088726,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/487388032.sd.mp4?s=cc10a3427332da8fd21611b744ea852ae3d49b6a&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/487388032.hd.mp4?s=6ea672d27c5579ed42872ef665472bd8c4973dd1&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/487388032.hd.mp4?s=6ea672d27c5579ed42872ef665472bd8c4973dd1&profile_id=175&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/487388032.sd.mp4?s=cc10a3427332da8fd21611b744ea852ae3d49b6a&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/487388032.hd.mp4?s=6ea672d27c5579ed42872ef665472bd8c4973dd1&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/487388032.hd.mp4?s=6ea672d27c5579ed42872ef665472bd8c4973dd1&profile_id=175&oauth2_token_id=57447761",
	},
};

const girlStudying = {
	user: {
		name: "Polina Tankilevitch",
		url: "https://www.pexels.com/@polina-tankilevitch",
		id: 2104565,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/515795363.sd.mp4?s=f226291916ab545993c0c379aced95d6255335b0&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/515795363.hd.mp4?s=c36580efd21b8e0a4d74c02004f81380653040e9&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/515795363.hd.mp4?s=c36580efd21b8e0a4d74c02004f81380653040e9&profile_id=175&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/515795363.sd.mp4?s=f226291916ab545993c0c379aced95d6255335b0&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/515795363.hd.mp4?s=c36580efd21b8e0a4d74c02004f81380653040e9&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/515795363.hd.mp4?s=c36580efd21b8e0a4d74c02004f81380653040e9&profile_id=175&oauth2_token_id=57447761",
	},
};

const tastingPancake = {
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/390189146.sd.mp4?s=856aceda389e10dfdc19a139360ff184661d7caa&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/390189146.hd.mp4?s=ee9ceba48abb134a5d81464755d02728a0c511a2&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/390189146.hd.mp4?s=ee9ceba48abb134a5d81464755d02728a0c511a2&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/390189146.hd.mp4?s=ee9ceba48abb134a5d81464755d02728a0c511a2&profile_id=173&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/390189146.sd.mp4?s=856aceda389e10dfdc19a139360ff184661d7caa&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/390189146.hd.mp4?s=ee9ceba48abb134a5d81464755d02728a0c511a2&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/390189146.hd.mp4?s=ee9ceba48abb134a5d81464755d02728a0c511a2&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/390189146.hd.mp4?s=ee9ceba48abb134a5d81464755d02728a0c511a2&profile_id=173&oauth2_token_id=57447761",
	},
};

const cookingSoy = {
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/376214014.sd.mp4?s=08f6031eb4bc5c58dbe1635967468a99a92fe13a&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/376214014.hd.mp4?s=f7f821b6aac45dab79ee4c299212bd527862c1d4&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/376214014.hd.mp4?s=f7f821b6aac45dab79ee4c299212bd527862c1d4&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/376214014.hd.mp4?s=f7f821b6aac45dab79ee4c299212bd527862c1d4&profile_id=172&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/376214014.sd.mp4?s=08f6031eb4bc5c58dbe1635967468a99a92fe13a&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/376214014.hd.mp4?s=f7f821b6aac45dab79ee4c299212bd527862c1d4&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/376214014.hd.mp4?s=f7f821b6aac45dab79ee4c299212bd527862c1d4&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/376214014.hd.mp4?s=f7f821b6aac45dab79ee4c299212bd527862c1d4&profile_id=172&oauth2_token_id=57447761",
	},
};

const throwingTomatoUp = {
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/397941600.sd.mp4?s=25738b06d6cb0d29862800713e47cbcc5a123ee2&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/397941600.hd.mp4?s=a9ebe7ff2fdaffe5480970cd3674b1802488fc6c&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/397941600.hd.mp4?s=a9ebe7ff2fdaffe5480970cd3674b1802488fc6c&profile_id=171&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/397941600.hd.mp4?s=a9ebe7ff2fdaffe5480970cd3674b1802488fc6c&profile_id=173&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/397941600.sd.mp4?s=25738b06d6cb0d29862800713e47cbcc5a123ee2&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/397941600.hd.mp4?s=a9ebe7ff2fdaffe5480970cd3674b1802488fc6c&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/397941600.hd.mp4?s=a9ebe7ff2fdaffe5480970cd3674b1802488fc6c&profile_id=171&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/397941600.hd.mp4?s=a9ebe7ff2fdaffe5480970cd3674b1802488fc6c&profile_id=173&oauth2_token_id=57447761",
	},
};

const cleaningAndDancing = {
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/405479087.sd.mp4?s=9a3ccb1b1669bf853c9daf06f204421f8b89c3a7&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/405479087.hd.mp4?s=1dacde1e3dc21a5e6ca72ecbd8e5764694fa2ee9&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/405479087.hd.mp4?s=1dacde1e3dc21a5e6ca72ecbd8e5764694fa2ee9&profile_id=171&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/405479087.hd.mp4?s=1dacde1e3dc21a5e6ca72ecbd8e5764694fa2ee9&profile_id=173&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/405479087.sd.mp4?s=9a3ccb1b1669bf853c9daf06f204421f8b89c3a7&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/405479087.hd.mp4?s=1dacde1e3dc21a5e6ca72ecbd8e5764694fa2ee9&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/405479087.hd.mp4?s=1dacde1e3dc21a5e6ca72ecbd8e5764694fa2ee9&profile_id=171&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/405479087.hd.mp4?s=1dacde1e3dc21a5e6ca72ecbd8e5764694fa2ee9&profile_id=173&oauth2_token_id=57447761",
	},
};

const dancingYellow = {
	user: {
		name: "Anna Shvets",
		url: "https://www.pexels.com/@shvetsa",
		id: 1984515,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/414795463.sd.mp4?s=95ba5c6cd195206c91c2ddae56a004058e9cacb1&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/414795463.hd.mp4?s=0bd8bdd6eb116017f7c1bdb039c820626fd11d78&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/414795463.hd.mp4?s=0bd8bdd6eb116017f7c1bdb039c820626fd11d78&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/414795463.hd.mp4?s=0bd8bdd6eb116017f7c1bdb039c820626fd11d78&profile_id=172&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/414795463.sd.mp4?s=95ba5c6cd195206c91c2ddae56a004058e9cacb1&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/414795463.hd.mp4?s=0bd8bdd6eb116017f7c1bdb039c820626fd11d78&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/414795463.hd.mp4?s=0bd8bdd6eb116017f7c1bdb039c820626fd11d78&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/414795463.hd.mp4?s=0bd8bdd6eb116017f7c1bdb039c820626fd11d78&profile_id=172&oauth2_token_id=57447761",
	},
};

const dancingLadies = {
	user: {
		name: "Anna Shvets",
		url: "https://www.pexels.com/@shvetsa",
		id: 1984515,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/435373899.sd.mp4?s=8b5067a03b5f02320c8b08823a2056f01b5266c4&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/435373899.hd.mp4?s=17d13bc3178c2dc3e20c6f2725916e72874a801d&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/435373899.hd.mp4?s=17d13bc3178c2dc3e20c6f2725916e72874a801d&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/435373899.hd.mp4?s=17d13bc3178c2dc3e20c6f2725916e72874a801d&profile_id=172&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/435373899.sd.mp4?s=8b5067a03b5f02320c8b08823a2056f01b5266c4&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/435373899.hd.mp4?s=17d13bc3178c2dc3e20c6f2725916e72874a801d&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/435373899.hd.mp4?s=17d13bc3178c2dc3e20c6f2725916e72874a801d&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/435373899.hd.mp4?s=17d13bc3178c2dc3e20c6f2725916e72874a801d&profile_id=172&oauth2_token_id=57447761",
	},
};

const dancingGuy = {
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/353559559.sd.mp4?s=341572245099a7b42e34e72473ce876d7e8c196c&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/353559559.hd.mp4?s=bab0e909b1c32bbfddf860fbcdb9e9b00c1b5aa6&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/353559559.hd.mp4?s=bab0e909b1c32bbfddf860fbcdb9e9b00c1b5aa6&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/353559559.hd.mp4?s=bab0e909b1c32bbfddf860fbcdb9e9b00c1b5aa6&profile_id=172&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/353559559.sd.mp4?s=341572245099a7b42e34e72473ce876d7e8c196c&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/353559559.hd.mp4?s=bab0e909b1c32bbfddf860fbcdb9e9b00c1b5aa6&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/353559559.hd.mp4?s=bab0e909b1c32bbfddf860fbcdb9e9b00c1b5aa6&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/353559559.hd.mp4?s=bab0e909b1c32bbfddf860fbcdb9e9b00c1b5aa6&profile_id=172&oauth2_token_id=57447761",
	},
};

const girlPlayingWithCat = {
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/513848114.sd.mp4?s=f1f7f288617965ecbbf76fdb43cc3924225c683e&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/513848114.hd.mp4?s=bf13232aefde611877694b4485949ce7979eef10&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/513848114.hd.mp4?s=bf13232aefde611877694b4485949ce7979eef10&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/513848114.hd.mp4?s=bf13232aefde611877694b4485949ce7979eef10&profile_id=172&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/513848114.sd.mp4?s=f1f7f288617965ecbbf76fdb43cc3924225c683e&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/513848114.hd.mp4?s=bf13232aefde611877694b4485949ce7979eef10&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/513848114.hd.mp4?s=bf13232aefde611877694b4485949ce7979eef10&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/513848114.hd.mp4?s=bf13232aefde611877694b4485949ce7979eef10&profile_id=172&oauth2_token_id=57447761",
	},
};

const workingOnComputer = {
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/403652508.sd.mp4?s=f6fff2f196fc5899d730fd9af5544b7e6fbc5aa6&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/403652508.hd.mp4?s=619899d6bfc52d8832cad04c0c0be57d45bb6c02&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/403652508.hd.mp4?s=619899d6bfc52d8832cad04c0c0be57d45bb6c02&profile_id=171&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/403652508.hd.mp4?s=619899d6bfc52d8832cad04c0c0be57d45bb6c02&profile_id=173&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/403652508.sd.mp4?s=f6fff2f196fc5899d730fd9af5544b7e6fbc5aa6&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/403652508.hd.mp4?s=619899d6bfc52d8832cad04c0c0be57d45bb6c02&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/403652508.hd.mp4?s=619899d6bfc52d8832cad04c0c0be57d45bb6c02&profile_id=171&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/403652508.hd.mp4?s=619899d6bfc52d8832cad04c0c0be57d45bb6c02&profile_id=173&oauth2_token_id=57447761",
	},
};

const drivingInNiceScenery = {
	user: {
		name: "Yaroslav Shuraev",
		url: "https://www.pexels.com/@yaroslav-shuraev",
		id: 649765,
	},
	images: {
		phone:
			"https://player.vimeo.com/external/420239207.sd.mp4?s=2b5a6633c37af1a6fb0beb02c06bdc376fdfcce2&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/420239207.hd.mp4?s=9fa34fce5989c66f5edc65fc533f2d91085d7599&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/420239207.hd.mp4?s=9fa34fce5989c66f5edc65fc533f2d91085d7599&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/420239207.hd.mp4?s=9fa34fce5989c66f5edc65fc533f2d91085d7599&profile_id=172&oauth2_token_id=57447761",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/420239207.sd.mp4?s=2b5a6633c37af1a6fb0beb02c06bdc376fdfcce2&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/420239207.hd.mp4?s=9fa34fce5989c66f5edc65fc533f2d91085d7599&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/420239207.hd.mp4?s=9fa34fce5989c66f5edc65fc533f2d91085d7599&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/420239207.hd.mp4?s=9fa34fce5989c66f5edc65fc533f2d91085d7599&profile_id=172&oauth2_token_id=57447761",
	},
};

module.exports = {
	rainyForest,
	rainingSilent,
	flyingAboveMountains,
	tropicalBeach,
	catsResting,
	dogPlaying,
	bikeRidingFirstPerson,
	skiing,
	tropicalBeach2,

	catWalkingOnPiano,
	PracticingJudo,
	PlayingBasketball,
	PlayingSoccer,
	seaShoreWaves,
	girlStudying,
	tastingPancake,
	cookingSoy,
	throwingTomatoUp,
	cleaningAndDancing,
	dancingYellow,
	dancingLadies,
	dancingGuy,
	girlPlayingWithCat,
	workingOnComputer,
	drivingInNiceScenery,
	flyingByClouds,
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
