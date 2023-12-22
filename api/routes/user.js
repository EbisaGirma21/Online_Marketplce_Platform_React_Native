const express = require("express");

// controller functions
const {
  loginUser,
  registerUser,
  getUser,
  changePassword,
} = require("../controllers/user");

const router = express.Router();

router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/registration", registerUser);
router.post("/change", changePassword);

module.exports = router;
