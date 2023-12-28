const express = require("express");

// controller functions
const {
  loginUser,
  registerUser,
  getUser,
  changePassword,
  sellerRegistration,
  getCustomers,
} = require("../controllers/user");

const router = express.Router();

router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/registration", registerUser);
router.post("/change", changePassword);
router.post("/sellerRegistration", sellerRegistration);
router.get("/customers/:id", getCustomers);

module.exports = router;
