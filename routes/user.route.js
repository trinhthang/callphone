const express = require('express');
const UserController = require('../controllers/user.controller');

var router = express.Router();

router.use((req, res, next) => {
    console.log('Something is happening');
    next();
})

router.route('/')
    .post((req, res) => {
        console.log(req.body);
        newUser = {
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email
        }

        UserController.createUser(newUser, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send("Tao user thanh cong:" + data);
            }
        });
    })


module.exports = router;