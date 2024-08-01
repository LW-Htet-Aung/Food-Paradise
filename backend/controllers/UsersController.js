const createToken = require("../helpers/createToken");
const User = require("../models/User");
const tokenController = async (req, res) => {
  return res.json(req.user);
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json({ ...JSON.parse(error.message) });
  }
};
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.register(name, email, password);
    // create token
    const token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const logoutController = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  return res.json({ message: "User logged out" });
};
module.exports = {
  tokenController,
  loginController,
  registerController,
  logoutController,
};
