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
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      chatStatus: {
        type: String,
        enum: ["seen", "unseen"],
        default: "unseen",
      },
      lastStatusChange: {
        type: Date,
        default: null,
      },
      unSeenMessage: {
        type: Number,
        default: 0,
      },
    },
  ],
  wishlist: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  image: {
    public_id: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  notificationToken: {
    type: String,
  },
  confirmation: {
    type: String,
    default: null,
  },
});

// Method to add a customer to the 'customers' array if not already present
userSchema.methods.addCustomer = function (customerId) {
  const existingCustomer = this.customers.find(
    (customer) => customer.customer === customerId
  );

  if (!existingCustomer) {
    this.customers.push({
      customer: customerId,
      chatStatus: "unseen",
      lastStatusChange: null,
    });
    return this.save();
  } else {
    // Customer already exists, do nothing
    return Promise.resolve(this);
  }
};

// Method to change chat status for a specific customer
userSchema.methods.changeChatStatus = function (customerId, newStatus) {
  const customerIndex = this.customers.findIndex(
    (customer) => customer.customer.toString() === customerId.toString()
  );

  if (customerIndex !== -1) {
    if (newStatus === "unseen") {
      this.customers[customerIndex].unSeenMessage =
        this.customers[customerIndex].unSeenMessage + 1;
    } else if (newStatus === "seen") {
      this.customers[customerIndex].unSeenMessage = 0;
    }
    this.customers[customerIndex].chatStatus = newStatus;
    if (newStatus === "unseen") {
      this.customers[customerIndex].lastStatusChange = new Date();
    }

    return this.save();
  } else {
    return Promise.resolve(this);
  }
};
userSchema.methods.changeTimeStatus = function (customerId, newStatus) {
  const customerIndex = this.customers.findIndex(
    (customer) => customer.customer.toString() === customerId.toString()
  );
  if (customerIndex !== -1) {
    this.customers[customerIndex].chatStatus = newStatus;
    if (newStatus === "unseen") {
      this.customers[customerIndex].lastStatusChange = new Date();
    }

    return this.save();
  } else {
    return Promise.resolve(this);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
