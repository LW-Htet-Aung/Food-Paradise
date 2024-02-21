const bcrypt = require("bcrypt");
const User = require("../models/User");

const loginController = (req, res) => {
  return res.json("login");
};
const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const userExits = await User.findOne({ email });

  if (userExits) {
    return res.status(400).json("User already exit");
  }

  const salt = await bcrypt.genSalt();
  const hashValue = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashValue,
  });
  return res.json(user);
};

module.exports = { loginController, registerController };
