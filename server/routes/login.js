const express = require('express')
const router = express.Router()
const User = require("../models/User")
const reqLogin = require('../middleware/reqLogin')


router.get('/', reqLogin, (req, res) => {
    res.status(200).send()
  });


router.post('/', async (req, res) => {
    console.log(req.body)
    const id = req.body.id
    const password = req.body.password

    if (id === '' || password === '')
    {
        return res.status(400).send()
    }
    const user = await User.findOne({ID: id})
    if (user)
    {

        if (user.password === password)
        {
            req.session.isAuth = true;
            req.session.userID = user._id;
            console.log('logged in!')
        } else {
            return res.status(401).send()
        }
    } else {
        return res.status(401).send()
    }
    res.status(200).send({role: user.role})
})


module.exports = router;



