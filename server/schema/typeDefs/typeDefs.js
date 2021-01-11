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
		img: Image
		role: String
		# ("teacher", "student" & "platform")
	}

	type Room {
		id: ID
		roomKey: ID
		name: String
		students: [EndUser]
		teachers: [EndUser]
		platforms: [EndUser]
		img: Image
		gif: Gif
		video: Video
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each.
	type Query {
		slides: [Slide]
		slide: [Slide]
		rooms: [Room]
	}
`;

module.exports.typeDefs = typeDefs;
