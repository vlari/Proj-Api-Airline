const express = require('express');
const cookieParser = require('cookie-parser');
const env = require('../config/env');
const morgan = require('morgan');

const errorHandlerService = require('../services/errorHandlerService');

const app = express();

// Cors setup here

app.use(express.json());
app.use(cookieParser());

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routing here


app.use((error, req, res, next) => {
  errorHandlerService.handleError(error, res);
});

module.exports = app;
