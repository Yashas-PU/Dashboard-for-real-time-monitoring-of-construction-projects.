const { Resource } = require("../models");

exports.createResource = async (data) => {
    return await Resource.create(data);
};

exports.getResources = async () => {
    return await Resource.findAll();
};
