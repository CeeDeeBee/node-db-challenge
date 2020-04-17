const db = require("../data/db-config");

module.exports = {
	getProjects,
	getProjectByID,
	getProjectTasks,
	getProjectResources,
	createProject,
	addResource,
};

function getProjects() {
	return db("projects");
}

function getProjectByID(id) {
	return db("projects")
		.where({ id })
		.then(([project]) => {
			project = {
				...project,
				completed: intToBool(project.completed),
			};
			return getProjectTasks(id).then((tasks) => {
				tasks = tasks.map((task) => ({
					...task,
					completed: intToBool(task.completed),
				}));
				return getProjectResources(id).then((resources) => {
					resources = resources.map((resource) => ({
						...resource,
						completed: intToBool(resource.completed),
					}));
					return { ...project, tasks, resources };
				});
			});
		});
}

function getProjectTasks(project_id) {
	return db("tasks")
		.select("tasks.id", "tasks.description", "tasks.notes", "tasks.completed")
		.where({ project_id });
}

function getProjectResources(project_id) {
	return db("project_resources")
		.join("resources", "resources.id", "project_resources.id")
		.select("resources.id", "resources.name", "resources.description")
		.where({ project_id });
}

function createProject(project) {
	return db("projects")
		.insert(project)
		.then(([id]) => getProjectByID(id));
}

function addResource(project_id, resource_id) {
	return db("project_resources")
		.insert({ project_id, resource_id })
		.then(() => getProjectResources(project_id));
}

function intToBool(int) {
	return int ? true : false;
}
