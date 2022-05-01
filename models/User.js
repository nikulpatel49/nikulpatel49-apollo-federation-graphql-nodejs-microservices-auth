const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      default: null
    },
    password: {
      type: String,
      require: true
    },
    avatar: {
      type: String
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
      }
    ],

    loginType: {
      type: String
    },
    
    emailVerified: {
      type: Boolean,
      default: false
    },

    secretCode: {
      type: String,
      default: null
    },

    emailVerificationCode: {
      type: Number,
      require: false
    },

    phoneVerified: {
      type: Boolean,
      default: false
    },

    phoneVerificationCode: {
      type: Number,
      require: false
    },
    
    deletedAt: {
      type: Date,
      default: null
    },
  
});

UserSchema.set('timestamps', true); 
UserSchema.plugin(mongoosePaginate);

module.exports = User = mongoose.model("users", UserSchema);