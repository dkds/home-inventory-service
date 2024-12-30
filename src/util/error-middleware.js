const { errorBody } = require('../dto/response');
const { ValidationError } = require('joi');

const errorHandler = (err, req, res, next) => {
  if (!err) {
    next();
  }
  let status = 500;
  if (err.error instanceof ValidationError) {
    status = 400;
  }
  const message = err.error.details.map((error) => error.message);
  res.status(status).json(errorBody(message));
};

module.exports = errorHandler;
