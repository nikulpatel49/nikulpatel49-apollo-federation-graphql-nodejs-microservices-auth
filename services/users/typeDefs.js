const { gql } = require("apollo-server");

module.exports = gql`
  
	type User {
		_id: ID!
		name: String!
		email: String!
		mobileNumber: String
		password: String
		avatar: String
		roles: [Role]
		loginType: String
		emailVerified: Boolean
		secretCode: String
		emailVerificationCode: String
		phoneVerified: Boolean
		phoneVerificationCode: String
		deletedAt: String
	}

	type UserPagination {
		docs: [User]
		totalDocs: Int,
		limit: Int,
		totalPages: Int,
		page: Int,
		pagingCounter: Int,
		hasPrevPage: Boolean,
		hasNextPage: Boolean,
		prevPage: Boolean,
		nextPage: Int
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

	type Errors {
		name: [String]
		email: [String]
		password: [String]
		user: [String]
	}
	
	input UserData {
		_id: String
		name: String!
		email: String!
		password: String
		mobileNumber: String
		roles: [String]
	}

	enum SortFieldType {
		DESC
		ASC
	}

	input Sort {
		fieldName: String,
		sortType: SortFieldType
	}

	extend type Role @key(fields: "_id") {
		_id: ID! @external
		users: [User]
	}

	extend type Query {
		user(_id: ID!): User 
		users: [User]
		usersPagination(limit: Int!, page: Int!, sort: Sort, search: String): UserPagination
	}

	extend type Mutation {
		createUser(user: UserData): Response
		updateUser(user: UserData): Response
		deleteUser(_id: String): Response
	}

`;
