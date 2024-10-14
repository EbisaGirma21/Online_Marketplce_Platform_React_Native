const express = require("express");

// controller functions
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  wishlist,
  getMyWishList,
} = require("../controllers/product");
const upload = require("../middleware/multer");

const router = express.Router();

// signup route
router.post("/", upload.uploadListingImages, createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id", updateProduct);
router.put("/wishlist/:id", wishlist);
router.get("/mywishlist/:id", getMyWishList);

module.exports = router;
