const User = require('../../models/User');
const Role = require('../../models/Role');
const bcrypt = require('bcrypt');
const { 
	validateCreateUserInput, 
	validateEditUserInput, 
	validateUserEmailExist  
} = require('../../validation/users');

module.exports = {

	Role: {
		users: async (role) => {
			return await User.find({roles: role._id});
		}
	},
  
	User: {
		roles: (user) => {
			if(user.docs)
				 return user.docs.roles.map((role) => ({ __typename: "role", _id: role }));
			else {
				return user.roles.map((role) => ({ __typename: "role", _id: role }));
			}
		}
	},

	Query: {
		
		user: async (parent, { _id }, context, info) => {
			return await User.findById(_id); 
		},

		users: async (parent, args, context, info) => {
			return await User.find();
		},
		
		usersPagination: async (parent, {limit, page, sort = {}, search}, context, info) => {
			let queryOptions = {};
			if(search)
			queryOptions = {
				$or: [{
					name: {
						'$regex': search,
						'$options': 'i'
					}
				}, {
					email: {
						'$regex': search,
						'$options': 'i'
					}
				}]
			}
			const user =  await User.paginate(queryOptions, { 
				page: page, 
				limit: limit, 
				sort: {[sort.fieldName]: sort.sortType}
			})
			return user;
		}

	}, 

	Mutation: {
		
		createUser:  async (parent, { user }) =>  {
			const validator = validateCreateUserInput(user);
			if (validator.passes()) {
				const {email } = user;
				if(await validateUserEmailExist(email)) {
					return {
						status: false,
						message: 'Email already registered.!',
						errors: { email: ['Email already registered.!']}
					};
				}
				let newUser = new User(user);
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				newUser.password = hash;
				try {
					newUser = await newUser.save();
					return {
						status: true,
						message: 'User has been successfully created',
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

		updateUser:  async (parent, { user }) =>  {
			const validator = validateEditUserInput(user);
			if (validator.passes()) {
				const {email, _id} = user;
				if(await validateUserEmailExist(email, _id)) {
					return {
						status: false,
						message: 'Email already registered.!',
						errors: { email: ['Email already registered.!']}
					};
				}
				
				try {
					updateUser = await User.findByIdAndUpdate(_id, user, { new: true });
					return {
						status: true,
						message: 'User has been successfully updated',
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


		deleteUser:  async (parent, { _id }) =>  {
			if (_id) {
				try {
					if(await User.findByIdAndRemove(_id))
						return {
							status: true,
							message: 'User has been successfully deleted',
						} 
					else 
					return {
						status: true,
						message: 'User already deleted',
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
					message: 'User Id Fields required',
					errors: {user: ['Id Fields required']}
				};
			}	
					
		},

	}

};
