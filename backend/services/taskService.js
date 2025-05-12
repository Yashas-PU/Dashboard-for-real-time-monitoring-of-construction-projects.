const { Task } = require("../models");

exports.createTask = async (data) => {
    return await Task.create(data);
};

exports.getTasks = async () => {
    return await Task.findAll();
};
