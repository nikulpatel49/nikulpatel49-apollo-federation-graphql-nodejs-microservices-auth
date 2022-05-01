const { gql } = require("apollo-server");

module.exports = gql`

	type Errors {
		name: [String]
		email: [String]
		password: [String]
		user: [String]
	}

  	type Response {
		token: String
		status: Boolean
		errors: Errors
		message: String
		name: String
		email: String
		password: String
  	}

	input register {
		name: String!
		email: String!
		password: String!
	}

	extend type Mutation {
		register(register: register!): Response
		login(email: String!, password: String!): Response
		changePassword(email: String!, password: String!, newPassword: String!): Response
		forgotPassword(email: String!): Response
		resetPassword(token: String!, password: String!): Response
	}
`;
