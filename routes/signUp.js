const express = require('express');

const router = express.Router();

const SignUpPage = require('../controller/SignUpPage');
//Controller having functions related

router.get('/signUpPage',SignUpPage.SignUpPage);
//Route to get the page

router.post('/sign-Up',SignUpPage.signup);
//Route to post the signup details

module.exports = router;