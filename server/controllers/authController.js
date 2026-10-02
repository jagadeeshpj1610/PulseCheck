
const { registerUser } = require('../services/authService')
const brcypt = require('bcryptjs')


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await brcypt.hash(password, 10)
        const user = await registerUser(name, email, hashPassword);

        return res.status(201).json({
            success: true,
            message: "User registered Sucessfully",
            data: user
        })

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            })
        }
        console.error('Register failed:', error.message)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }

}

module.exports = { register }