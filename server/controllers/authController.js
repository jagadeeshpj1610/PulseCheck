
const { registerUser } = require('../services/authService')


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

module.exports = { register }