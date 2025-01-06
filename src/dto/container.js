const Joi = require('joi');

const containerCreateSchema = Joi.object({
  name: Joi.string().min(1).max(100),
  containerId: Joi.number().min(1),
});
const containerListSchema = Joi.object({
  top_level: Joi.bool().default(false),
  container: Joi.number().default(0),
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
    ...(entity.childContainers
      ? {
          childContainers: entity.childContainers.map((child) => toDto(child)),
        }
      : {}),
    ...(entity.parentContainer
      ? {
          parentContainer: toDto(entity.parentContainer),
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
  containerCreateSchema,
  containerListSchema,
};
