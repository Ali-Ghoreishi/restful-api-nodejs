//const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//* CREATES A NEW USER
exports.createUser = async (req, res, next) => {
  try {
    let time = Math.round(new Date().getTime());
    await User.userValidation(req.body);
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error(
        "There is already a User with this email address"
      );
      error.statusCode = 409;
      throw error;
    } else {
      User.create(
        { fullname, email, password, createdAt: time },
        function (err, user) {
          const token = jwt.sign(
            {
              person: {
                personId: user._id, //.toString()
                email: user.email,
                fullname: user.fullname,
              },
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );

          const message = ["Registration successful"];
          res
            .status(201)
            .json({ status: true, message, data: { token: token } });
        }
      );
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = [];
      const errs = err.errors;
      for (key in errs) {
        errors.push(errs[key].message);
      }

      return res.status(400).json({ status: false, message: errors, data: {} });
    }
    next(err);
  }
};

//* RETURNS ALL THE USERS IN THE DATABASE
exports.getUsersList = async (req, res, next) => {
  try {
    User.find({}, function (err, user) {
      const message = ["Get users list was successful"];
      res.status(200).json({ status: true, message, data: { user } });
    });
  } catch (err) {
    next(err);
  }
};

//* DELETES A USER FROM THE DATABASE
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) {
      const error = new Error(
        "The user does not exist"
      );
      error.statusCode = 404;
      throw error;
    }
    User.findByIdAndRemove(req.params.id, function (err, user) {
      const message = ["User deleted"];
      res.status(200).json({ status: true, message, data: {} });
    });
  } catch (err) {
    next(err);
  }
};

//* UPDATES A SINGLE USER IN THE DATABASE
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) {
      const error = new Error(
        "The user does not exist"
      );
      error.statusCode = 404;
      throw error;
    }
    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function (err, user) {
        const message = ["User updated"];
        res.status(200).json({ status: true, message, data: { user } });
      }
    );
  } catch (err) {
    next(err);
  }
};
