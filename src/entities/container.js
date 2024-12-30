const BaseModel = require('./base-model');

class Container extends BaseModel {
  static get tableName() {
    return 'container';
  }

  static get relationMappings() {
    const Item = require('./item');

    return {
      items: {
        relation: BaseModel.HasManyRelation,
        modelClass: Item,
        join: {
          from: 'container.id',
          to: 'item.container_id',
        },
      },
      parentContainer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Container,
        join: {
          from: 'container.container_id',
          to: 'container.id',
        },
      },
      childContainers: {
        relation: BaseModel.HasManyRelation,
        modelClass: Container,
        join: {
          from: 'container.id',
          to: 'container.container_id',
        },
      },
    };
  }
}

module.exports = Container;
