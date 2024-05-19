const express = require("express");
const {
  loginController,
  registerController,
  logoutController,
} = require("../controllers/UsersController");
const router = express.Router();
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const { body } = require("express-validator");
const User = require("../models/User");

router.post(
  "/login",
  [body("email").notEmpty().isEmail(), body("password").notEmpty()],
  handleErrorMessage,
  loginController
);
router.post("/logout", logoutController);
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email")
      .notEmpty()
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("E-mail already in use");
        }
      }),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  registerController
);

module.exports = router;
