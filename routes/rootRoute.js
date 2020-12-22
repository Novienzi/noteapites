const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {
    res.send('Welcome to notes API')
})

module.exports = app