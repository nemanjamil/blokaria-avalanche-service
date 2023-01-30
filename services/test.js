var express = require('express');
var router = express.Router();
//const Joi = require('joi');

router.post('/', async (req, res) => {

    const { body } = req;
    console.log("Body START CHECK WALLET - HIT: ", body)

    console.log('AVAX process.env.BLOKARIA_WEBSITE', process.env.BLOKARIA_WEBSITE);
    console.log('AVAX process.env.TEST_SECRET', process.env.TEST_SECRET);

    try {

        res.json({
            "BLOKARIA_WEBSITE": process.env.BLOKARIA_WEBSITE,
            "process.env.TEST_SECRET": process.env.TEST_SECRET
        })

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ error: err.toString() });
    }

})

module.exports = router;


