const express = require('express');
const router = express.Router();

const { register } = require('../controllers/authController')
const { validateUserRegister } = require('../validators/authValidator')

router.post('/register', validateUserRegister, register)

module.exports =  router 