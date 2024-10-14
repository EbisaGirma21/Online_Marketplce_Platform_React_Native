const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  brandName: String,
  modelName: String,
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  specification: String,

  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: String,
  shortDescription: String,
  productLocation: String,
  productCatagory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCatagory",
    required: true,
  },
  productOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
