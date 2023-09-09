const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, timestamp,stack }) => {
    return `${timestamp} [${level}] ${stack||message}`;
  });

const logger = createLogger({
    level:'info',
    format: combine(
        timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        logFormat,
        format.errors({stack:true}),
    ),
    transports:[
        new transports.Console(),
        new transports.File({ filename: 'logs/logs.log' }),
    ],
});

module.exports = logger;