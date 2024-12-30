const pino = require('pino');
const httpLogger = require('pino-http');

module.exports.log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
      colorize: true,
    },
  },
});
module.exports.httpLogger = httpLogger({
  transport: {
    target: 'pino-http-print',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
      relativeUrl: true,
    },
  },
});
