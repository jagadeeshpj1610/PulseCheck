const express = require('express')
const cors = require('cors')
const config = require('./config/index.js')
const { testConnection } = require('./config/dbConnection.js')
const authRoutes = require('./routes/authRoutes.js')


const app = express()
let isDbUp = true

app.use(cors())
app.use(express.json())

const start = async () => {
    try {
        await testConnection()
        console.log("database connection successful");
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`)
        })
    } catch (error) {
        console.error('Database connection failed:', error.code || error.message || error)
        process.exit(1)
    }
}

app.get('/health', async (req, res) => {
    try {
        await testConnection()
        res.status(200).json({ status: "ok", database: "connected", message: "backend server is running" })
    } catch (error) {
        console.error('Health check failed:', error.message)
        res.status(503).json({ status: "error", database: "not connected", message: "backend server is running but database is not connected" })
    }
})

app.use('/auth/', authRoutes)

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' })
})

app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ success: false, message: 'Invalid JSON body' })
    }
    console.error('Unhandled error:', err.message)
    res.status(500).json({ success: false, message: 'Something went wrong' })
})

start()