const express = require('express');
const productController = require('./../controllers/productController');
// const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(productController.aliasTopProducts, productController.getAllProducts);

router
  .route('')
  .get(productController.getAllProducts)
  .post(productController.uploadProductImages, productController.createProduct);

router
  .route('/:id')
  //   .get(userController.getUser)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
