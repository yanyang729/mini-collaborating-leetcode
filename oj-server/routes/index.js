/**
 * Created by yangyang on 7/17/17.
 */
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
    // send index.html from public folder
    res.sendFile('index.html', { root: path.join(__dirname, '../../public/')});
});

module.exports = router;
