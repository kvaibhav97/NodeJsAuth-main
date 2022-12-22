const express = require('express');

const router = express.Router();

const WelcomePage = require('../controller/welcome');
//Controller having functions related

router.get('/welcome', WelcomePage.welcome);
//Route to get the page

router.get('/log-out', WelcomePage.logout);
//Route to post the signup details

module.exports = router;