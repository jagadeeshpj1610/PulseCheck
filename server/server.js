require('dotenv').config()
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;

app.get('/health', (req, res) => res.send("server is running"))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}   )