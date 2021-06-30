const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  try {
    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({
        ok: false,
        errors: { msg: 'JWT missing' },
      });
    }

    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    req.uid = uid;

    next();
  } catch (error) {
    console.log(chalk.red(`Something wrong happened : ${error}`));
    res.status(500).json({
      ok: false,
      errors: { msg: 'JWT invalid' },
    });
  }
};

module.exports = validateJWT;
