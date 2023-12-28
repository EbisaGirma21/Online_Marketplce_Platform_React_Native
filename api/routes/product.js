const express = require("express");

// controller functions
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

const router = express.Router();

// signup route
router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id", updateProduct);

module.exports = router;
