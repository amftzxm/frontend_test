const express = require('express');
const orderController = require('./../controllers/orderController');
// const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/today')
  .get(orderController.aliasToDayOrders, orderController.getAllOrders);

router.route('/orders-today').get(orderController.getOrdersToday);

router
  .route('')
  .get(orderController.getAllOrders)
  .post(orderController.createOrders);

module.exports = router;
