const express = require('express');
const orderController = require('./orderController');
const auth = require('../../middleware/auth');
const orderValidator = require('../../middleware/requestValidators/orderValidator');

const router = express.Router();

const { getOrders, placeOrder } = orderController;

router
  .route('/orders')
  .get(auth.guard, getOrders)
  .post(auth.guard, orderValidator.validateOrderSubmit, placeOrder);

module.exports = router;
