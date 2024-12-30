const { log } = require('../util/log');
const Container = require('../entities/container');
const { toDto, toEntity, toDtoBulk } = require('../dto/container');

const init = async () => {
  log.info('container-service initialized');
};

const createContainer = async (containerDto) => {
  const containerEntity = toEntity(containerDto);
  const createdContainer = await Container.query().insert(containerEntity);
  return toDto(createdContainer);
};

const getContainer = async (containerId) => {
  const container = await Container.query()
    .findById(containerId)
    .withGraphFetched('childContainers')
    .withGraphFetched('parentContainer.^');
  return toDto(container);
};

const updateContainer = async (containerId, containerDto) => {
  const containerEntity = toEntity(containerDto);
  const container = await Container.query()
    .findById(containerId)
    .patch({
      ...containerEntity,
    });
  return toDto(container);
};

const deleteContainer = async (containerId) => {
  await Container.query().findById(containerId).delete();
};

const listContainers = async (filter, sortBy, sortOrder, offset, limit) => {
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const containers = await Container.query().select('*');
  return toDtoBulk(containers);
};

const shutdown = async () => {
  instance = null;
};

module.exports = {
  init,
  shutdown,
  createContainer,
  getContainer,
  updateContainer,
  deleteContainer,
  listContainers,
};
