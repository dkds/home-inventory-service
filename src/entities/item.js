const BaseModel = require('./base-model');

class Item extends BaseModel {
  static get tableName() {
    return 'item';
  }

  static get relationMappings() {
    const Container = require('./container');
    const Image = require('./image');

    return {
      container: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Container,
        join: {
          from: 'item.container_id',
          to: 'container.id',
        },
      },
      images: {
        relation: BaseModel.HasManyRelation,
        modelClass: Image,
        join: {
          from: 'item.id',
          to: 'image.item_id',
        },
      },
    };
  }
}

module.exports = Item;
