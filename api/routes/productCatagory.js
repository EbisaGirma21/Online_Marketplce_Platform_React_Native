const express = require("express");

// controller functions
const {
  getProductCatagorys,
  getProductCatagory,
  createProductCatagory,
  deleteProductCatagory,
  updateProductCatagory,
} = require("../controllers/productCatagory");

const router = express.Router();

// signup route
router.post("/", createProductCatagory);

router.get("/", getProductCatagorys);

router.get("/:id", getProductCatagory);

router.delete("/:id", deleteProductCatagory);

router.patch("/:id", updateProductCatagory);

module.exports = router;
