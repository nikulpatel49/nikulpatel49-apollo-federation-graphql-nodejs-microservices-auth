const Role = require('../../models/Role');
const bcrypt = require('bcrypt');
const { 
	validateCreateRoleInput,
	validateEditRoleInput,
	validateRoleNameExist
} = require('../../validation/roles');
module.exports = {
  	Role: {
		async __resolveReference(object) {
		const role = await Role.findById(object._id);
		return role;
		}
	},

  	Query: {
		role: async (parent, { _id }, context, info) => {
			const role = await Role.findById(_id);
			return role;
    	},

		roles: async (parent, args, context, info) => {
			const roles = await Role.find();
			return roles;
		},

		rolePagination: async (parent, {limit, page, sort = {}, search}, context, info) => {
		
			let queryOptions = {};
			if(search)
			queryOptions = {
				$or: [{
					name: {
						'$regex': search,
						'$options': 'i'
					}
				}]
			}
			const roles =  await Role.paginate(queryOptions, { 
				page: page, 
				limit: limit, 
				sort: {[sort.fieldName]: sort.sortType}
			})
			return roles;
		}

  	},

	
	Mutation: {
		
		createRole:  async (parent, { role }) =>  {
			const validator = validateCreateRoleInput(role);
			if (validator.passes()) {
				const {name } = role;
				if(await validateRoleNameExist(name)) {
					return {
						status: false,
						message: 'Name already available.!',
						errors: { name: ['Name already available.!']}
					};
				}
				let newRole= new Role(role);
				try {
					newRole = await newRole.save();
					return {
						status: true,
						message: 'Role has been successfully created',
					}
				} catch (error) {
					return {
						status: false,
						message: JSON.stringify(error),
					};
				}
			}
			else {
				return {
					status: false,
					message: 'Fields required',
					errors: validator.errors.errors
				};
			}			
		}, 

		updateRole:  async (parent, { role }) =>  {
			const validator = validateEditRoleInput(role);
			if (validator.passes()) {
				const {name, _id} = role;
				if(await validateRoleNameExist(name, _id)) {
					return {
						status: false,
						message: 'Name already available.!',
						errors: { name: ['Name already available.!']}
					};
				}
				
				try {
					updateRole = await Role.findByIdAndUpdate(_id, user, { new: true });
					return {
						status: true,
						message: 'Role has been successfully updated',
					}
				} catch (error) {
					return {
						status: false,
						message: JSON.stringify(error),
					};
				}
			}
			else {
				return {
					status: false,
					message: 'Fields required',
					errors: validator.errors.errors
				};
			}			
		},


		deleteRole:  async (parent, { _id }) =>  {
			if (_id) {
				try {
					if(await Role.findByIdAndRemove(_id))
						return {
							status: true,
							message: 'Role has been successfully deleted',
						} 
					else 
					return {
						status: true,
						message: 'Role already deleted',
					}
					

				} catch (error) {
					return {
						status: false,
						message: JSON.stringify(error),
					};
				}
			}
			else {
				return {
					status: false,
					message: 'Role Id Fields required',
					errors: {user: ['Id Fields required']}
				};
			}	
					
		},

	}

};
