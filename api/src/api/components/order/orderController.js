const responseService = require('../../../services/responseService');
const orderDataService = require('./orderDataService');
const flightDataService = require('../flight/flightDataService');
const mailService = require('../../../services/mail/mailService');
const { sendJsonResponse, sendErrorResponse } = responseService;
const Order = require('./models/order');
const chalk = require('chalk');

exports.getOrders = async (req, res, next) => {
  try {
    const accountId = req.dataValues.id;

    const orders = await orderDataService.getAccountOrders(accountId);

    sendJsonResponse(200, { data: orders, count: orders.count }, res);
  } catch (error) {
    next(sendErrorResponse(500, error.message));
  }
};

exports.getOrderByFlight = async (req, res, next) => {
  try {
  } catch (error) {
    next(sendErrorResponse(500, error.message));
  }
};

exports.placeOrder = async (req, res, next) => {
  try {
    const {
      PaymentOptionId,
      subtotal,
      tax,
      total,
      flights,
      travelers,
    } = req.body;

    const flightOrder = {};
    const orders = await Order.count();
    const orderNumber = orders || 0;

    // The consumer has to send the selected
    // seats as part of the request.
    let accountId = req.user ? req.user.dataValues.id : null;
    let emailRecipient;

    if (req.user) {
      accountId = req.user.dataValues.id;
      emailRecipient = req.user.dataValues.email;
    } else {
      accountId = null;
      emailRecipient = travelers.map((t) => t.email);
    }

    flightOrder.AccountId = accountId;
    flightOrder.orderNumber = `FON-${orderNumber + 1}`;
    flightOrder.PaymentOptionId = PaymentOptionId;
    flightOrder.date = new Date(Date.now());
    flightOrder.subtotal = parseFloat(subtotal).toFixed(2);
    flightOrder.tax = parseFloat(tax).toFixed(2);
    flightOrder.total = parseFloat(total).toFixed(2);

    const registeredOrder = await orderDataService.addOrder(flightOrder);

    let flightNumbers = flights.map((o) => o.flightNumber);
    const orderFlights = await flightDataService.getOrderFlights(flightNumbers);

    await orderDataService.addFlights(registeredOrder, orderFlights);
    await orderDataService.addTravelers(registeredOrder, travelers);

    const pendingFlights = await orderDataService.getOrderFlights(
      registeredOrder
    );

    // Send order email.
    const emailOptions = {
      type: 'newOrder',
      email: emailRecipient,
      flights: pendingFlights,
      travelers,
    };

    const emailSettings = mailService.getEmailSettings(emailOptions);
    const transporter = mailService.getTransporter();

    transporter.verify((error, success) => {
      if (error) {
        return next(sendErrorResponse(500, `SMTP connection error. ${error}`));
      } else {
        console.log(chalk.green.inverse('SMTP connection ready'));
      }
    });

    transporter.sendMail(emailSettings, (error, info) => {
      if (error) {
        return next(sendErrorResponse(500));
      } else {
        sendJsonResponse(201, { data: registeredOrder }, res);
      }
    });
  } catch (error) {}
};
