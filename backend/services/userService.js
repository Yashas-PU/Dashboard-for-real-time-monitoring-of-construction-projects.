const { User } = require("../models");

exports.getUsers = async () => {
    return await User.findAll();
};

exports.createUser = async (data) => {
    return await User.create(data);
};
