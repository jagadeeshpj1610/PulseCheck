const express = require('express')
const cors = require('cors')
const config = require('./config/index.js')


const app = express()

app.use(cors())
app.use(express.json())


app.get('/health', (req, res) => res.send("server is running"))

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})