const { connect } = require('mongoose');

const db_connection = async () => {
  let url = null;
  let dev = false;
  try {
    if (process.env.NODE_ENV === 'development') {
      url = process.env.DB_URL_DEV;
      dev = true;
    } else {
      url = process.env.DB_URL;
    }

    await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(
      chalk.whiteBright.bgBlack(`${dev ? 'DEV' : 'PROD'} DB connected 📡`)
    );
  } catch (error) {
    console.log(chalk.red(`Something wrong happened: ${error}`));
  }
};

module.exports = db_connection;
