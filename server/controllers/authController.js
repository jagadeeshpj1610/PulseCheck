
const { registerUser } = require('../services/authService')


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await registerUser(name, email, password);

        return res.status(200).json({
            success: true,
            message: "User registered Sucessfully",
            data: user
        })

    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = { register }