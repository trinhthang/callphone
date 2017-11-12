const express = require('express');
const UserController = require('../controllers/user.controller');

let router = express.Router();

router.use((req, res, next) => {
    console.log('Accessed to /api/user/');
    next();
})

router.route('/')
    .post((req, res) => {
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
    .get((req, res) => {
        if (req.query.searchString) {
            UserController.searchUserByNamePhoneEmail(req.query.searchString, (err, docs) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(docs);
                }
            })
        } else {
            UserController.getAllUser((err, docs) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(docs);
                }
            })
        }
    });

router.route('/:user_id')
    .get((req, res) => {
        UserController.getUserById(req.params.user_id, (err, doc) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(doc);
            }
        })
    })
    .put((req, res) => {
        dataUpdate = {
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email
        }
        UserController.editUser(user_id, dataUpdate, (err, doc) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(doc);
            }
        })
    });

module.exports = router;