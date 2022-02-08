export {};
const CustomApiError = require('./CustomApiError');
const BadRequestError = require('./BadRequestError');
const NotFound = require('./NotFoundError');
const UnauthentictedError = require('./UnauthenticatedError');

module.exports = {
  CustomApiError,
  BadRequestError,
  NotFound,
  UnauthentictedError,
};
