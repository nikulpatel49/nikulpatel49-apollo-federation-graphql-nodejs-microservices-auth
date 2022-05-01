const Validator = require('validatorjs');

const validateLoginInput = (data) => {
    const rules = {
      email: 'required|email',
      password: 'required',
    };
	const validation = new Validator(data, rules);
	return validation;
};

const validateChangePasswordInput = (data) => {
    const rules = {
      email: 'required|email',
      password: 'required',
      newPassword: "required|min:6"
    };
	const validation = new Validator(data, rules);
	return validation;
};


const validateRegisterUserInput = (data) => {
    const rules = {
		name: 'required',
		email: 'required|email',
		password: 'required',
    };
	const validation = new Validator(data, rules);
	return validation;
};

const validateForgotPasswordInput = (data) => {
    let rules = {
		email: 'required|email',
	};
	if(data.mobileNumber) {
		rules = {
			mobileNumber: 'required|min:10',
		};
	}
	const validation = new Validator(data, rules);
	return validation;
};

const validateVerificationCodeInput = (data) => {
    let rules = {
		email: 'required',
		token:'required',
	};
	const validation = new Validator(data, rules);
	return validation;
};
const validateResetPasswordInput = (data) => {
    let rules = {
		email: 'required',
		token:'required',
		newPassword:'required|min:6'
	};
	const validation = new Validator(data, rules);
	return validation;
};

module.exports = {
	validateRegisterUserInput,
	validateLoginInput,
	validateChangePasswordInput,
	validateForgotPasswordInput,
	validateResetPasswordInput,
	validateVerificationCodeInput
}