const logger = require("../config/logger");
exports.requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
};
