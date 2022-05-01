require('dotenv').config();
const User = require('../../models/User');
const ResetPassword = require('../../models/ResetPassword');
const Role = require('../../models/Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/key');
const cryptoJS = require("crypto-js");
const forgotEmail = require('../../emails/ForgotEmail');
const sendEmail = require('../../emails/mailTransporter');
const moment = require('moment'); // require
const { 
	validateRegisterUserInput
} = require("../../validation/auth");

module.exports = {
  	Mutation: {
		
		register:  async (parent, { register }) =>  {
			const validator = validateRegisterUserInput(register);
			if (validator.passes()) {
				const {name, email, password} = register;
				let user = new User({
					name: name,
					email: email,
				});
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				user.password = hash;
				try {
					user = await user.save();
					return {
						status: true,
						message: 'User has been successfully created',
					}
				} catch (error) {
					return {
						status: false,
						message: 'Something went to wrong!.',
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

		login:  async (parent, { email, password }) =>  {
			const user = await User.findOne({ email }).populate("roles");
			if (user) {
				const isMatch = await bcrypt.compare(password, user.password); 
				if (isMatch) {
					const payload = {
						_id: user._id,
						name: user.name,
						email: user.email,
						avatar: user.avatar,
						secretCode: user.secretCode,
						mobileNumber: user.mobileNumber,
						roles: user.roles,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt
					};
					const token  = await jwt.sign(payload, keys.secretKey, {expiresIn: 3600});
					return {
						token: 'Bearer ' + token,
						status: true,
						message: 'successfully logged user',
					};
				} else {
					return {
						token: '',
						status: false,
						message: 'Password Incorrect',
						errors: {
							password: ['Password Incorrect']
						}
					};
				}
				
			} else {
				return {
					token: '',
					status: false,
					message: 'User not found',
					errors: {
						email: ['User not found'],
					}
				};
			}
		}, 

		changePassword:  async (parent, { email, password, newPassword }) =>  {
			let user = await User.findOne({ email });
			if(!(user))
				return {
					status: false,
					message: 'This email not register.',
					errors: {
						email: ['This email not register.']
					}
				};
			const isMatch = await bcrypt.compare(password, user.password); 
			if (isMatch) {
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(newPassword, salt);
				user.password = hash;
				try {
					user = await user.save();
				} catch (error) {
					console.log(error);
					return {
						status: false,
						message: 'Something went to wrong!.',
					};
				}
				return {
					status: true,
					message: 'Password has been successfully changed',
				};

			}
			else {
				return {
					status: false,
					message: 'Password Incorrect',
					errors: {
						password: ['Password Incorrect']
					}
				};
			}
		},

		forgotPassword:  async (parent, { email }) =>  {
			const user = await User.findOne({ email });
			if (user) {
				const data = {_id: user._id, email: email};
				const token = cryptoJS.AES.encrypt(JSON.stringify(data), keys.secretKey).toString();
				let resetPassword = new ResetPassword({
					user: user._id,
					token: token,
					expire: moment.now()
				});
				resetPassword = await resetPassword.save();
				if(resetPassword) {
					const resetPasswordLink = `${process.env.HOST_URI}/reset-password?token=${token}`;
				    const emailBody = forgotEmail(email, resetPasswordLink);
					const emailDetail = await sendEmail({to: "nikulphp11@gmail.com", subject: "Reset password", html: emailBody});
					return {
						status: true,
						message: 'Reset link successfully sent to your email.', 
					};
				}
			}
			return {
				status: false,
				message: 'User not found.',
				errors: {
					email: ['User not found.']
				}
			};
		},

		resetPassword:  async (parent, { token, password }) =>  {
			const date = moment(Date.now()).subtract(1, 'hours');
			const resetPassword = await ResetPassword.findOne({ token: token, expire: { $gte: date }}).sort({createdAt: -1});
			if (resetPassword) {
				let user = await User.findById(resetPassword.user);
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				user.password = hash;
				try {
					user = await user.save();
				} catch (error) {
					return {
						status: false,
						message: 'Something went to wrong!.',
					};
				}
				return {
					status: true,
					message: 'Password has been successfully updated',
					
				};
			}
			else {
				return {
					status: false,
					message: 'Token code has been expired',
					errors: {
						user: ['Token code has been expired']
					}
				};
			}
			
		}
  	}
};
