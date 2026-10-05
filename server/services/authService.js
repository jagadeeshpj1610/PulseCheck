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


const loginUser = async (email, password) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email, password_hash, created_at
             FROM users
             WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            const err = new Error("Invalid email or password");
            err.statusCode = 401;
            throw err;
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            const err = new Error("Invalid email or password");
            err.statusCode = 401;
            throw err;
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at
        };

    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        console.error("Login service failed:", error.message);

        const err = new Error("Login failed");
        err.statusCode = 500;
        throw err;
    }
};

const getUserById = async (id) => {
    const result = await pool.query(
        'SELECT id, name, email, created_at FROM users WHERE id = $1',
        [id]
    )
    if (result.rows.length === 0) {
        const err = new Error('User no longer exists')
        err.statusCode = 401
        throw err
    }
    return result.rows[0]
}

module.exports = { registerUser, loginUser, getUserById }