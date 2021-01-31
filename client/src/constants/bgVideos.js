const bgVideos = [
	{
		originalTitle: "Flying into clouds, above clouds and around clouds",
		url: "https://www.youtube.com/watch?v=VmMYfAR21KY",
		startSecond: 60 * 1 + 38,
		stopSecond: 60 * 2 + 16,
		groupName: "Clouds",
		opacity: 0.3,
	},
	{
		originalTitle: "Flying Above the Clouds",
		url: "https://www.youtube.com/watch?v=6AJl7DsL-1Y",
		startSecond: 15,
		stopSecond: 60 * 5 + 50,
		groupName: "Clouds",
	},

	{
		originalTitle:
			"Softest Beach Sounds from the Tropics - Ocean Wave Sounds for Sleeping, Yoga, Meditation, Study",
		title: "Softest Beach Sounds from the Tropics",
		url: "https://www.youtube.com/watch?v=B1T06UhcX0Q",
		groupName: "Beach",
	},

	{
		originalTitle: "Relajarse: Sonidos del Mar, Playa HD - Relajación",
		title: "Relajarse",
		url: "https://www.youtube.com/watch?v=xkUyIYfmTmg",
		groupName: "Beach",
		opacity: 0.9,
	},

	{
		originalTitle:
			"Tropical Island Beach Ambience Sound - Thailand Ocean Sounds For Relaxation And Holiday Feeling",
		title: "Tropical Island Beach, Thailand",
		url: "https://www.youtube.com/watch?v=DGIXT7ce3vQ",
		startSecond: 5,
		groupName: "Beach",
	},
	{
		originalTitle: "Relaxar - Som do Mar e Praia Linda - Para Relaxar",
		title: "Relaxar",
		url: "https://www.youtube.com/watch?v=NKDhjZQFdS0",
		startSecond: 5,
		groupName: "Beach",
	},

	{
		originalTitle:
			"Onda Beach Relaxing Waves - Dominican Ocean Sounds Will Help You Unwind",
		title: "Dominican Ocean Beach",
		url: "https://www.youtube.com/watch?v=Xn8tufsbSz0",
		groupName: "Beach",
	},
	{
		originalTitle:
			"Olas del Paraíso - Playa Hermosa con Sonidos Relajantes del Mar sin Música",
		title: "Olas del Paraíso",
		url: "https://www.youtube.com/watch?v=2IcdEJ4Jhs0",
		groupName: "Beach",
	},
	{
		originalTitle:
			"Relaxing 3 Hour Video of A Tropical Beach with Blue Sky White Sand and Palm Tree",
		title: "Tropical Beach with Palm Tree",
		url: "https://www.youtube.com/watch?v=qREKP9oijWI",
		groupName: "Beach",
		opacity: 0.95,
	},

	{
		originalTitle: "Relaxing Music with Nature Sounds - Waterfall HD",
		title: "Waterfall",
		url: "https://www.youtube.com/watch?v=lE6RYpe9IT0",
		groupName: "Waterfall",
	},
	{
		originalTitle:
			"Relaxing Concentration Music: Study, Work – Focus – Soothing HD Nature Video",
		title: "Gorgeous Waterfall",
		url: "https://www.youtube.com/watch?v=SDZJElr9gFs",
		groupName: "Waterfall",
		startSecond: 33,
		stopSecond: 60 * 3,
	},
	{
		originalTitle:
			"Relaxing River Sounds - Gentle River, Nature Sounds, Singing Birds Ambience",
		title: "Running River Next to Mountains",
		url: "https://www.youtube.com/watch?v=LiiYMEWKVnY",
		groupName: "River",
	},
	{
		originalTitle:
			"Relaxing Music & Campfire - Relaxing Guitar Music, Soothing Music, Calm Music",
		title: "Campfire",
		url: "https://www.youtube.com/watch?v=EqqpcFj8G-s",
		startSecond: 11,
		groupName: "Campfire",
	},
	{
		originalTitle:
			"Crackling Mountain Campfire with Relaxing River, Wind and Fire Sounds (HD)",
		title: "Mountain Campfire",
		url: "https://www.youtube.com/watch?v=5gBJrZmbGLo",
		startSecond: 30,
		//stopSecond: 60 * 2 + 16,
		groupName: "Campfire",
	},

	{
		originalTitle:
			"Calmsound Antarctic Wind - 10 Hour Katabatic Wind Sounds for Sleep and Relaxation",
		title: "Anarctic Wind",
		url: "https://www.youtube.com/watch?v=9NmeAQruCgs",
		startSecond: 2 * 60,
		groupName: "Snow",
	},
	{
		originalTitle:
			"3 HOURS of Relaxing Snowfall: Beautiful Falling Heavy Snow - The Best Relax Music 1080p HD",
		title: "Falling Snow In a Forest",
		url: "https://www.youtube.com/watch?v=eS2ssUROF5o",
		startSecond: 6,
		groupName: "Snow",
	},
	{
		originalTitle:
			"Driving in Switzerland 6: From Grindelwald to Lauterbrunnen | 4K 60fps",
		title: "Switzerland Drive",
		url: "https://www.youtube.com/watch?v=b-WViLMs_4c",
		startSecond: 4 * 60 + 51,
		groupName: "Driving",
	},
	{
		originalTitle:
			"Zion Nationalpark - Scenic Drive, Utah - Full Ride - Onboard Front View",
		title: "Zion Nationalpark Drive",
		url: "https://www.youtube.com/watch?v=rXKt0qhFN-Y",
		startSecond: 60 * 1.5,
		stopSecond: 60 * 23,
		groupName: "Driving",
	},

	{
		originalTitle:
			"We bit off MUCH more than we could pedal | Mountain Biking Downieville",
		title: "Cycling Down a Mountain",
		url: "https://www.youtube.com/watch?v=xQTsfbUvWc4",
		startSecond: 60 * 4 + 28,
		stopSecond: 60 * 12 + 25,
		groupName: "Driving",
	},

	{
		originalTitle:
			"Full Race Replay: 2020 Daytona 500 | NASCAR at Daytona International Speedway",
		title: "Daytona Beach NASCAR race",
		url: "youtube.com/watch?v=tmfKfEZGxH4",
		startSecond: 60 * 32 + 47,
		stopSecond: 60 * 56 + 30,
		groupName: "Racing",
	},

	{
		originalTitle: "The Best Surfing Clips of 2019",
		title: "The Best Surfing Clips of 2019",
		url: "https://www.youtube.com/watch?v=hwLo7aU1Aas",
		startSecond: 18,
		groupName: "Surfing",
	},

	{
		originalTitle:
			"Sleep Music in Underwater Paradise: Deep Relaxing Music, Sleeping Music, Meditation Music 147",
		title: "Underwater Paradise",
		url: "https://www.youtube.com/watch?v=OVct34NUk3U",
		startSecond: 60 * 8,
		groupName: "Underwater",
	},
	{
		originalTitle: "Michael Jordan Top 50 All Time Plays",
		title: "Michael Jordan's Best Plays",
		url: "https://www.youtube.com/watch?v=LAr6oAKieHk",
		startSecond: 23,
		groupName: "Sports",
	},
];

export default bgVideos;
