const Role = require('../models/Role');
const userSeeder = require('./userSeeder');

const roleSeeder = () => {
    Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: "user"
			}).save(err => {
				if (err) {
					console.log("error", err);
				}
                
                userSeeder();
            });
            console.log("Role seeder run suceessfully")
		}
  	});
};

module.exports = roleSeeder;