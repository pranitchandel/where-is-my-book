const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  address: [
    {
      type: String,
    },
  ],
  paymentMode: [
    {
      modeName: {
        type: String,
      },
      nameOnCard: {
        type: String,
      },
      cardNumber: {
        type: String,
      },
      cvv: {
        type: String,
      },
    },
  ],
  orders: [
    {
      productId: {
        type: String,
        required: true,
      },
      dateOfOrder: {
        type: Date,
        required: true,
      },
      paymentMode: {
        type: String,
        required: true,
      },
      deliveryDate: {
        type: Date,
        required: true,
      },
      discount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
  wishList: [
    {
      productId: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
