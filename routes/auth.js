const express = require('express')
const AuthController = require('../Controller/auth')
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
module.exports = router