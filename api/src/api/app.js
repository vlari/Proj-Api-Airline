const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const chalk = require('chalk');

const env = require('../config/env');
const sequelize = require('../config/db/db');
const dbConnection = require('../config/db/dbConnection');
const errorHandlerService = require('../services/errorHandlerService');
const seedDatabase = require('../config/db/seeder');
const router = require('./routes');

const loadApp = async () => {
  const app = express();

  // Cors setup here

  app.use(express.json());
  app.use(cookieParser());

  if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    seedDatabase();

    console.log(
      chalk.inverse.yellow(
        'Database connection has been stablished successfully'
      )
    );
  } catch (error) {
    console.log(chalk.inverse.red('Unable to connect to the database', error));
  }

  app.use(router);

  app.use((error, req, res, next) => {
    errorHandlerService.handleError(error, res);
  });

  return app;
};

module.exports = loadApp;
