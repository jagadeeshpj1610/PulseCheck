const { pool } = require('../config/dbConnection')
const bcrypt = require('bcryptjs')

const registerUser = async (name, email, password) => {
    const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1', [email]
    )
    if (existingUser.rows.length > 0) {
        const err = new Error('Email already registered')
        err.statusCode = 409
        throw err
    }
    const password_hash = await bcrypt.hash(password, 10)

    let result
    try {
        result = await pool.query(
            `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at, updated_at`,
            [name, email, password_hash]
        )
    } catch (error) {
        if (error.code === '23505') {
            const err = new Error('Email already registered')
            err.statusCode = 409
            throw err
        }
        throw error
    }

    return result.rows[0]
}

module.exports = { registerUser }