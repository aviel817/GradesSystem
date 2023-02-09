const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/isAuth')


router.post('/', isAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.status(200).send()
    });
});

module.exports = router