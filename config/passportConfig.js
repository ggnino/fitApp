const Users = require("../model/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/User");

const myPassportConfig = function (passport) {
	passport.use(
		new localStrategy((username, password, done) => {
			Users.findOne({ username: username }, (err, user) => {
				if (err) throw err;
				if (!user) return done(null, false);
				bcrypt.compare(password, user.password, (err, result) => {
					if (err) throw err;
					if (result) return done(null, user);
					else return done(null, false);
				});
			});
		})
	);

	passport.serializeUser((user, cb) => {
		cb(null, user.id);
	});
	passport.deserializeUser((id, cb) => {
		User.findOne({ _id: id }, (err, user) => {
			cb(err, user);
		});
	});
};

module.exports = myPassportConfig;
