const mongoose = require("mongoose");

const ProductCatagorySchema = mongoose.Schema(
  {
    catagory: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
    productNames: [
      {
        name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const ProductCatagory = mongoose.model(
  "ProductCatagory",
  ProductCatagorySchema
);
module.exports = ProductCatagory;
