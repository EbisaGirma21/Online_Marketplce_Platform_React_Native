// Import necessary libraries/modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const user = require("./routes/user");
const productCatagory = require("./routes/productCatagory");
const product = require("./routes/product");
const message = require("./routes/message");

const app = express();
const port = 8000;
app.use(cors());

// middleware
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static("files"));

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

mongoose
  .connect(
    "mongodb+srv://marketplace:marketplace@cluster0.qp0lqio.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection failed!", error.message);
  });

app.use("/api/user", user);
app.use("/api/productCatagory", productCatagory);
app.use("/api/product", product);
app.use("/api/message", message);
