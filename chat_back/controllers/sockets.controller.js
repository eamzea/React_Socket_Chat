const Message = require('../models/Message');
const User = require('../models/User');

const userConnected = async uid => {
  try {
    const user = await User.findByIdAndUpdate(
      uid,
      { online: true },
      { returnOriginal: false }
    );

    return user;
  } catch (error) {
    console.log(chalk.red(`Something wrong happened : ${error}`));
  }
};

const userDisconnected = async uid => {
  try {
    const user = await User.findByIdAndUpdate(
      uid,
      { online: false },
      { returnOriginal: false }
    );

    return user;
  } catch (error) {
    console.log(chalk.red(`Something wrong happened : ${error}`));
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();

    return users;
  } catch (error) {
    console.log(chalk.red(`Something wrong happened : ${error}`));
  }
};

const saveMsgs = async ({ from, to, msg }) => {
  try {
    const newMsg = new Message({ from, to, msg });
    await newMsg.save();

    return newMsg;
  } catch (error) {
    console.log(chalk.red(`Something wrong happened : ${error}`));
  }
};

module.exports = { userConnected, userDisconnected, getUsers, saveMsgs };
