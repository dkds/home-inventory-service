const validator = require('express-joi-validation').createValidator({
  passError: true,
});

module.exports.validateBody = validator.body;
module.exports.validateFields = validator.fields;
module.exports.validateHeaders = validator.headers;
module.exports.validateParams = validator.params;
module.exports.validateQuery = validator.query;
