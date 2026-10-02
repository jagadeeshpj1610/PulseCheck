const { pool } = require('../config/dbConnection')


const registerUser = async (name, email, passwordHash) => {
    const existingUser = await pool.query(
        `SELECT * id FROM users WHERE email = $1`, [email]
    )
    if (existingUser.rows.length > 0) {
        throw new Error('Email already registered')
    }

    const result = await pool.query(
        `INSERT INTO users (name, email, passwordHash) VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at, updated_at`,
        [name, email, passwordHash]
    )

    return result.rows[0];
}

module.exports = { registerUser }