const express = require("express");

const projects = require("./projectsModel");

const router = express.Router();

router.get("/", (req, res) => {
	projects
		.getProjects()
		.then((projects) => res.status(200).json(projects))
		.catch((err) => {
			console.log(err.message);
			res.status(500).json({ error: err.message });
		});
});

router.get("/:id", (req, res) => {
	projects
		.getProjectByID(req.params.id)
		.then((project) => res.status(200).json(project))
		.catch((err) => {
			console.log(err.message);
			res.status(500).json({ error: err.message });
		});
});

router.post("/", (req, res) => {
	if (req.body.name) {
		projects
			.createProject(req.body)
			.then((project) => res.status(201).json(project))
			.catch((err) => {
				console.log(err.message);
				res.status(500).json({ error: err.message });
			});
	} else {
		res.status(400).json({ message: "Project must have a name." });
	}
});

module.exports = router;
