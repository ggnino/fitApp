const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const db = require("./config/keys");
const path = require("path");
const users = require("./routes/users");
const exercise = require("./routes/exercise");
const myPassportConfig = require("./config/passportConfig");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(express.json());
app.use(
	session({
		secret: "secretcode",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());

myPassportConfig(passport);

// Database Connection
mongoose
	.connect(db.mongoURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log("ERROR: " + err));

// Routes
app.use("/", users);
app.use("/exercise", exercise);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("front-end/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"));
	});
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
