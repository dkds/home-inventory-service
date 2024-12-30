const Joi = require('joi');

const imageCreateSchema = Joi.object({});
const imageListSchema = Joi.object({
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
    ...(entity.item
      ? {
          item: toDto(entity.item),
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
    item_id: dto.itemId,
  };
};

module.exports = {
  toDto,
  toDtoBulk,
  toEntity,
  imageCreateSchema,
  imageListSchema,
};
