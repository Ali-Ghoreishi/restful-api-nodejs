const mongoose = require('mongoose');

// Mongoose Schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 255,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        email: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})


const User = mongoose.model('User', userSchema)

module.exports = User ;