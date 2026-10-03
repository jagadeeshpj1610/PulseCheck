const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController')
const { validateUserRegister } = require('../validators/authValidator')

router.post('/register', validateUserRegister, register)
router.post('/login' , login)

module.exports =  router 