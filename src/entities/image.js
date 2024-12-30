const BaseModel = require('./base-model');

class Image extends BaseModel {
  static get tableName() {
    return 'image';
  }

  static get relationMappings() {
    const Item = require('./item');

    return {
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'image.item_id',
          to: 'item.id',
        },
      },
    };
  }
}

module.exports = Image;
