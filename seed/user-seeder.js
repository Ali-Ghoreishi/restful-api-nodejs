// const mongoose = require("mongoose");
// const dotEnv = require("dotenv");

// const User = require("../models/User");
// const connectDB = require("../config/db");

// dotEnv.config({ path: "../config/config.env" });

// var users = [
//   new User({
//     fullname: "Iman",
//     email: "test1@gmail.com",
//     password: "111111",
//   }),
//   new User({
//     fullname: "Reza",
//     email: "test2@gmail.com",
//     password: "222222",
//   }),
//   new User({
//     fullname: "Mohammad",
//     email: "test3@gmail.com",
//     password: "333333",
//   }),
//   new User({
//     fullname: "Sara",
//     email: "test4@gmail.com",
//     password: "444444",
//   }),
//   new User({
//     fullname: "Mina",
//     email: "test5@gmail.com",
//     password: "555555",
//   }),
// ];

// var done = 0;

// for (var i = 0; i < users.length; i++) {
//   users[i].save(function (err, result) {
//     done++;
//     if (done === users.length) exit1();
//   });
// }

// function exit1() {
//   mongoose.disconnect();
// }

// connectDB();
