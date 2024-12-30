const init = async () => {
  await require('./db-service').init();
  await require('./container-service').init();
  await require('./item-service').init();
  await require('./image-service').init();
};
const shutdown = async () => {
  await require('./db-service').shutdown();
  await require('./container-service').shutdown();
  await require('./item-service').shutdown();
  await require('./image-service').shutdown();
};

module.exports = { init, shutdown };
