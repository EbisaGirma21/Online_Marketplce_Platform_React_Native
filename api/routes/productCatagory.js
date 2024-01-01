const express = require("express");

// controller functions
const {
  getProductCatagorys,
  getProductCatagory,
  createProductCatagory,
  deleteProductCatagory,
  updateProductCatagory,
} = require("../controllers/productCatagory");
const upload = require("../middleware/multer");
const { createListing } = require("../controllers/catagory");

const router = express.Router();

// signup route
router.post("/", upload.uploadListingImages, createProductCatagory);
router.get("/", getProductCatagorys);
// router.post("/create", uploadListingImages, createListing);

router.get("/:id", getProductCatagory);

router.delete("/:id", deleteProductCatagory);

router.patch("/:id", updateProductCatagory);

module.exports = router;
