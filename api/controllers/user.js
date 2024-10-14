const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");
const cloudinary = require("../utils/cloudinary");
const sendEmail = require("./mailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, "my-jwt", { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password, myToken } = req.body;
  console.log(email, password, "Token", myToken);

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
    user.notificationToken = myToken;
    await user.save();

    res.status(200).json({ token, _id, role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error encountered while login" });
  }
};

const registerUser = async (req, res) => {
  const { firstName, lastName, address, phoneNumber, email, password } =
    req.body;

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      address,
      phoneNumber,
      role: "buyer",
      email,
      password,
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error encountered while" });
  }
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
      res.status(500).json({ message: "Error while registration" });
    });
};

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "No such user" });
  }

  res.status(200).json(user);
};

// get a single user
const getUsers = async (req, res) => {
  const user = await User.find();

  if (!user) {
    return res.status(404).json({ message: "Users not found" });
  }

  res.status(200).json(user);
};

// change Password method
const changePassword = async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  console.log("login");

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such user" });
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
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const customerData = user.customers;

    const customerIds = customerData.map((customer) => customer.customer);
    const customers = await User.find({ _id: { $in: customerIds } });

    const customersWithStatus = await Promise.all(
      customers.map(async (customer) => {
        const customerStatus = customerData.find(
          (data) => data.customer.toString() === customer._id.toString()
        );

        const recentMessage = await Message.findOne({
          $or: [
            { senderId: customer._id, recepientId: user._id },
            { senderId: user._id, recepientId: customer._id },
          ],
        })
          .sort({ timeStamp: -1 })
          .limit(1);
        return {
          ...customer.toObject(),
          chatStatus: customerStatus.chatStatus,
          lastStatusChange: customerStatus.lastStatusChange,
          unSeenMessage: customerStatus.unSeenMessage,
          recentMessage: recentMessage ? recentMessage.toObject() : null,
        };
      })
    );

    const sortedCustomers = customersWithStatus.sort(
      (a, b) => new Date(b.lastStatusChange) - new Date(a.lastStatusChange)
    );

    res.status(200).json({ customers: sortedCustomers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
      return res.status(404).json({ message: "User not found" });
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
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// Update email details
const updateEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = email || user.email;
    const updatedUser = await user.save();

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// send confirmation code
const confirmEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const code = Math.floor(Math.random() * 9000) + 1000;

    const result = await sendEmail(email, code);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    user.confirmation = code;
    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// send confirmation code
const confirmCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.confirmation !== code) {
      return res.status(404).json({ message: "Invalid Code" });
    }

    return res.status(200).json({ message: "Correct Code" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log(email, newPassword);

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.password = newPassword;
    user.confirmation = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ message: "Error" });
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
  confirmEmail,
  confirmCode,
  resetPassword,
};
