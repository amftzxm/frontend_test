// const moment = require('moment');
const Order = require('./../models/orderModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const Product = require('./../models/productModel');
// const AppError = require('./../utils/appError');

exports.aliasToDayOrders = (req, res, next) => {
  const today = new Date();
  today.setUTCHours(-7, 0, 0, 0); // set to beginning of the day in UTC
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // set to beginning of next day in UTC

  req.query.createdAt = {
    gte: today,
    lt: tomorrow
  };

  next();
};

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Order.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  let orders = await features.query;

  orders = orders.map(m => {
    m.order = m.order.filter(item => item.product !== null);
    return m;
  });

  res.status(200).json({
    data: orders,
    results: orders.length,
    status: 'success'
  });
});

exports.createOrders = catchAsync(async (req, res, next) => {
  // req.body.customer = req.user._id;
  const order = await Order.create(req.body);
  res.status(200).json({ data: order, status: 'success' });
});

exports.getOrdersToday = catchAsync(async (req, res, next) => {
  const today = new Date();
  today.setUTCHours(-7, 0, 0, 0); // set to beginning of the day in UTC
  console.log(today);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // set to beginning of next day in UTC
  console.log(tomorrow);

  const items = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
          $lt: tomorrow
        }
      }
    },
    {
      $unwind: '$order'
    },
    {
      $group: {
        _id: '$order.product',
        totalAmount: { $sum: '$order.amount' }
      }
    }
  ]);

  await Product.populate(items, { path: '_id' });

  res
    .status(200)
    .json({ data: items.filter(f => f._id !== null), status: 'success' });
});

exports.deleteOrders = catchAsync(async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);
  if (!order) {
    res.status(404).send('Product not found');
    return;
  }
  res.status(200).send({ data: '', status: 'Product deleted' });
});
