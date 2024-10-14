const express = require("express");

// controller functions
const {
  loginUser,
  registerUser,
  getUser,
  changePassword,
  sellerRegistration,
  getCustomers,
  getUsers,
  updateUser,
  updateEmail,
  confirmEmail,
  confirmCode,
  resetPassword,
} = require("../controllers/user");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/registration", registerUser);
router.post("/change", changePassword);
router.post("/sellerRegistration", sellerRegistration);
router.get("/customers/:id", getCustomers);
router.put("/:id", upload.uploadListingImages, updateUser);
router.put("/info/:id", updateUser);
router.put("/email/:id", updateEmail);
router.post("/confirmation", confirmEmail);
router.post("/confirmation/check", confirmCode);
router.post("/reset", resetPassword);

module.exports = router;
