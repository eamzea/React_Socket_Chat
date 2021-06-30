const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUser,
  login,
  renewToken,
} = require('../controllers/auth.controller');
const validateFields = require('../middlewares/validate_fields');
const validateJWT = require('../middlewares/validate_jwt');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'Name is required')
      .isString()
      .notEmpty()
      .withMessage(`Name can't be empty`),
    check('email', 'Email is required')
      .isEmail()
      .withMessage(`Email can't be empty`),
    check('password', 'Password is required')
      .isString()
      .notEmpty()
      .withMessage(`Password can't be empty`),
    validateFields,
  ],
  createUser
);

router.post(
  '/login',
  [
    check('email', 'Email is required')
      .isEmail()
      .notEmpty()
      .withMessage(`Email can't be empty`),
    check('password', 'Password is required')
      .notEmpty()
      .withMessage(`Password can't be empty`),
    validateFields,
  ],
  login
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
