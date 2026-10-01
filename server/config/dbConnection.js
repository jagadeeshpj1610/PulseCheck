const config = require('../config/index.js')
const { Pool } = require('pg')

const pool = new Pool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
})


pool.on('error', (err) => {
    console.log("Database Error : ", err.message);
})



const testConnection = async () => {
    await pool.query('SELECT 1')
}


module.exports = { pool, testConnection }