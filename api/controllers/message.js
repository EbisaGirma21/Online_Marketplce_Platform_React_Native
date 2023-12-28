const mongoose = require("mongoose");
const Message = require("../models/message");
const User = require("../models/user");

//endpoint to post Messages and store it in the backend
const sendMessage = async (req, res) => {
  try {
    const { senderId, recepientId, messageType, message } = req.body;

    // Find the sender user by ID
    const senderUser = await User.findById(senderId);
    if (!senderUser) {
      return res.status(404).json({ error: "Sender user not found" });
    }

    // Check if the recipientId is already in the senderUser's customers array
    const recipientExists = senderUser.customers.includes(recepientId);

    // If the recipient doesn't exist, add them to the customers array
    if (!recipientExists) {
      await senderUser.addCustomer(recepientId);
    }

    // Find the sender user by ID
    const recepientUser = await User.findById(recepientId);
    if (!recepientUser) {
      return res.status(404).json({ error: "Recepient user not found" });
    }

    // Check if the recipientId is already in the senderUser's customers array
    const senderExists = recepientUser.customers.includes(senderId);

    // If the recipient doesn't exist, add them to the customers array
    if (!senderExists) {
      await recepientUser.addCustomer(senderId);
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      recepientId,
      messageType,
      message,
      timestamp: new Date(),
    });

    // Save the new message
    await newMessage.save();

    // Respond with success
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//endpoint to fetch the messages between two users in the chatRoom
const getMessage = async (req, res) => {
  const { senderId, recepientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, recepientId: recepientId },
        { senderId: recepientId, recepientId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getMessage,
  sendMessage,
};
