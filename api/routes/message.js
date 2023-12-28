const express = require("express");

// controller functions
const { sendMessage, getMessage } = require("../controllers/message");

const router = express.Router();

// message route
router.post("/", sendMessage);
router.get("/:senderId/:recepientId", getMessage);

module.exports = router;
