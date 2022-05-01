const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
// Create Schema
const RoleSchema = new Schema({
	name: {
		type: String,
		require: true,
		unique: true,
	},
});

RoleSchema.set('timestamps', true); 
RoleSchema.plugin(mongoosePaginate);
module.exports = Role = mongoose.model("roles", RoleSchema);