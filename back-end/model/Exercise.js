const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
	username: { type: String, required: true },
	description: { type: String },
	duration: { type: Number, required: true },
	date: { type: Date, required: true },
});

module.exports = mongoose.model("exercise", exerciseSchema);
