class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
  static badRequest(message = "Bad request", errors = null) {
    return new ApiError(400, message, errors);
  }
  static notFound(message = "Not found") {
    return new ApiError(404, message);
  }
  static conflict(message = "Conflict", errors = null) {
    return new ApiError(409, message, errors);
  }
  static unauthorized(message = "Unathorize", errors = null) {
    return new ApiError(401, message, errors);
  }
}
module.exports = ApiError;
