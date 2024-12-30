const { log } = require('../util/log');
const Image = require('../entities/image');
const { toDto, toEntity, toDtoBulk } = require('../dto/image');

const init = async () => {
  log.info('image-service initialized');
};

const createImage = async (fileName, itemId) => {
  const imageEntity = toEntity({
    name: fileName,
    itemId,
  });
  const createdImage = await Image.query().insert(imageEntity);
  return toDto(createdImage);
};

const updateImage = async (imageId, imageDto) => {
  const imageEntity = toEntity(imageDto);
  const image = await Image.query()
    .findById(imageId)
    .patch({
      ...imageEntity,
    });
  return toDto(image);
};

const deleteImage = async (imageId) => {
  await Image.query().findById(imageId).delete();
};

const listItemImages = async (
  itemId,
  filter,
  sortBy,
  sortOrder,
  offset,
  limit,
) => {
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const images = await Image.query().select('*').where('item_id', itemId);
  return toDtoBulk(images);
};

const listImages = async (filter, sortBy, sortOrder, offset, limit) => {
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  const images = await Image.query().select('*');
  return toDtoBulk(images);
};

const shutdown = async () => {
  instance = null;
};

module.exports = {
  init,
  shutdown,
  createImage,
  updateImage,
  deleteImage,
  listImages,
  listItemImages,
};
