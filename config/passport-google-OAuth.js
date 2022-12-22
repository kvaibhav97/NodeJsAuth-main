const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/mongoose');
const env = require('../secret/environment');

//Importing necessary modules and the secret keys


passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: process.env.googleCallBackUrl,
    //use ones own secret key instead
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({ email: profile.emails[0].value },
            function (error, user) {
                if (error) {
                    return console.log('Error while finding using google auth');
                }
                if (user) {
                    return done(null, user);
                }
                else {
                    User.create({
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                    }, function (error, user) {
                        if (error) {
                            return console.log('Error while creating user with google auth');
                        }
                        return done(null, user);
                    });
                }
            })
    }
));
//Google auth Strategy to Sign in the user

module.exports = passport;
//export the module