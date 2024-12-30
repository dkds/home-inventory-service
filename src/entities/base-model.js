const { Model } = require('objection');

class BaseModel extends Model {
  static get tableName() {
    throw new Error('Table name not defined in child model');
  }
}

module.exports = BaseModel;
