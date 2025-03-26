const { Project } = require("../models");

exports.createProject = async (data) => {
    return await Project.create(data);
};

exports.getProjects = async () => {
    return await Project.findAll();
};