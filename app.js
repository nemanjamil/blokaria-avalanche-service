#!/usr/bin/env node
const express = require('express')
const app = express()
const port = 3344
require('dotenv').config();
var generateNFT = require('./services/test');

app.use(express.json())

app.use('/test', generateNFT);

app.get('/healthCheck', (req, res) => {
    console.log("healthCheck")
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

