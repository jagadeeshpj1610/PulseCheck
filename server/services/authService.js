const { pool } = require('../config/dbConnection')
const bcrypt = require('bcryptjs')

const registerUser = async (name, email, password_hash) => {
    const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1', [email]
    )
    if (existingUser.rows.length > 0) {
        const err = new Error('Email already registered')
        err.statusCode = 409
        throw err
    }
    const hashPassword = await bcrypt.hash(password_hash, 10)

    const result = await pool.query(
        `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at, updated_at`,
        [name, email, hashPassword]
    )

    return result.rows[0];
}

module.exports = { registerUser }