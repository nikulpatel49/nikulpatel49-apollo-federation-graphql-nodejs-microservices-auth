const roleSeeder = require('./roleSeeder');
const adminSeeder = require('./adminSeeder');
const initialSeeder = async () => {
    roleSeeder();
    adminSeeder();
};

module.exports = initialSeeder;
