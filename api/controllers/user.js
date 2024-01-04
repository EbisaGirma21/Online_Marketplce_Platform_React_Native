const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");
const cloudinary = require("../utils/cloudinary");

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

    // Retrieve the customer objects from the user's 'customers' array
    const customerData = user.customers;

    // Extract customer IDs and fetch the actual customer objects
    const customerIds = customerData.map((customer) => customer.customer);
    const customers = await User.find({ _id: { $in: customerIds } });

    // Combine customer data with the fetched customer objects
    const customersWithStatus = await Promise.all(
      customers.map(async (customer) => {
        const customerStatus = customerData.find(
          (data) => data.customer.toString() === customer._id.toString()
        );

        // Retrieve the recent message for each customer
        const recentMessage = await Message.findOne({
          $or: [
            { senderId: customer._id, recepientId: user._id },
            { senderId: user._id, recepientId: customer._id },
          ],
        })
          .sort({ timestamp: -1 })
          .limit(1);

        return {
          ...customer.toObject(),
          chatStatus: customerStatus.chatStatus,
          lastStatusChange: customerStatus.lastStatusChange,
          recentMessage: recentMessage ? recentMessage.toObject() : null,
        };
      })
    );

    // Sort customersWithStatus by lastStatusChange in descending order
    const sortedCustomers = customersWithStatus.sort(
      (a, b) => new Date(b.lastStatusChange) - new Date(a.lastStatusChange)
    );

    res.status(200).json({ customers: sortedCustomers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user details
const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    let result;

    if (req.files) {
      result = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "mymarket",
      });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details based on the request body
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.address = req.body.address || user.address;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    // Update the 'image' object if needed
    if (result) {
      user.image.public_id = result.public_id || user.image.public_id;
      user.image.url = result.url || user.image.url;
    }

    // Save the updated user
    const updatedUser = await user.save();

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// Update email details
const updateEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.email = email || user.email;
    const updatedUser = await user.save();

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
  getUser,
  getUsers,
  registerUser,
  changePassword,
  sellerRegistration,
  getCustomers,
  updateUser,
  updateEmail,
};
