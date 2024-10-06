const autoIncrement = require('mongoose-auto-increment');

const mongoose = require('mongoose');

// Define a MongoDB schema for a product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
    trim: true
  },
  costPrice: {
    type: Number,
    required: [true, 'A product must have a cost price']
  },
  sellingPrice: {
    type: Number,
    required: [true, 'A product must have a selling price']
  },
  photo: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'product_id',
  startAt: 1
});

// productSchema.pre(/^find/, function(next) {
//   // this points to the current query
//   this.find({ active: { $ne: false } });
//   next();
// });

// Compile the schema into a model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
