const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


//* Mongoose Schema
const userSchema = new mongoose.Schema({

  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    trim: true,
    minlength: [4, "Fullname should not be less than 4 characters long"],
    maxlength: [255, "Fullname should not be more than 255 characters long"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: [true, "This email address already exists"],
    email: [true, "The email is incorrect"],
    maxlength: [255, "Email should not be more than 255 characters long"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [4, "Password should not be less than 4 characters long"],
    maxlength: [255, "Password should not be more than 255 characters long"]
  },
  createdAt: {
    type: Number
  }
});


//* Mongoose Schema Statics
userSchema.statics.userValidation = function (body) {
  return User.validate(body);
}

//* Mongoose.Pre
userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});


const User = mongoose.model("User", userSchema);
module.exports = User;