const moment = require('moment-timezone');
const mongoose = require('mongoose');

const defaultThailand = moment.tz(Date.now(), 'Asia/Bangkok');
// Define a MongoDB schema for a product
const ordertSchema = new mongoose.Schema({
  nameCustomer: {
    type: String
  },
  order: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
      },
      amount: {
        type: Number
      },
      note: {
        type: String
      }
    }
  ],
  createdAt: {
    type: Date,
    default: defaultThailand
    // select: false
  }
});

ordertSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'order.product',
    select: '-__v -sellingPrice -costPrice'
  });
  next();
});

// Compile the schema into a model
const Order = mongoose.model('Order', ordertSchema);

module.exports = Order;
