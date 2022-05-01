const { gql } = require("apollo-server");

module.exports = gql`

	type Role @key(fields: "_id") {
		_id: ID!
		name: String!
		active: String
	}

	type RolePagination {
		docs: [Role]
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

	type Error {
		name: [String]
	}

  	type RoleResponse {
		status: Boolean
		message: String
		errors: Error
	}
	
	input RoleData {
		_id: String
		name: String!
		active: String
	}

	enum SortFieldType {
		DESC
		ASC
	}

	input Sort {
		fieldName: String,
		sortType: SortFieldType
	}

	extend type Query {
		role(_id: ID!): Role
		roles: [Role]
		rolePagination(limit: Int!, page: Int!, sort: Sort, search: String): RolePagination
	}

  	extend type Mutation {
		createRole(role: RoleData): RoleResponse
		updateRole(role: RoleData): RoleResponse
		deleteRole(_id: String): RoleResponse
	}
`;
