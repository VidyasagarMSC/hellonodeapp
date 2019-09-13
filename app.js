const express = require('express')

const app = express()

// First route
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})

app.listen('3000')