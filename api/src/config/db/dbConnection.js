const sequelize = require('./db');
const chalk = require('chalk');

exports.connectDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log(
      chalk.inverse.yellow(
        'Database connection has been stablished successfully'
      )
    );
  } catch (error) {
    console.log(chalk.inverse.red('Unable to connect to the database', error));
  }
};
