const { validationResult } = require("express-validator");

const handleErrorMessage = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.mapped());
  }
  next();
};

module.exports = handleErrorMessage;
