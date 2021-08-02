const { gql } = require('apollo-server-express');

export const typeDefs = gql`
	type User {
		id: Int
		email: String
		name: String
	}

	type Query {
		getAllUsers: [User!]!
		getUser(id: Int!): User
		# hello: String
		# bye: String
	}
`;
