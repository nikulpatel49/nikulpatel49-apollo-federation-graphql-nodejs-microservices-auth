const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const ResetPasswordSchema = new Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'users' 
    },
    token: { 
      type: String, 
      required: true 
    },
    expire: { 
      type: Date, 
      required: true, 
      default: Date.now, 
    },
});

ResetPasswordSchema.set('timestamps', true); 
module.exports = ResetPassword = mongoose.model("reset_password", ResetPasswordSchema);