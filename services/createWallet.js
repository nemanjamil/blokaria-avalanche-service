var express = require('express');
var router = express.Router();

router.get('', async (req, res) => {

    const { body } = req;
    console.log("Body START : createWallet: ", body)

    try {

        res.json({
            "createWallet": true
        })

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ error: err.toString() });
    }

})

module.exports = router;


