const { gql } = require('apollo-server-express');

export const typeDefs = gql`
	type User {
		id: Int
		email: String
		name: String
	}

	type Query {
		allUsers: [User!]!
		hello: String
		bye: String
	}
`;

// module.exports = typeDefs;
