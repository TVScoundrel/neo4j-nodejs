const { transports, createLogger, format } = require('winston')

const config = require('../config/config')

const logger = createLogger({
  level: config.get('logger_level'),
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    // new transports.Console({ timestamp: true }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/warn.log', level: 'warn' }),
    new transports.File({ filename: 'logs/activity.log', level: 'info' }),
    new transports.File({ filename: 'logs/verbose.log', level: 'verbose' }),
    new transports.File({ filename: 'logs/debug.log', level: 'debug' }),
    new transports.File({ filename: 'logs/silly.log', level: 'silly' })
  ]
})

module.exports = logger
