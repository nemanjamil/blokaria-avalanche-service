var express = require('express');
var router = express.Router();

router.post('', async (req, res) => {

    const { body } = req;
    console.log("Body START : mintNft: ", body)

    try {

        res.json({
            "mintNft": true
        })

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ error: err.toString() });
    }

})

module.exports = router;


