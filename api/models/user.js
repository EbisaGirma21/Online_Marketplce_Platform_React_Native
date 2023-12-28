const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },
  kebeleId: {
    type: String,
  },
  nationalId: {
    type: String,
  },
  specificLoaction: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Method to add a customer to the 'customers' array if not already present
userSchema.methods.addCustomer = function (customerId) {
  if (!this.customers.includes(customerId)) {
    this.customers.push(customerId);
    return this.save();
  } else {
    // Customer already exists, do nothing
    return Promise.resolve(this);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
