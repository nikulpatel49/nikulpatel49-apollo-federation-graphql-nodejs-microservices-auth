const Validator = require('validatorjs');
const User = require('../models/User');

const validateCreateUserInput = (data) => {
    const rules = {
		name: 'required',
		email: 'required|email',
		roles: 'required',
		password: 'required',
    };
	const validation = new Validator(data, rules);
	return validation;
};

const validateEditUserInput = (data) => {
	const rules = {
		_id: 'required',
		name: 'required',
		email: 'required|email',
		roles: 'required',
	};
	const validation = new Validator(data, rules);
	return validation;
};

const validateUserEmailExist = async (email, userId = null) => {
	const querySerach =  { email: email };
	if(userId) {
		querySerach._id = { $ne: userId };
	}
	const user =  await User.findOne(querySerach);
	return (user && user._id) ? true : false;
}

module.exports = {
	validateUserEmailExist,
	validateCreateUserInput,
	validateEditUserInput
}
