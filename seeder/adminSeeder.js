const Admin = require('../models/Admin');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const adminSeeder = () => {
    Admin.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			const avatar = gravatar.url("admin@admin.com", {
				s: '200', // Size
				r: 'pg', // Rating
				d: 'mm' // Default
			});
			const newAdmin = new Admin({
				name: "admin",
				email: "admin@admin.com",
				avatar,
				password: "admin"
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newAdmin.password, salt, (err, hash) => {
				if (err) throw error;
				newAdmin.password = hash;
					newAdmin.save((err, user) => {
						if (err) {
							return;
						} else {
							
						}
					})
				});
			});
			console.log("Admin seeder run suceessfully");
		}
	});
};

module.exports = adminSeeder;