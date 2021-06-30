const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');

const createUser = async (req = request, res = response, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        ok: false,
        errors: { msg: 'Email already exists' },
      });
    }

    const new_user = new User(req.body);

    const salt = bcrypt.genSaltSync(10);

    new_user.password = bcrypt.hashSync(password, salt);

    await new_user.save();

    const token = generateJWT(new_user.uid);

    res.json({
      ok: true,
      user: new_user,
      token,
    });
  } catch (error) {
    console.log(chalk.red(`Something wrong happened : ${error}`));
    res.status(500).json({
      ok: false,
      errors: { msg: 'Please contact the Admin' },
    });
  }
};

const login = async (req = request, res = response, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        errors: { msg: 'Email is not registered' },
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        errors: { msg: 'Password is not valid' },
      });
    }

    const token = generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(chalk.red(`Something wrong happened : ${error}`));
    res.status(500).json({
      ok: false,
      errors: { msg: 'Please contact the Admin' },
    });
  }
};

const renewToken = async (req = request, res = response, next) => {
  try {
    const uid = req.uid;

    const token = generateJWT(uid);

    const user = await User.findById(uid);

    res.json({
      ok: true,
      token,
      user,
    });
  } catch (error) {
    console.log(chalk.red(`Something wrong happened : ${error}`));
  }
};

module.exports = {
  createUser,
  login,
  renewToken,
};
