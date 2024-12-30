const { isArray } = require('lodash');

const response = (body, error, custom) => {
  const success = !error;
  const data = body;
  const errors = error ? (isArray(error) ? error : [error]) : [];

  return {
    success,
    data,
    errors,
    ...custom,
  };
};

const listResponse = (body, filter) => response(body, null, { filter });
const errorBody = (body) => response(null, body);

const status = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

module.exports = {
  response,
  listResponse,
  errorBody,
  status,
};
