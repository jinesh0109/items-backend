const mysql = require('mysql2');
const express = require('express');
const config = require('../config/config.json');
const logger = require('../Logging/index');
const util = require('util')

logger.info(util.inspect(config))
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
});
const getConnection = ()=>{
    try {
        const connection = pool.promise();
        logger.info(`Connected to MySQL database!`)
        return connection;
      } catch (error) {
        logger.error(`Error connecting to MySQL database`);
        throw error;
      }
}
module.exports = getConnection();