require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const errorHandler = require('./src/util/error-middleware');
const { log, httpLogger } = require('./src/util/log');
const { init: initRoutes } = require('./src/routes');
const {
  init: initServices,
  shutdown: shutdownServices,
} = require('./src/services');
initServices();

const app = express();
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
initRoutes(app);

app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  log.info(`App listening on port ${process.env.PORT}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

async function shutDown() {
  log.info('Received kill signal, shutting down gracefully');

  await shutdownServices();

  server.close(() => {
    log.info('Closing App');
    process.exit(0);
  });

  setTimeout(() => {
    log.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}
