const UserDB = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const exist = await UserDB.findOne({ email });
    if (exist) {
      return res.status(500).json({ msg: "u are already registered" });
    }
    if (!name || !email || !password) {
      return res
        .status(500)
        .json({ msg: "u better fill the inputs before entering" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await UserDB.create({ name, email, password: hash, role, phone });
    res.status(200).json({ msg: "registered successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "not able to registere", err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await UserDB.findOne({ email });
    if (!exist) {
      return res.status(500).json({ msg: "u are not registered" });
    }
    if (!email || !password) {
      return res
        .status(500)
        .json({ msg: "u better fill the inputs before entering" });
    }
    const hash = await bcrypt.compare(password, exist.password);
    if (!hash) {
      return res.status(500).json({ msg: "Incorrect details" });
    }
    const token = jwt.sign(
      { id: exist._id, role: exist.role },
      process.env.JWT_SECRET
    );
    res.status(200).json({ msg: "registered successfully", token });
  } catch (err) {
    res.status(500).json({ msg: "not able to login", err });
    console.log(err);
  }
};

const getUser = async (req, res) => {
  const users = await UserDB.find().select("-password");
  res.json(users);
};

module.exports = { register, login, getUser };
