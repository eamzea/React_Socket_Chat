const { response, request } = require('express');
const Message = require('../models/Message');

const getMessages = async (req = request, res = response) => {
  try {
    const ID = req.uid;
    const { from } = req.params;

    const last30 = await Message.find({
      $or: [
        { from: ID, to: from },
        { from: from, to: ID },
      ],
    })
      .sort({ createdAt: 'asc' })
      .limit(30);

    res.json({
      ok: true,
      messages: last30,
    });
  } catch (error) {
    console.log(chalk.red(`Something wrong happened : ${error}`));
  }
};

module.exports = {
  getMessages,
};
