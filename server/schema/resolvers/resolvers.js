const SLIDES = [
	{
		header: "Present Simple",
		subheader: "Do / Does",
	},
];

const ROOMS = [
	{
		name: "The Cloudy Horizon",
		teachers: [{ first_name: "dorit" }],
	},
	{
		name: "Misty Mountain",
		teachers: [{ first_name: "elkana" }],
	},
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		slides: () => SLIDES,
		rooms: () => ROOMS,
	},
};

module.exports.resolvers = resolvers;
