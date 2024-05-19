const jwt = require("jsonwebtoken");
const expiration = 3 * 24 * 3600;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: expiration });
};

module.exports = createToken;
