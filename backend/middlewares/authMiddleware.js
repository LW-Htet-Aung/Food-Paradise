const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodeValue) => {
      if (err) {
        return res.status(401).json({ message: "Token Expire or not valid" });
      } else {
        next();
      }
    });
  } else {
    return res.status(400).json({ message: "User not logged in" });
  }
};
module.exports = AuthMiddleware;
