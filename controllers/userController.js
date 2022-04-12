const { Router } = require("express");

const User = require("../models/User");

const router = new Router();

//* CREATES A NEW USER
router.post("/", (req, res) => {
  try {
    User.create(
      {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
      },
      function (err, user) {
        res.status(201).json({ message: "New user created.", user: user });
      }
    );
  } catch (err) {
    res.status(500).json({
      error: "There was a problem adding the information to the database.",
    });
  }
});

//* RETURNS ALL THE USERS IN THE DATABASE
router.get("/", (req, res) => {
  try {
    User.find({}, function (err, user) {
      res.status(200).json(user); //  or  res.send(user)
    });
  } catch (err) {
    res.status(500).json({ message: "There was a problem finding the users." });
  }
});

//* GETS A SINGLE USER FROM THE DATABASE
router.get("/:id", (req, res) => {
  try {
    User.findById(req.params.id, function (err, user) {
      if (!user) return res.status(404).json({ message: "No user found" });
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(500).json({ error: "There was a problem finding the user." });
  }
});

//* DELETES A USER FROM THE DATABASE
router.delete("/:id", (req, res) => {
  try {
    User.findByIdAndRemove(req.params.id, function (err, user) {
      res.status(200).json({ message: `User: ${user.fullname} was deleted` });
    });
  } catch (err) {
    res.status(500).json({ error: "There was a problem deleting the user." });
  }
});

//* UPDATES A SINGLE USER IN THE DATABASE
router.put("/:id", (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function (err, user) {
        res.status(200).json(user);
      }
    );
  } catch (err) {
    res.status(500).json({ error: "There was a problem updating the user." });
  }
});

module.exports = router;
