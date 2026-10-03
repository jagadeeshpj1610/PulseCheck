const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware')

const { register, login, getCurrentUser } = require('../controllers/authController')
const { validateUserRegister } = require('../validators/authValidator')

router.post('/register', validateUserRegister, register)
router.post('/login' , login)
router.get('/me',verifyToken, getCurrentUser)

module.exports =  router 