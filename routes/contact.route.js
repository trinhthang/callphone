const express = require('express');
const ContactController = require('../controllers/contact.controller');

let router = express.Router();

router.use((req, res, next) => {
    console.log('Accessed to /api/contact/');
    next();
})

//router.route('/')
//router.route('/:contact_id')


module.exports = router;