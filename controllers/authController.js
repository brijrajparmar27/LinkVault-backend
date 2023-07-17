const UserModel = require("../models/UserModel");
const JWT = require("jsonwebtoken");

const generateJWT = (_id) => {
  return JWT.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const login = async (req, res) => {
  const payload = req.body;
  try {
    const user = await UserModel.login(payload);
    const jwt = generateJWT(user._id);

    res.status(200).json({ jwt, email: user.email, _id: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  const { email, pass, pin } = req.body;
  try {
    const user = await UserModel.signup({ email, pass, pin });
    const jwt = generateJWT(user._id);

    res.status(200).json({ jwt, email: user.email, _id: user._id });
    // res.json({ jwt, user }).status(200);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { login, signup };
