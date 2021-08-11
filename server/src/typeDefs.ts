const { gql } = require('apollo-server-express');

export const typeDefs = gql`
	type User {
		id: Int
		name: String
		email: String
		password: String
	}

	input CreateUserInput {
		name: String!
		email: String!
		password: String!
	}

	input LoginUserInput {
		email: String!
		password: String!
	}

	type AuthPayload {
		token: String!
		user: User!
	}

	type Query {
		getAllUsers: [User!]!
		getUser(id: Int!): User
		login(data: LoginUserInput!): AuthPayload!
	}

	type Mutation {
		createUser(data: CreateUserInput): AuthPayload!
	}
`;
