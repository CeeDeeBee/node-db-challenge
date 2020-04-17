const db = require("../data/db-config");

module.exports = {
	getProjects,
	getProjectByID,
	createProject,
};

function getProjects() {
	return db("projects");
}

function getProjectByID(id) {
	return db("projects").where({ id });
}

function createProject(project) {
	return db("projects")
		.insert(project)
		.then(([id]) => getProjectByID(id));
}
