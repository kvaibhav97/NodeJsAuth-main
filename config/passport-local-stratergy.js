const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
//Importing passport and localStrategy

const CollectionReference = require('../model/mongoose');
//Importing the collection reference

passport.use(new LocalStrategy(
    {
        usernameField : 'email',
        passReqToCallback : true,
    },
    function(req,email,password,done){
        CollectionReference.findOne({email : email},function (err,user){
            if(err){
                console.log('Error in authentication with passport');
                return done(err);
            }
            if(user.password!=req.body.password){
                console.log("Invalid UserName/Password");
                req.flash('error','Invalid UserName/Password');
                return done(null,false);
            }
            console.log("User Found");
            req.flash('success', 'LoggedIn Successfully');
            return done(null,user);
        })
    }
));
//Using LocalStrategy to login the user

passport.serializeUser(function (user, done) {
    console.log('******', user);
    done(null, user._id);
});
//setting the user id once login is successful

passport.deserializeUser(function (id, done) {
    CollectionReference.findById(id, function (err, user) {
        if (err) {
            console.log("Error while using deserialize");
            done(err);
        }
        if (!user) {
            console.log("User not found");
            return done(null, false);
        }
        console.log("User found");
        return done(null, user);
    })
});
//Deserializing the user to gt it authenticated in further requests

passport.checkAuthentication = function (req, res, next) {
    console.log("***isAuth---->", req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
}
//Check if the user is authenticated

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}
//setting the object locals having user object

module.exports = passport;

