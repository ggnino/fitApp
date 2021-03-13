const express = require("express");
const router = express.Router();
const Users = require("../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		console.log(info);
		if (err) throw err;
		if (!user) {
			if (info) res.send("Please enter password.");
			else {
				Users.findOne({ username: req.body.username }, (err, data) => {
					if (data) res.send("Incorrect password");
					else res.send("User does not exist.");
				});
			}
		} else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.send("Successfully Authenticated!");
				console.log(req.user);
			});
		}
	})(req, res, next);
});

router.post("/register", (req, res) => {
	Users.findOne({ username: req.body.username }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send("User Already Exists");
		if (!doc) {
			if (req.body.password.length < 3) {
				res.send("Password length must be greater than 3 chars.");
			} else {
				const hashed = await bcrypt.hash(req.body.password, 10);

				const newUser = new Users({
					username: req.body.username,
					password: hashed,
				});
				await newUser.save();
				res.send("User Created");
			}
		}
	});
});

router.get("/users:id", (req, res) => {
	Users.find({ username: req.params.id })
	.then((data) => res.json(data));
});

module.exports = router;
