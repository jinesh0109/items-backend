const logger = require('../Logging')
const errorHandler = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    let msg = err.message
    logger.error(`${err.statusCode} ${err.message}`)
    logger.error(err)
    res.status(err.statusCode).json({
        returnCode:err.statusCode, 
        success:false,
        message : msg
    })
  };

module.exports = errorHandler;