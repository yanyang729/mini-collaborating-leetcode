/**
 * Created by yangyang on 7/17/17.
 */
const express = require('express');
const router = express.Router();


router.get('/',function(req,res) {
    res.sendFile('index.html',{root:path.join(__dirname,'../../public/')});
});

module.exports = router;