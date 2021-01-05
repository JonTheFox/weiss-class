const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	type Image {
		url: String!
		title: String
		author: String
	}
	type Gif {
		url: String!
		title: String
		author: String
	}
	type Video {
		url: String!
		title: String
		author: String
	}

	type Slide {
		id: ID
		p1: String
		p2: String
		title: String
		header: String
		subheader: String
		paragraphs: [String]
		img: Image
		gif: Gif
		video: Video
	}

	type EndUser {
		id: ID
		first_name: String
		middle_name: String
		last_name: String
		role: String
		# ("teacher", "student" & "platform")
	}

	type Room {
		id: ID
		name: String
		students: [EndUser]
		teachers: [EndUser]
		platforms: [EndUser]
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		slides: [Slide]
		rooms: [Room]
	}
`;

module.exports.typeDefs = typeDefs;
