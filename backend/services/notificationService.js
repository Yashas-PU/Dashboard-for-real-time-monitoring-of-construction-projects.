const { Notification } = require("../models");

exports.sendNotification = async (data) => {
    return await Notification.create(data);
};

exports.getNotifications = async () => {
    return await Notification.findAll();
};
