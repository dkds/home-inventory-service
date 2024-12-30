const { log } = require('../util/log');
const Item = require('../entities/item');
const { toDto, toEntity, toDtoBulk } = require('../dto/item');

const init = async () => {
  log.info('item-service initialized');
};

const createItem = async (itemDto) => {
  const itemEntity = toEntity(itemDto);
  const createdItem = await Item.query().insert(itemEntity);
  return toDto(createdItem);
};

const getItem = async (itemId) => {
  const item = await Item.query()
    .findById(itemId)
    .withGraphFetched('images')
    .withGraphFetched('container.[parentContainer.^]');
  return toDto(item);
};

const updateItem = async (itemId, itemDto) => {
  const itemEntity = toEntity(itemDto);
  const item = await Item.query()
    .findById(itemId)
    .patch({
      ...itemEntity,
    });
  return toDto(item);
};

const deleteItem = async (itemId) => {
  await Item.query().findById(itemId).delete();
};

const listContainerItems = async (
  containerId,
  filter,
  sortBy,
  sortOrder,
  offset,
  limit,
) => {
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const items = await Item.query()
    .select('*')
    .where('container_id', containerId)
    .withGraphFetched('images');
  return toDtoBulk(items);
};

const listItems = async (filter, sortBy, sortOrder, offset, limit) => {
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const items = await Item.query().select('*');
  return toDtoBulk(items);
};

const shutdown = async () => {
  instance = null;
};

module.exports = {
  init,
  shutdown,
  createItem,
  getItem,
  updateItem,
  deleteItem,
  listItems,
  listContainerItems,
};
