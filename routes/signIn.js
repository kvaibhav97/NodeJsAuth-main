const express = require('express');

const passport = require('passport');

const router = express.Router();

const LoginPage = require('../controller/loginPage');
//Import the controllers required for login

router.post('/sign-In',passport.authenticate('local',{failureRedirect : 'login'}),LoginPage.SendDetails);
//added a post request attached to the passport local strategy for authentication 

router.get('/login',LoginPage.LoginPage);
//the the loginPage

router.get('/signin/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//authenticate via google

router.get('/signIn/auth/google/callback', passport.authenticate('google', { failureRedirect: 'login' }), LoginPage.SendDetails);
//google callback url

module.exports = router;