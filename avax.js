#!/usr/bin/env node
const express = require('express')
const app = express()
const port = 3344
require('dotenv').config();
var generateNFT = require('./services/test');
var createWallet = require('./services/createWallet');
var mintNft = require('./services/mintNft');
var createCoinTransaction = require('./services/createCoinTransaction');
var sendNft = require('./services/sendNft');

app.use(express.json())

app.use('/test', generateNFT);
app.use('/createWallet', createWallet);
app.use('/mintNft', mintNft);
app.use('/createCoinTransaction', createCoinTransaction);
app.use('/sendNft', sendNft);

app.get('/healthCheck', (req, res) => {
    console.log("healthCheck")
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

