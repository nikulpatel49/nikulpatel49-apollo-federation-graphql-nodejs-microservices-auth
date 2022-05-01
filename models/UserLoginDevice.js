const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const UserLoginDeviceSchema = new Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    deviceName: {
      type: String,
      require: true
    },

    deviceId: {
      type: String,
      require: true,
    },

    deviceType: {
      type: String,
      require: true,
    },

    deviceType: {
      type: String,
      require: true,
    },

    lastUpdatedAt: {
      type: Date,
      default: null
    },

    logout: {
      type: Boolean,
      default: false,
    },

    forcefullyLogout: {
      type: Boolean,
      default: false,
    },
});

UserLoginDeviceSchema.set('timestamps', true); 
module.exports = UserLoginDevice = mongoose.model("user_login_devices", UserLoginDeviceSchema);