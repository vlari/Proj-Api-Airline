const express = require('express');
const orderController = require('./orderController');
const auth = require('../../middleware/auth');
const orderValidator = require('../../middleware/requestValidators/orderValidator');

const router = express.Router();

const {
  getOrders,
  getOrderByFlight,
  placeOrder
} = orderController;

router
  .route('/orders')
  .get( getOrders)
  .get(auth.guard, getOrderByFlight)
  .post(orderValidator.validateOrderSubmit, placeOrder);

module.exports = router;
