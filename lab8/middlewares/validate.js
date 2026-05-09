const { validationResult } = require("express-validator");
const ApiError = require("../errors/ApiError");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((e) => ({
      field: e.path,
      msg: e.msg,
    }));

    return next(new ApiError(400, "Validation error", formattedErrors));
  }
  next();
};
