const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const UserRegisterDeviceSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    deviceName: {
      type: String,
      require: true
    },

    isDevicePrimary: {
      type: Boolean,
      default: false
    },

    deviceId: {
      type: String,
      require: true,
    },

    deviceType: {
      type: String,
      require: true,
    },
});

UserRegisterDeviceSchema.set('timestamps', true); 
module.exports = UserRegisterDevice = mongoose.model("user_register_devices", UserRegisterDeviceSchema);