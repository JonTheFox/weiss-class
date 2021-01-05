const slides = [
	{
		header: "Present Simple",
		subheader: "Do / Does",
	},
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		slides: () => slides,
	},
};

module.exports.resolvers = resolvers;
