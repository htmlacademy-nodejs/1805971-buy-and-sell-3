'use strict';

const DEFAULT_COMMAND = `--server`;
const USER_ARGV_INDEX = 2;

const ExitCode = {
  success: 0,
  invalidArgument: 9
};

module.exports = {
  DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode
};

module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

module.exports.API_PREFIX = `/api`;
