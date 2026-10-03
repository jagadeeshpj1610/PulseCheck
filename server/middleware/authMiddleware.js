const jwt = require("jsonwebtoken");
const config = require('../config/index')

const verifyToken = (req, res, next) => {
    try {
        let token = null;
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const [scheme, value] = authHeader.split(" ");
            if (scheme === "Bearer" && value) {
                token = value;
            }
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] });

        req.user = {
            id: decoded.id,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

module.exports = { verifyToken }