const Joi = require('joi');
const { toDto: toContainerDto } = require('./container');
const { toDtoBulk: toImageDtoBulk } = require('./image');

const itemCreateSchema = Joi.object({
  name: Joi.string().min(1).max(100),
  containerId: Joi.number().min(1),
});
const itemListSchema = Joi.object({
  container_id: Joi.number().min(1),
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).max(50).default(10),
  sort_order: Joi.string().valid('asc', 'desc').default('asc'),
  sort_by: Joi.string().pattern(/^/).default('created_at'),
});

const toDto = (entity) => {
  if (!entity) {
    return null;
  }

  return {
    id: entity.id,
    name: entity.name,
    ...(entity.images
      ? {
          images: toImageDtoBulk(entity.images),
        }
      : {}),
    ...(entity.container
      ? {
          container: toContainerDto(entity.container),
        }
      : {}),
  };
};
const toDtoBulk = (entities) => {
  if (!entities) {
    return [];
  }

  return entities.map(toDto);
};
const toEntity = (dto) => {
  return {
    name: dto.name,
    container_id: dto.containerId,
  };
};

module.exports = {
  toDto,
  toDtoBulk,
  toEntity,
  itemCreateSchema,
  itemListSchema,
};
