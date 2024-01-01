const ProductCatagory = require("../models/productCatagory");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

// get catagories
const getProductCatagorys = async (req, res) => {
  try {
    const productCategories = await ProductCatagory.find();
    const modifiedCategories = productCategories.map((category) => {
      const product = category.productNames.map((product) => product.name);
      return { ...category.toObject(), product };
    });
    res.status(200).json(modifiedCategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product categories" });
  }
};

// get a single ProductCatagory
const getProductCatagory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such productCatagory" });
  }
  const productCatagory = await ProductCatagory.findById(id);

  if (!productCatagory) {
    return res.status(404).json({ error: "No such productCatagory" });
  }

  res.status(200).json(productCatagory);
};

// create a new ProductCatagory
const createProductCatagory = async (req, res) => {
  const { catagory, productNames } = req.body;

  const namesArray = productNames.split(",");

  let emptyFields = [];
  if (!catagory) {
    emptyFields.push("Catagory");
  }
  if (!namesArray) {
    emptyFields.push("namesArray");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }
  const product = [];
  try {
    const result = await cloudinary.uploader.upload(req.files.image[0].path, {
      folder: "mymarket",
    });
    // pushing product names
    namesArray.forEach((name) => {
      product.push({
        name: name,
      });
    });

    const productCatagory = await ProductCatagory.create({
      catagory,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      namesArray: product,
    });
    // Push each name from the request body to the namesArray array
    namesArray.forEach((name) => {
      productCatagory.productNames.push({ name });
    });

    res.status(200).json(productCatagory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// delete a ProductCatagory
const deleteProductCatagory = async (req, res) => {
  const { id } = req.params;
  const deletedProductCatagory = await ProductCatagory.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such productCatagory" });
  }
  cloudinary.uploader.destroy(
    deletedProductCatagory.image.public_id,
    (error) => {
      if (error) {
        return res.status(400).json({ error: "public Id is not correct" });
      }
    }
  );

  const productCatagory = await ProductCatagory.findOneAndDelete({ _id: id });

  if (!productCatagory) {
    return res.status(400).json({ error: "No such productCatagory" });
  }

  res.status(200).json(productCatagory);
};

// update a ProductCatagory
const updateProductCatagory = async (req, res) => {
  const { id } = req.params;
  const { productCatagoryName, productNames } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such productCatagory" });
  }
  // checking existance
  const productCatagory = await ProductCatagory.findById(id);
  if (!productCatagory) {
    return res.status(400).json({ error: "No such ProductCatagory" });
  }

  // updating names
  productCatagory.productCatagoryName = productCatagoryName;

  // update exist product
  productCatagory.productNames.forEach((productName, index) => {
    productName.name = productNames[index];
  });

  // adding if not exist
  productNames
    .slice(productCatagory.productNames.length)
    .forEach((newProductName) => {
      if (newProductName) {
        productCatagory.productNames.push({ name: newProductName });
      }
    });

  await productCatagory.save();

  res.status(200).json(productCatagory);
};

module.exports = {
  getProductCatagorys,
  getProductCatagory,
  createProductCatagory,
  deleteProductCatagory,
  updateProductCatagory,
};
