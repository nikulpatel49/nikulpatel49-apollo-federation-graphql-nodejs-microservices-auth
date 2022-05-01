const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const AdminSchema = new Schema({
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    avatar: {
      type: String
    },
});

AdminSchema.set('timestamps', true);
module.exports = Admin = mongoose.model("admins", AdminSchema);