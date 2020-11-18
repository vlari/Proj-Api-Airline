const env = require('./config/env');
const chalk = require('chalk');

const loadApp = require('./api/app');

const app = loadApp();

app.then((app) => {
  const port = env.PORT;
  app.listen(port, () => {
    console.log(chalk.green(`Server running in ${env.NODE_ENV} environment`));
    console.log(chalk.blue.inverse(`Server running on port: ${port}`));
  });
});
