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
	links = {};
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

const flyingThroughCloudsOriginal = {
	id: "flyingThroughCloudsOriginal",
	longDelay: true,
	startSecond: 60 * 1 + 38,
	stopSecond: 60 * 2 + 16,
	groupName: "Clouds",
	opacity: 0.3,
	scaleToFitViewport: true,
	user: {
		name: "",
		url: "",
		id: 0,
	},
	images: {
		phone: "",
		tablet: "",
		hdReady: "",
		fullHd: "",
	},
	links: {
		phone: "https://www.youtube.com/watch?v=VmMYfAR21KY",
		tablet: "",
		hdReady: "",
		fullHd: "",
		fourK: "",
	},
};

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
	image:
		"https://images.pexels.com/videos/1813646/free-video-1813646.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
	links: {
		phone:
			"https://player.vimeo.com/external/312179347.sd.mp4?s=c500fd34361bb8327d9cf616b1025e2057d6acca&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/312179347.hd.mp4?s=d3108f81bd15941edd40163caac3543c15014ff1&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/312179347.hd.mp4?s=d3108f81bd15941edd40163caac3543c15014ff1&profile_id=175&oauth2_token_id=57447761",
	},
	playSound: true,
};

const wavingCrashing = {
	user: {
		name: "João Delicado",
		url: "https://www.pexels.com/@joaodelicado",
		id: 3121881,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/433023696.sd.mp4?s=1bd3eb14192da2c6c2f97dc80285fe139c11380d&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/433023696.hd.mp4?s=bec802121a532aea3ed744a39b8a85c9a3ecaeb9&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/433023696.hd.mp4?s=bec802121a532aea3ed744a39b8a85c9a3ecaeb9&profile_id=175&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/4738429/pictures/preview-0.jpg",
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

const practicingJudo = {
	label: "They are practicing Judo.",
	user: {
		name: "Artem Podrez",
		url: "https://www.pexels.com/@artempodrez",
		id: 2951544,
	},
	images: {
		phone:
			"https://images.unsplash.com/photo-1515025617920-e1e674b5033c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGp1ZG98ZW58MHwwfHx8MTYxODY2MTE0Mg&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1515025617920-e1e674b5033c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGp1ZG98ZW58MHwwfHx8MTYxODY2MTE0Mg&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1515025617920-e1e674b5033c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGp1ZG98ZW58MHwwfHx8MTYxODY2MTE0Mg&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1515025617920-e1e674b5033c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGp1ZG98ZW58MHwwfHx8MTYxODY2MTE0Mg&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1515025617920-e1e674b5033c?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGp1ZG98ZW58MHwwfHx8MTYxODY2MTE0Mg&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1515025617920-e1e674b5033c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGp1ZG98ZW58MHwwfHx8MTYxODY2MTE0Mg&ixlib=rb-1.2.1&q=80&w=200",
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

const theyArePlayingBasketBall = {
	user: {
		name: "Tima Miroshnichenko",
		url: "https://www.pexels.com/@tima-miroshnichenko",
		id: 3088726,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/467429546.sd.mp4?s=04248268536d9fd56e59207c9f37639530cd3779&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/467429546.hd.mp4?s=181c59d9eee51d0b7f75a3feaedab8d6d0d7d330&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/467429546.hd.mp4?s=181c59d9eee51d0b7f75a3feaedab8d6d0d7d330&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/467429546.hd.mp4?s=181c59d9eee51d0b7f75a3feaedab8d6d0d7d330&profile_id=172&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/5586530/pictures/preview-0.jpg",
};

const basketballImages = {
	user: {
		name: "Macau Photo Agency",
		url: "https://unsplash.com/@macauphotoagency",
		id: "VllT5xAFi88",
	},
	links: {
		phone:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=80&w=200",
	},
};

const playingBasketball = {
	label: "He is playing basketball.",
	user: {
		name: "Tima Miroshnichenko",
		url: "https://www.pexels.com/@tima-miroshnichenko",
		id: 3088726,
	},
	images: {
		//a different, landscape image
		phone:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1568913431180-dcd18c7ecd3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGJhc2tldGJhbGx8ZW58MHwwfHx8MTYxODY1OTMyNg&ixlib=rb-1.2.1&q=80&w=200",
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

const playingSoccer = {
	label: "They are playing soccer",
	user: {
		name: "Tima Miroshnichenko",
		url: "https://www.pexels.com/@tima-miroshnichenko",
		id: 3088726,
	},
	images: {
		phone:
			"https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHNvY2NlcnxlbnwwfDB8fHwxNjE4NjYwMzQ5&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHNvY2NlcnxlbnwwfDB8fHwxNjE4NjYwMzQ5&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHNvY2NlcnxlbnwwfDB8fHwxNjE4NjYwMzQ5&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHNvY2NlcnxlbnwwfDB8fHwxNjE4NjYwMzQ5&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHNvY2NlcnxlbnwwfDB8fHwxNjE4NjYwMzQ5&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHNvY2NlcnxlbnwwfDB8fHwxNjE4NjYwMzQ5&ixlib=rb-1.2.1&q=80&w=200",
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
	label: "She is studying",
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
	image: "https://images.pexels.com/videos/5535977/pictures/preview-0.jpg", // a different girl here
};

const temp = {
	user: {
		name: "Zen Chung",
		url: "https://www.pexels.com/@zen-chung",
		id: 3651179,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/465238991.sd.mp4?s=b16e4e13367ee1fb86e5c6b1439844e503b6ab22&profile_id=139&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/465238991.sd.mp4?s=b16e4e13367ee1fb86e5c6b1439844e503b6ab22&profile_id=165&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/465238991.hd.mp4?s=cc7540a5ceec8b8455e6ba40115c2521beac145f&profile_id=174&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/465238991.hd.mp4?s=cc7540a5ceec8b8455e6ba40115c2521beac145f&profile_id=170&oauth2_token_id=57447761",
		fourK:
			"https://player.vimeo.com/external/465238991.hd.mp4?s=cc7540a5ceec8b8455e6ba40115c2521beac145f&profile_id=172&oauth2_token_id=57447761",
	},
};

const womanEatingBun = {
	user: {
		name: "Anna Tarazevich",
		url: "https://www.pexels.com/@anntarazevich",
		id: 2871253,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/446477836.sd.mp4?s=f6acad8b7e0a0290c48c948702158ade3fb3da2c&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/446477836.hd.mp4?s=f08d18d9385b38cbc25365278d07eb359553120f&profile_id=174&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/5076871/pictures/preview-0.jpg",
};

const coupleTastingPancake = {
	user: {
		name: "Anna Tarazevich",
		url: "https://www.pexels.com/@anntarazevich",
		id: 2871253,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/446477836.sd.mp4?s=f6acad8b7e0a0290c48c948702158ade3fb3da2c&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/446477836.hd.mp4?s=f08d18d9385b38cbc25365278d07eb359553120f&profile_id=174&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/5076871/pictures/preview-0.jpg",
};

const walkingOnWater = {
	user: {
		name: "Dey Kheireddine",
		url: "https://www.pexels.com/@deykhd",
		id: 114448,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/397754027.sd.mp4?s=a38cbaeac00a30f379044291715b15fc6e4ccd85&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/397754027.hd.mp4?s=8bdedf9ad49d8378b6f2afa56e1319195c2ee7ef&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/397754027.hd.mp4?s=8bdedf9ad49d8378b6f2afa56e1319195c2ee7ef&profile_id=175&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/3937537/pictures/preview-0.jpg",
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

const takingSelfie = {
	user: {
		name: "Dario Fernandez Ruz",
		url: "https://www.pexels.com/@dario-fernandez-ruz",
		id: 6926475,
	},
	images: {
		fourK:
			"https://images.pexels.com/videos/6876675/pictures/preview-14.jpg",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/514278617.sd.mp4?s=b95d92ac89bf4460987da155ea2576e537711427&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/514278617.hd.mp4?s=463e83bec0c97pexelsvideoc9c7aa51160f1e889b119e24e1a&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/514278617.hd.mp4?s=463e83bec0c97c9c7aa51160f1e889b119e24e1a&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/514278617.hd.mp4?s=463e83bec0c97c9c7aa51160f1e889b119e24e1a&profile_id=172&oauth2_token_id=57447761",
	},
};

const couplePlayingVideoGames = {
	user: {
		name: "Tima Miroshnichenko",
		url: "https://www.pexels.com/@tima-miroshnichenko",
		id: 3088726,
	},
	images: {
		fourK:
			"https://images.pexels.com/videos/5146312/pictures/preview-14.jpg",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/449569791.sd.mp4?s=d2da48125c04c2d4df56da258d079aeae0587827&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/449569791.hd.mp4?s=1c2c3f6af6208a0ff228a633547a4edfc2af5837&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/449569791.hd.mp4?s=1c2c3f6af6208a0ff228a633547a4edfc2af5837&profile_id=175&oauth2_token_id=57447761",
	},
};

const womanPlayingKeyboards = {
	user: {
		name: "Tima Miroshnichenko",
		url: "https://www.pexels.com/@tima-miroshnichenko",
		id: 3088726,
	},
	images: {
		fourK:
			"https://images.pexels.com/videos/6670732/pictures/preview-14.jpg",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/507016387.sd.mp4?s=9116fab1d49424af03dbea543aaf2e3cb5316b37&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/507016387.hd.mp4?s=77592a8f94b5552fe82ceeaaa700b823b1b6b96d&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/507016387.hd.mp4?s=77592a8f94b5552fe82ceeaaa700b823b1b6b96d&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/507016387.hd.mp4?s=77592a8f94b5552fe82ceeaaa700b823b1b6b96d&profile_id=172&oauth2_token_id=57447761",
	},
};

const cookingSoy = {
	label: "He is cooking",
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		phone:
			"https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGNvb2tpbmd8ZW58MHwwfHx8MTYxODY2MDU4MA&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGNvb2tpbmd8ZW58MHwwfHx8MTYxODY2MDU4MA&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGNvb2tpbmd8ZW58MHwwfHx8MTYxODY2MDU4MA&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGNvb2tpbmd8ZW58MHwwfHx8MTYxODY2MDU4MA&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGNvb2tpbmd8ZW58MHwwfHx8MTYxODY2MDU4MA&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGNvb2tpbmd8ZW58MHwwfHx8MTYxODY2MDU4MA&ixlib=rb-1.2.1&q=80&w=200",
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
	label: "She is dancing",
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
	label: "They are dancing",
	user: {
		name: "Anna Shvets",
		url: "https://www.pexels.com/@shvetsa",
		id: 1984515,
	},
	images: {
		phone:
			"https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDZ8fGRhbmNpbmd8ZW58MHwwfHx8MTYxODY1OTUxMA&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDZ8fGRhbmNpbmd8ZW58MHwwfHx8MTYxODY1OTUxMA&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDZ8fGRhbmNpbmd8ZW58MHwwfHx8MTYxODY1OTUxMA&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDZ8fGRhbmNpbmd8ZW58MHwwfHx8MTYxODY1OTUxMA&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDZ8fGRhbmNpbmd8ZW58MHwwfHx8MTYxODY1OTUxMA&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDZ8fGRhbmNpbmd8ZW58MHwwfHx8MTYxODY1OTUxMA&ixlib=rb-1.2.1&q=80&w=200",
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

const womanHoldingCat = {
	user: {
		name: "KoolShooters",
		url: "https://www.pexels.com/@kool-shooters",
		id: 3798027,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/515031606.sd.mp4?s=a825dccfa0821a9e024748f78e307b2b689230cf&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/515031606.hd.mp4?s=c5f539acfede27d4ece58572617651589c9d867a&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/515031606.hd.mp4?s=c5f539acfede27d4ece58572617651589c9d867a&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/515031606.hd.mp4?s=c5f539acfede27d4ece58572617651589c9d867a&profile_id=172&oauth2_token_id=57447761",
	},
	images: {
		phone:
			"https://images.unsplash.com/photo-1589170643699-a126dc4cb056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1589170643699-a126dc4cb056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1589170643699-a126dc4cb056?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1589170643699-a126dc4cb056?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1589170643699-a126dc4cb056?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1589170643699-a126dc4cb056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=80&w=200",
	},
	image: "https://images.pexels.com/videos/6908507/pictures/preview-0.jpg",
};

const womanDancing = {
	user: {
		name: "Polina Tankilevitch",
		url: "https://www.pexels.com/@polina-tankilevitch",
		id: 2104565,
	},
	images: {
		fourK:
			"https://images.pexels.com/videos/5385809/pictures/preview-14.jpg",
	},
	links: {
		phone:
			"https://player.vimeo.com/external/459365351.sd.mp4?s=ac402cd5c2309ef4207ff7af35d050437ec09127&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/459365351.hd.mp4?s=2afc9bf39e59167d89483d7217460ccefd8d9b73&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/459365351.hd.mp4?s=2afc9bf39e59167d89483d7217460ccefd8d9b73&profile_id=175&oauth2_token_id=57447761",
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
	label: "She is playing with the cat",
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	images: {
		//a different, landscape image
		phone:
			"https://images.unsplash.com/photo-1616781429707-a459157f9018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDR8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1616781429707-a459157f9018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDR8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1616781429707-a459157f9018?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDR8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1616781429707-a459157f9018?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDR8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1616781429707-a459157f9018?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDR8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1616781429707-a459157f9018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDR8fGdpcmwlMjB3aXRoJTIwY2F0fGVufDB8MHx8fDE2MTg2NTk3MzY&ixlib=rb-1.2.1&q=80&w=200",
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
	label: "I am working on my computer",
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
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
	// image: "https://images.pexels.com/videos/4065630/pictures/preview-0.jpg",
	images: {
		phone:
			"https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fHdvcmtpbmclMjBvbiUyMGNvbXB1dGVyfGVufDB8MHx8fDE2MTg3NjI3MDI&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fHdvcmtpbmclMjBvbiUyMGNvbXB1dGVyfGVufDB8MHx8fDE2MTg3NjI3MDI&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fHdvcmtpbmclMjBvbiUyMGNvbXB1dGVyfGVufDB8MHx8fDE2MTg3NjI3MDI&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fHdvcmtpbmclMjBvbiUyMGNvbXB1dGVyfGVufDB8MHx8fDE2MTg3NjI3MDI&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fHdvcmtpbmclMjBvbiUyMGNvbXB1dGVyfGVufDB8MHx8fDE2MTg3NjI3MDI&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fHdvcmtpbmclMjBvbiUyMGNvbXB1dGVyfGVufDB8MHx8fDE2MTg3NjI3MDI&ixlib=rb-1.2.1&q=80&w=200",
	},
};

const girlsDancing = {
	user: {
		name: "Artem Podrez",
		url: "https://www.pexels.com/@artempodrez",
		id: 2951544,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/484411755.sd.mp4?s=5c828ef63673e57df55dc08e389e19585f03d4c6&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/484411755.hd.mp4?s=49792c963d748e2563a89eaa97eff37cabc5c6c1&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/484411755.hd.mp4?s=49792c963d748e2563a89eaa97eff37cabc5c6c1&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/484411755.hd.mp4?s=49792c963d748e2563a89eaa97eff37cabc5c6c1&profile_id=172&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/6003994/pictures/preview-0.jpg",
};

const manDancing = {
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/353558973.sd.mp4?s=a662b31ec642f8c47bf80b6d911536c717c39883&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/353558973.hd.mp4?s=df2586310bf73103971099f2f05a186250a2c656&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/353558973.hd.mp4?s=df2586310bf73103971099f2f05a186250a2c656&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/353558973.hd.mp4?s=df2586310bf73103971099f2f05a186250a2c656&profile_id=172&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/2795747/pictures/preview-0.jpg",
};

const womanPracticingYoga = {
	label: "She is practicing yoga",
	user: {
		name: "Anthony Shkraba",
		url: "https://www.pexels.com/@shkrabaanthony",
		id: 2570462,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/431585425.sd.mp4?s=4016dc434e107980557339b32c9481890c63b7b1&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/431585425.hd.mp4?s=08094a47844b0c7fc5126388873e9f062113bb0f&profile_id=175&oauth2_token_id=57447761",
	},
	// image: "https://images.pexels.com/videos/4712079/pictures/preview-0.jpg",
	images: {
		phone:
			"https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fHdvbWFuJTIweW9nYXxlbnwwfDB8fHwxNjE4NzY3MjA5&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fHdvbWFuJTIweW9nYXxlbnwwfDB8fHwxNjE4NzY3MjA5&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fHdvbWFuJTIweW9nYXxlbnwwfDB8fHwxNjE4NzY3MjA5&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fHdvbWFuJTIweW9nYXxlbnwwfDB8fHwxNjE4NzY3MjA5&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fHdvbWFuJTIweW9nYXxlbnwwfDB8fHwxNjE4NzY3MjA5&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fHdvbWFuJTIweW9nYXxlbnwwfDB8fHwxNjE4NzY3MjA5&ixlib=rb-1.2.1&q=80&w=200",
	},
};

const playingTennis = {
	user: {
		name: "Anthony Shkraba",
		url: "https://www.pexels.com/@shkrabaanthony",
		id: 2570462,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/439739955.sd.mp4?s=4e14dd7d6faacf4e88ebc85235c18eb3fe477e61&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/439739955.hd.mp4?s=3fda93e099ea3072e29fb38853c117ceb4781d05&profile_id=175&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/4902145/pictures/preview-0.jpg",
};

const pupilsStudying = {
	user: {
		name: "RODNAE Productions",
		url: "https://www.pexels.com/@rodnae-prod",
		id: 3149039,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/515982498.sd.mp4?s=fe26d71666fef423dcef67aa4db3e16c7d355658&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/515982498.hd.mp4?s=904e880d6f5a8f8e2c3f9a8e974f73fe8687626b&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/515982498.hd.mp4?s=904e880d6f5a8f8e2c3f9a8e974f73fe8687626b&profile_id=175&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/6935707/pictures/preview-0.jpg",
};

const pillowFighting = {
	user: {
		name: "Tima Miroshnichenko",
		url: "https://www.pexels.com/@tima-miroshnichenko",
		id: 3088726,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/449179645.sd.mp4?s=16a46d54d05e7fd80738b35bd792084f6f9d4506&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/449179645.hd.mp4?s=0d4800e8acc787e0a1c46364bf849279e84adafd&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/449179645.hd.mp4?s=0d4800e8acc787e0a1c46364bf849279e84adafd&profile_id=175&oauth2_token_id=57447761",
	},
	image: "https://images.pexels.com/videos/5136013/pictures/preview-0.jpg",
};

const drivingInNiceScenery = {
	label: "I am driving",
	user: {
		name: "Yaroslav Shuraev",
		url: "https://www.pexels.com/@yaroslav-shuraev",
		id: 649765,
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
	// image: "https://images.pexels.com/videos/4434242/pictures/preview-0.jpg",
	images: {
		phone:
			"https://images.unsplash.com/photo-1550517636-ad7bac40dc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGRyaXZpbmd8ZW58MHwwfHx8MTYxODY2MjUwNg&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1550517636-ad7bac40dc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGRyaXZpbmd8ZW58MHwwfHx8MTYxODY2MjUwNg&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1550517636-ad7bac40dc28?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGRyaXZpbmd8ZW58MHwwfHx8MTYxODY2MjUwNg&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1550517636-ad7bac40dc28?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGRyaXZpbmd8ZW58MHwwfHx8MTYxODY2MjUwNg&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1550517636-ad7bac40dc28?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGRyaXZpbmd8ZW58MHwwfHx8MTYxODY2MjUwNg&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1550517636-ad7bac40dc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDN8fGRyaXZpbmd8ZW58MHwwfHx8MTYxODY2MjUwNg&ixlib=rb-1.2.1&q=80&w=200",
	},
};

const flyingThroughClouds = {
	user: {
		name: "",
		url: "",
		id: 0,
	},
	images: {
		phone: "",
		tablet: "",
		hdReady: "",
		fullHd: "",
	},
	links: {
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
};

const manLyingOnHammock = {
	label: "He is resting",
	alt: ["The man is resting", "He is lying on a hammock"],
	user: {
		name: "Peggy Anke",
		url: "https://www.pexels.com/@reisefreiheit",
		id: 2071672,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/459254323.sd.mp4?s=186e271ac938d6cb5a84906deb8aeb8784f1318c&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/459254323.hd.mp4?s=5c7e488819d308049bd7d038ded982a84f520155&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/459254323.hd.mp4?s=5c7e488819d308049bd7d038ded982a84f520155&profile_id=175&oauth2_token_id=57447761",
	},
	// image: "https://images.pexels.com/videos/5383550/pictures/preview-0.jpg",
	images: {
		phone:
			"https://images.unsplash.com/photo-1599956260443-2d171e2825f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fGhhbW1vY2t8ZW58MHwwfHx8MTYxODY2MjU3MQ&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1599956260443-2d171e2825f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fGhhbW1vY2t8ZW58MHwwfHx8MTYxODY2MjU3MQ&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1599956260443-2d171e2825f1?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fGhhbW1vY2t8ZW58MHwwfHx8MTYxODY2MjU3MQ&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1599956260443-2d171e2825f1?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fGhhbW1vY2t8ZW58MHwwfHx8MTYxODY2MjU3MQ&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1599956260443-2d171e2825f1?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fGhhbW1vY2t8ZW58MHwwfHx8MTYxODY2MjU3MQ&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1599956260443-2d171e2825f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fGhhbW1vY2t8ZW58MHwwfHx8MTYxODY2MjU3MQ&ixlib=rb-1.2.1&q=80&w=200",
	},
};

const womanEatingPizza = {
	label: "She is eating pizza",
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/400923981.sd.mp4?s=43985b29157d8cc3fed3769fc4308658cf594af5&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/400923981.hd.mp4?s=8b91a8081ae02a4ea050e9aca1d28fbd00c1fc8e&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/400923981.hd.mp4?s=8b91a8081ae02a4ea050e9aca1d28fbd00c1fc8e&profile_id=171&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/400923981.hd.mp4?s=8b91a8081ae02a4ea050e9aca1d28fbd00c1fc8e&profile_id=173&oauth2_token_id=57447761",
	},
	// image: "https://images.pexels.com/videos/4008535/pictures/preview-0.jpg",
	images: {
		phone:
			"https://images.unsplash.com/photo-1598610089901-ade9d3eb16e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGVhdGluZyUyMHBpenphfGVufDB8MXx8fDE2MTg2NjA4NTE&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1598610089901-ade9d3eb16e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGVhdGluZyUyMHBpenphfGVufDB8MXx8fDE2MTg2NjA4NTE&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1598610089901-ade9d3eb16e2?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGVhdGluZyUyMHBpenphfGVufDB8MXx8fDE2MTg2NjA4NTE&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1598610089901-ade9d3eb16e2?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGVhdGluZyUyMHBpenphfGVufDB8MXx8fDE2MTg2NjA4NTE&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1598610089901-ade9d3eb16e2?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGVhdGluZyUyMHBpenphfGVufDB8MXx8fDE2MTg2NjA4NTE&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1598610089901-ade9d3eb16e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDJ8fGVhdGluZyUyMHBpenphfGVufDB8MXx8fDE2MTg2NjA4NTE&ixlib=rb-1.2.1&q=80&w=200",
	},
};

const womanDrinkingCoffeeAndReading = {
	label: "She is drinking coffee",
	user: {
		name: "George Milton",
		url: "https://www.pexels.com/@george-milton",
		id: 19162611,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/519030299.sd.mp4?s=bb1d7d39cc38159bbabbc39d538cbdbd5f84ee17&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/519030299.hd.mp4?s=f28e97e3355dab569000a0d2de8026e333a6e808&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/519030299.hd.mp4?s=f28e97e3355dab569000a0d2de8026e333a6e808&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/519030299.hd.mp4?s=f28e97e3355dab569000a0d2de8026e333a6e808&profile_id=172&oauth2_token_id=57447761",
	},
	// image: "https://images.pexels.com/videos/7026657/pictures/preview-0.jpg",
	images: {
		phone:
			"https://images.unsplash.com/photo-1536914561643-9e3a7a8d063d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDF8fHdvbWFuJTIwY29mZmVlfGVufDB8MHx8fDE2MTg2NjEwNDY&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1536914561643-9e3a7a8d063d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDF8fHdvbWFuJTIwY29mZmVlfGVufDB8MHx8fDE2MTg2NjEwNDY&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1536914561643-9e3a7a8d063d?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDF8fHdvbWFuJTIwY29mZmVlfGVufDB8MHx8fDE2MTg2NjEwNDY&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1536914561643-9e3a7a8d063d?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDF8fHdvbWFuJTIwY29mZmVlfGVufDB8MHx8fDE2MTg2NjEwNDY&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1536914561643-9e3a7a8d063d?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDF8fHdvbWFuJTIwY29mZmVlfGVufDB8MHx8fDE2MTg2NjEwNDY&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1536914561643-9e3a7a8d063d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDF8fHdvbWFuJTIwY29mZmVlfGVufDB8MHx8fDE2MTg2NjEwNDY&ixlib=rb-1.2.1&q=80&w=200",
	},
};

const manThinking = {
	label: "He is thinking",
	user: {
		name: "Tima Miroshnichenko",
		url: "https://www.pexels.com/@tima-miroshnichenko",
		id: 3088726,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/483936341.sd.mp4?s=c1f313ac08f1215db4ceb22473860174f24def34&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/483936341.hd.mp4?s=028798b2b877fc92c4bcb842fc575fa76681249c&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/483936341.hd.mp4?s=028798b2b877fc92c4bcb842fc575fa76681249c&profile_id=170&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/483936341.hd.mp4?s=028798b2b877fc92c4bcb842fc575fa76681249c&profile_id=172&oauth2_token_id=57447761",
	},
	//image: "https://images.pexels.com/videos/5992471/pictures/preview-0.jpg",
	images: {
		phone:
			"https://images.unsplash.com/photo-1595907936728-57245acf036a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHRoaW5rfGVufDB8MHx8fDE2MTg2NjEyODE&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1595907936728-57245acf036a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHRoaW5rfGVufDB8MHx8fDE2MTg2NjEyODE&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1595907936728-57245acf036a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHRoaW5rfGVufDB8MHx8fDE2MTg2NjEyODE&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1595907936728-57245acf036a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHRoaW5rfGVufDB8MHx8fDE2MTg2NjEyODE&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1595907936728-57245acf036a?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHRoaW5rfGVufDB8MHx8fDE2MTg2NjEyODE&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1595907936728-57245acf036a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDl8fHRoaW5rfGVufDB8MHx8fDE2MTg2NjEyODE&ixlib=rb-1.2.1&q=80&w=200",
	},
};

const guyListeningToMusic = {
	label: "He is listening to music",
	user: {
		name: "cottonbro",
		url: "https://www.pexels.com/@cottonbro",
		id: 1437723,
	},
	links: {
		phone:
			"https://player.vimeo.com/external/507878170.sd.mp4?s=0d0d8cc41917b2b0e16472f37133d5a7841d0fe7&profile_id=164&oauth2_token_id=57447761",
		tablet:
			"https://player.vimeo.com/external/507878170.hd.mp4?s=23dd831711b0e9adf0ca7e3a66f35100c653ad0f&profile_id=174&oauth2_token_id=57447761",
		hdReady:
			"https://player.vimeo.com/external/507878170.hd.mp4?s=23dd831711b0e9adf0ca7e3a66f35100c653ad0f&profile_id=171&oauth2_token_id=57447761",
		fullHd:
			"https://player.vimeo.com/external/507878170.hd.mp4?s=23dd831711b0e9adf0ca7e3a66f35100c653ad0f&profile_id=173&oauth2_token_id=57447761",
	},
	// image: "https://images.pexels.com/videos/6700187/pictures/preview-0.jpg",
	images: {
		phone:
			"https://images.unsplash.com/photo-1594434533760-02e0f3faaa68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGxpc3RlbmluZ3xlbnwwfDB8fHwxNjE4NjYxMzk2&ixlib=rb-1.2.1&q=80&w=400",
		tablet:
			"https://images.unsplash.com/photo-1594434533760-02e0f3faaa68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGxpc3RlbmluZ3xlbnwwfDB8fHwxNjE4NjYxMzk2&ixlib=rb-1.2.1&q=80&w=1080",
		hdReady:
			"https://images.unsplash.com/photo-1594434533760-02e0f3faaa68?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGxpc3RlbmluZ3xlbnwwfDB8fHwxNjE4NjYxMzk2&ixlib=rb-1.2.1&q=85",
		fullHd:
			"https://images.unsplash.com/photo-1594434533760-02e0f3faaa68?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGxpc3RlbmluZ3xlbnwwfDB8fHwxNjE4NjYxMzk2&ixlib=rb-1.2.1&q=85",
		fourK:
			"https://images.unsplash.com/photo-1594434533760-02e0f3faaa68?ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGxpc3RlbmluZ3xlbnwwfDB8fHwxNjE4NjYxMzk2&ixlib=rb-1.2.1",
		thumb:
			"https://images.unsplash.com/photo-1594434533760-02e0f3faaa68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTI2M3wwfDF8c2VhcmNofDV8fGxpc3RlbmluZ3xlbnwwfDB8fHwxNjE4NjYxMzk2&ixlib=rb-1.2.1&q=80&w=200",
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
	wavingCrashing,

	catWalkingOnPiano,
	practicingJudo,
	playingBasketball,
	playingSoccer,
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
	flyingThroughClouds,
	flyingThroughCloudsOriginal,
	walkingOnWater,
	womanEatingBun,
	coupleTastingPancake,
	manLyingOnHammock,
	womanEatingPizza,
	womanDrinkingCoffeeAndReading,
	manThinking,
	guyListeningToMusic,
	womanPracticingYoga,

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
