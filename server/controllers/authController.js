
const { registerUser, loginUser } = require('../services/authService')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const normalizedEmail = email.trim().toLowerCase(), normalizedName = name.trim()
        const user = await registerUser(normalizedName, normalizedEmail, password);

        return res.status(201).json({
            success: true,
            message: "User registered Sucessfully",
            data: user
        })

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            })
        }
        console.error('Register failed:', error.message)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }

}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("required");

            return res.status(400).json({ success: false, message: "email and password is required" })
        }
        const user = await loginUser(email, password)

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return res.status(200).json({
            success: true,
            message: "User Login Succesful",
            token : token,
            data: user
        })

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            })
        }
        console.error('Login Failed:', error.message)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

module.exports = { register, login }