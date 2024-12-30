const containerRoutes = require('./container-routes');
const itemRoutes = require('./item-routes');
const imageRoutes = require('./image-routes');

const basePath = '/api';
const init = async (app) => {
  app.use(basePath + '/items', itemRoutes);
  app.use(basePath + '/containers', containerRoutes);
  app.use(basePath + '/images', imageRoutes);
};
const shutdown = async () => {};

module.exports = { init, shutdown };
