const User = require('../models/User');
const Role = require('../models/Role');

const gravatar = require('gravatar');
const bcrypt = require('bcrypt');


const userSeeder = () => {
    User.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
            Role.findOne(
                {
                    name: 'user'
                },
                (err, roles) => {
                for(let i=0; i < 20; i++) {
                    const avatar = gravatar.url("user" + i +"@user.com", {
                        s: '200', // Size
                        r: 'pg', // Rating
                        d: 'mm' // Default
                    });
                    const newUser = new User({
                        name: "user" + i,
                        email: "user" + i + "@user.com",
                        avatar: avatar,
                        roles: [roles._id],
                        password: "user"
                    });
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(newUser.password, salt, function(err, hash) {
                            if (err) throw error;
                            newUser.password = hash;
                            newUser.save((err, user) => {
                                if (err) {
                                } else{
                                    
                                }
                            })
                        });
                    });
                }
                
            });
            console.log("User seeder run suceessfully");
		}
	});
};


module.exports = userSeeder;