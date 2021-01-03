const animals = {
	cat: {
		label: "cat",
		imgURL:
			"https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
		small:
			"https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
		regular:
			"https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
		pet: "true",
		i: undefined,
	},

	tiger: {
		label: "tiger",
		imgURL:
			"https://images.unsplash.com/photo-1494979362559-7f9efdc9b88c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=37286ce51aa2912f83a8c083c486dc8c",
	},
	lion: {
		label: "lion",
		imgURL:
			"https://images.unsplash.com/photo-1519930758798-b0ff6ae437fb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=1a3bb397106b0c034b786ea779d663ad",
	},
	dog: {
		label: "dog",
		pet: "true",
		imgURL:
			"https://images.unsplash.com/photo-1536812948701-c0f42efab024?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
		small:
			"https://images.unsplash.com/photo-1536812948701-c0f42efab024?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
		regular:
			"https://images.unsplash.com/photo-1536812948701-c0f42efab024?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ",
	},
	fox: {
		label: "fox",
		imgURL:
			"https://images.unsplash.com/photo-1501707305551-9b2adda5e527?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=c3d26fe25b92da3a6e61b5b85e4d36c4",
	},
	wolf: {
		label: "wolf",
		imgURL:
			"https://images.unsplash.com/photo-1510853675132-58241c941e4f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=d2d233dc185cdb03f221a74533393ab6",
	},
	monkey: {
		label: "monkey",
		imgURL:
			"https://images.unsplash.com/photo-1519309755164-6d2b3dc95ead?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=38b91d97e272d17efcfb8aec09a753b2",
	},
	gorilla: {
		label: "gorilla",
		imgURL:
			"https://images.unsplash.com/photo-1515513284006-9a59075694b7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=b636fb4de4c80a441b1fb80cb067817f",
	},
	elephant: {
		label: "elephant",
		imgURL:
			"https://images.unsplash.com/photo-1532301371038-85df63be6e13?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=d7d8648e302571b800a5c111a5fef746",
	},
	giraffe: {
		label: "giraffe",
		imgURL:
			"https://images.unsplash.com/photo-1535082186814-5c60484a6fd4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=772e9280b21b402e562c651707fd97bb",
	},
	kangaroo: {
		label: "kangaroo",
		imgURL:
			"https://images.unsplash.com/photo-1521713164357-b4e9873b7e1d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=54f3f59c08f8f9048290417a0b40bc3e",
	},
	zebra: {
		label: "zebra",
		imgURL:
			"https://images.unsplash.com/photo-1535076404789-9c49ee899990?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=17dff7c59abe70af1298cccc6e6269c7",
	},
	bear: {
		label: "bear",
		imgURL:
			"https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=64c18d8f9ec89d74ce89e55216f87c6f",
	},
	cow: {
		label: "cow",
		imgURL:
			"https://images.unsplash.com/photo-1534301682011-4ce2a7074a8b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=f6f0e80f64e9fd1324e3cdcb3746b125",
	},
	bull: {
		label: "bull",
		imgURL:
			"https://images.unsplash.com/photo-1516036255157-d9217d64af8c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=51654a1b5bb0e9cafa86af65f44e574e",
	},
	sheep: {
		label: "sheep",
		imgURL:
			"https://images.unsplash.com/photo-1530407150178-2602a082ee1f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=a3a9963b4e34eb47e66f030110266fa9",
	},
	goat: {
		label: "goat",
		imgURL:
			"https://images.unsplash.com/photo-1446082488256-bfc5e2b5f95c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=b052478d0dad7fbe2f78ec5f132342ad",
	},
	pig: {
		label: "pig",
		imgURL:
			"https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=2d54b3b9696fce98921da05b0a34ee29",
	},
	camel: {
		label: "camel",
		imgURL:
			"https://images.unsplash.com/photo-1539166897395-6f8ca365f838?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=64933d7ff4f5d9472bf49fe07000e6a9",
	},
	deer: {
		label: "deer",
		imgURL:
			"https://images.unsplash.com/photo-1504455883034-79a2b2931434?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=70f93f9dff850e1db210b134e6a84e96",
	},
	horse: {
		label: "horse",
		imgURL:
			"https://images.unsplash.com/photo-1543221852-0eb6ba76941f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=55738f0569356c3ca1ca731363cd96f3",
	},
	donkey: {
		label: "donkey",
		imgURL:
			"https://images.unsplash.com/photo-1534691680161-2cb6a2f0a731?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=e444b9f7e35f011e5e2258fd89df642e",
	},
	chicken: {
		label: "chicken",
		imgURL:
			"https://images.unsplash.com/photo-1495696386015-f371820f82a6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=dbb52dcd31703e42afb1c30ef8a2118a",
	},
	chick: {
		label: "chick",
		imgURL:
			"https://images.unsplash.com/photo-1523761467347-327dfb5a16f6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=28d21a33e975f4c164ada90ede84803c",
	},
	bird: {
		label: "bird",
		imgURL:
			"https://images.unsplash.com/photo-1534421908380-b5a1c15a0ef2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=fc0306b06a5a64655b2e051a2320f54b",
	},
	pigeon: {
		label: "pigeon",
		imgURL:
			"https://images.unsplash.com/photo-1522508412184-62d7e76defb4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=26a4c3f50ef1ec5a25a4f673725d5779",
	},
	parrot: {
		label: "parrot",
		imgURL:
			"https://images.unsplash.com/photo-1505866913883-dd4d9729cc87?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=c7141434aac16aa2757b7f42d49ceb70",
	},
	vulture: {
		label: "vulture",
		imgURL:
			"https://images.unsplash.com/photo-1453743327117-664e2bf4e951?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=0f1f5df9ce2456665ec187fb676c6ba1",
	},
	eagle: {
		label: "eagle",
		imgURL:
			"https://images.unsplash.com/photo-1514934709707-a551adcf8f48?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=5a6e8cfa1c03a17c08d64e3e422373a7",
	},

	duck: {
		label: "duck",
		imgURL:
			"https://images.unsplash.com/photo-1507929486504-7cc924ef7461?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=7a6f9a3737c4674569266b1d4ec0078a",
	},
	goose: {
		label: "goose",
		imgURL:
			"https://images.unsplash.com/photo-1539009220664-55e59f327331?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=84eeeb243d5573a26b465e4b8e24d31d",
	},
	swan: {
		label: "swan",
		imgURL:
			"https://images.unsplash.com/photo-1496147956370-9486a6fc2208?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=08b426110274c28815f2cb59896a805f",
	},

	stork: {
		label: "stork",
		imgURL:
			"https://images.unsplash.com/photo-1531209681261-8599e8fbe7d0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=a596a245641930391588833c3edeaf72",
	},

	flamingo: {
		label: "flamingo",
		imgURL:
			"https://images.unsplash.com/photo-1513842030755-b1e9c0070515?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=aa666b220fc2bdf28ba554934f610f40",
	},
	penguin: {
		label: "penguin",
		imgURL:
			"https://images.unsplash.com/photo-1474917399228-e8ed648915c2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=c5304ff683715f63095e084b7d7b7561",
	},
	fish: {
		label: "fish",
		imgURL:
			"https://images.unsplash.com/photo-1523990016249-31c39d461024?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=84d9deab68f56bb9e430a7ac01d07b48",
		pet: "true",
	},
	dolphin: {
		label: "dolphin",
		imgURL:
			"https://images.unsplash.com/photo-1513545405020-acc24d818ffc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=d62bcbd6365783c3c884717fd14365ea",
	},
	whale: {
		label: "whale",
		imgURL:
			"https://images.unsplash.com/photo-1503617798069-7c12038406d0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=aff25b04a95ea7e09a5d9c9b17bbc995",
	},
	alligator: {
		label: "alligator",
		imgURL:
			"https://images.unsplash.com/photo-1477764085876-1df3917e052f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=8234ec0d4587af2c70db54795b2b17f8",
	},
	lizard: {
		label: "lizard",
		imgURL:
			"https://images.unsplash.com/photo-1502874964116-ba3c7e2c4f6f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=a4bde2cc7302b94aa1046133fa6cc9d8",
	},
	chameleon: {
		label: "chameleon",
		imgURL:
			"https://images.unsplash.com/photo-1456489546743-d58605863e05?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=957aab443725044a64eb255a8259e82e",
	},
	crab: {
		label: "crab",
		imgURL:
			"https://images.unsplash.com/photo-1484715340216-6e77040b1852?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=96d069422c02927f0f0648f01f25fdc6",
	},
	snake: {
		label: "snake",
		imgURL:
			"https://images.unsplash.com/photo-1535313072129-1d68ee8d6a24?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=14ff9d777f01bfc380be9b3b01a7a3cc",
	},

	hedgehog: {
		label: "hedgehog",
		imgURL:
			"https://images.unsplash.com/photo-1541949432307-5b17dd371cf4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=4d2ff17bd0072f33665f210d234001a9",
	},
	turtle: {
		label: "turtle",
		imgURL:
			"https://images.unsplash.com/photo-1523214463772-54cd4251e790?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=cb4311f7e51269def1b7fa78dbaefe0a",
	},
	rabbit: {
		label: "rabbit",
		imgURL:
			"https://images.unsplash.com/photo-1509085443839-d64c1b6eb61b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=3a0c760f829bb2b059cfecee437251d4",
		pet: "true",
	},
	squirrel: {
		label: "squirrel",
		imgURL:
			"https://images.unsplash.com/photo-1514058494598-5f9056802a16?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=989ce4cf49342a9badd43f75e73c01e0",
	},
	mouse: {
		label: "mouse",
		imgURL:
			"https://images.unsplash.com/photo-1516247897763-0f4ad94c2668?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=4d362b5cba567ee08f557c7dca4f5169",
	},
	bat: {
		label: "bat",
		imgURL:
			"https://images.unsplash.com/photo-1538630834610-87751cd747f4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=264b462b1867dc34e6cc25d003a256b4",
	},
	owl: {
		label: "owl",
		imgURL:
			"https://images.unsplash.com/photo-1530436958107-bf4ce16ad954?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=9cc3e0ffd1602a23ad36b21629c43969",
	},

	bee: {
		label: "bee",
		imgURL:
			"https://images.unsplash.com/photo-1534512547189-5944d6fd30e8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=97f7e442544ce0f2bcebc182659a24fd",
	},
	fly: {
		label: "fly",
		imgURL:
			"https://images.unsplash.com/photo-1516793985388-6155f13d54ee?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=75d0257c3a8dac182661986234a36bbd",
	},

	ant: {
		label: "ant",
		imgURL:
			"https://images.unsplash.com/photo-1425065106899-11d69663395a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=eec5e6d51a8b09d3d34c343af7e91a8a",
	},
	beetle: {
		label: "beetle",
		imgURL:
			"https://images.unsplash.com/photo-1540171213245-8653297cbda1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=cfc706a731d450a176b8d118dd7565c3",
	},
	ladybug: {
		label: "ladybug",
		imgURL:
			"https://images.unsplash.com/photo-1470317596697-cbdeda56f999?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=3eda57811e7baab9399a37583bd6dec5",
	},
	grasshopper: {
		label: "grasshopper",
		imgURL:
			"https://images.unsplash.com/photo-1509967733342-437077d8e41a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=df8b2434111a0222df1c9d52d3ba6b5b",
	},
	spider: {
		label: "spider",
		imgURL:
			"https://images.unsplash.com/photo-1521123946922-eb346044f2ec?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjMxMjYzfQ&s=27436bd5b68a71f986db7e10874ca708",
	},
};

export default animals;
