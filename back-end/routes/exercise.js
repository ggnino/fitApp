const express = require("express");
const router = express.Router();
const Exercises = require("../model/Exercise");

router.get("/:username", (req, res) => {
	console.log("SSSS");
	Exercises.find({ username: req.params.username })
		.then((data) => {
			//console.log(data);
			res.json(data);
		})
		.catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
	Exercises.findById(req.params.id)
		.then((item) => item.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

router.post("/", (req, res) => {
	const newExercise = new Exercises({
		username: req.body.username,
		description: req.body.description,
		duration: req.body.duration,
		date: Date.parse(req.body.date),
	});

	newExercise
		.save()
		.then((data) => res.json(data))
		.catch((err) => res.json(err));
});

module.exports = router;
