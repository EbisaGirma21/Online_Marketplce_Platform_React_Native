const mongoose = require("mongoose");
const Message = require("../models/message");
const User = require("../models/user");
const sendPushNotification = require("./notifications");

//endpoint to post Messages and store it in the backend
// endpoint to post Messages and store it in the backend
const sendMessage = async (req, res) => {
  try {
    const { senderId, recepientId, messageType, message } = req.body;
    // Find the sender user by ID
    const senderUser = await User.findById(senderId);
    if (!senderUser) {
      return res.status(404).json({ error: "Sender user not found" });
    }

    const recipientExists = senderUser.customers.some(
      (customerData) =>
        customerData.customer.toString() === recepientId.toString()
    );

    if (!recipientExists) {
      await senderUser.addCustomer(recepientId);
    }
    // Find the sender user by ID
    const recepientUser = await User.findById(recepientId);
    if (!recepientUser) {
      return res.status(404).json({ error: "Recipient user not found" });
    }

    const senderExists = recepientUser.customers.some(
      (customerData) => customerData.customer.toString() === senderId.toString()
    );

    if (!senderExists) {
      await recepientUser.addCustomer(senderId);
    }

    const newMessage = new Message({
      senderId,
      recepientId,
      messageType,
      message,
      timestamp: new Date(),
    });

    // Save the new message
    await newMessage.save();

    // Update the chat status of the sender and recipient
    await senderUser.changeTimeStatus(recepientId, "unseen");
    await recepientUser.changeChatStatus(senderId, "unseen");

    sendPushNotification(
      recepientUser.notificationToken,
      message,
      "Mymarket Message"
    );

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
    })
      .populate("senderId", "_id name")
      .sort({ timeStamp: -1 }); // Sort by timestamp in descending order

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route to update chat status
const updateStatus = async (req, res) => {
  const { senderId, recepientId } = req.params;
  try {
    // Find the user by ID
    const user = await User.findById(senderId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update chat status
    await user.changeChatStatus(recepientId, "seen");
    res.status(200).json({ message: "Chat status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getMessage,
  sendMessage,
  updateStatus,
};
