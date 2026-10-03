
const { registerUser, loginUser } = require('../services/authService')
const jwt = require('jsonwebtoken')
const config = require('../config/index')


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
        const normalizedEmail = email.trim().toLowerCase()
        const user = await loginUser(normalizedEmail, password)

        const token = jwt.sign(
            { id: user.id },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        );
        return res.status(200).json({
            success: true,
            message: "User Login Successful",
            token: token,
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

const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Authenticated user",
            user: req.user
        });
    } catch (error) {
        console.error("Get current user failed:", error.message);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

module.exports = { register, login, getCurrentUser }