const express = require("express");

// controller functions
const {
  sendMessage,
  getMessage,
  updateStatus,
} = require("../controllers/message");

const router = express.Router();

// message route
router.post("/", sendMessage);
router.get("/:senderId/:recepientId", getMessage);
router.put("/updateChatStatus/:senderId/:recepientId", updateStatus);
module.exports = router;
