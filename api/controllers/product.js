const Product = require("../models/product");
const ProductCatagory = require("../models/productCatagory");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

// get all Products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ updatedAt: -1 });
  const productsData = await Promise.all(
    products.map(async (product) => {
      const productCatagory = await ProductCatagory.findById(
        product.productCatagory.toString()
      );
      return {
        ...product._doc,
        productCatagory: productCatagory.producCatagoryName,
        productCatagoryId: productCatagory._id,
      };
    })
  );

  res.status(200).json(productsData);
};

// get a single Product
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// create a new Product
const createProduct = async (req, res) => {
  const {
    catagory,
    productName,
    brandName,
    modelName,
    specification,
    amount,
    price,
    condition,
    shortDescription,
    location,
    owner,
  } = req.body;
  console.log(location, owner);
  let emptyFields = [];

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const uploadedImages = [];

    const result = await cloudinary.uploader.upload(req.files.image[0].path, {
      folder: "psms",
    });

    const product = await Product.create({
      productName,
      brandName,
      modelName,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      specification,
      amount,
      price,
      condition,
      shortDescription,
      specificLoaction: location,
      productCatagory: catagory,
      productOwner: owner,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// delete a Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const imagePublicIds = deletedProduct.images.map((image) => image.public_id);

  // Delete multiple images
  const deletionPromises = imagePublicIds.map((publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });

  try {
    await Promise.all(deletionPromises);

    // All images deleted successfully
    // Delete the product from the database
    const deletedProductFromDB = await Product.findOneAndDelete({ _id: id });

    if (!deletedProductFromDB) {
      return res.status(400).json({ error: "No such product" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Error deleting product and images" });
  }
};

// update a Product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(400).json({ error: "No such Product" });
  }

  res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
