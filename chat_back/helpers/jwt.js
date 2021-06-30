const jwt = require('jsonwebtoken');

const generateJWT = uid =>
  jwt.sign({ uid }, process.env.JWT_KEY, { expiresIn: '24h' });

const verifyJWT = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    return [true, uid];
  } catch (error) {
    console.log(error);
    return [false, null];
  }
};

module.exports = { generateJWT, verifyJWT };
