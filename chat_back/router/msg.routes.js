const { Router } = require('express');
const { getMessages } = require('../controllers/msg.controller');
const validateJWT = require('../middlewares/validate_jwt');

const router = Router();

router.get('/:from', validateJWT, getMessages);

module.exports = router;
