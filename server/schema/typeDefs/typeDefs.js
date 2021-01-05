const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	type Image {
		url: String!
		title: String
		author: String
	}

	type Slide {
		title: String
		subtitle: String
		img: Image
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		slides: [Slide]
	}
`;

module.exports.typeDefs = typeDefs;
