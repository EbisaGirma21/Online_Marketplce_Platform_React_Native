const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

const createToken = (_id) => {
  return jwt.sign({ _id }, "my-jwt", { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("login");

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const _id = user._id;

    const token = createToken(user._id);

    res.status(200).json({ token, _id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error" });
  }
};

//  create user
const registerUser = async (req, res) => {
  const { firstName, lastName, address, phoneNumber, email, password } =
    req.body;

  const newUser = new User({
    firstName,
    lastName,
    address,
    phoneNumber,
    email,
    password,
  });

  console.log(firstName, lastName, address, phoneNumber, email, password);

  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error" });
    });
};

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// change Password method
const changePassword = async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  console.log("login");

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== currentPassword) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  loginUser,
  getUser,
  registerUser,
  changePassword,
};
