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
    const role = user.role;

    const token = createToken(user._id);
    res.status(200).json({ token, _id, role });
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
    role: "buyer",
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
//  create user
const sellerRegistration = async (req, res) => {
  const { kebeleId, nationalId, birthDate, specificLocation, id } = req.body;

  const updatedValues = {
    kebeleId,
    nationalId,
    birthDate,
    specificLocation,
    role: "seller",
  };

  User.updateOne({ _id: id }, { $set: updatedValues })
    .then((result) => {
      res.status(200).json({ message: "Your info submitted successfully" });
    })
    .catch((error) => {
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

// get a single user
const getUsers = async (req, res) => {
  const user = await User.find();

  if (!user) {
    return res.status(404).json({ error: "Users not found" });
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
const getCustomers = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Retrieve the customer IDs from the user's 'customers' array
    const customerIds = user.customers;
    // Use the customerIds to fetch the actual customer objects
    const customers = await User.find({ _id: { $in: customerIds } });
    res.status(200).json({ customers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

///endpoint to get the userDetails to design the chat Room header

module.exports = {
  loginUser,
  getUser,
  getUsers,
  registerUser,
  changePassword,
  sellerRegistration,
  getCustomers,
};
