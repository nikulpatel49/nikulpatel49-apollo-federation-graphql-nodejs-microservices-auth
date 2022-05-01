const Validator = require('validatorjs');
const Role = require('../models/Role');

const validateCreateRoleInput = (data) => {
    const rules = {
		name: 'required'
    };
	const validation = new Validator(data, rules);
	return validation;
};

const validateEditRoleInput = (data) => {
	const rules = {
		name: 'required'
	};
	const validation = new Validator(data, rules);
	return validation;
};

const validateRoleNameExist = async (name, _id = null) => {
	const querySerach =  { name: name };
	if(_id) {
		querySerach._id = { $ne: _id };
	}
	const role =  await Role.findOne(querySerach);
	return (role && role._id) ? true : false;
}

module.exports = {
	validateCreateRoleInput,
	validateEditRoleInput,
	validateRoleNameExist
}
