const express = require('express');

const db = require('./config/mongoose');

const passport = require('passport');

const LocalStatPassport = require('./config/passport-local-stratergy');

const GoogleStatPassport = require('./config/passport-google-OAuth');

const nodemailer = require('./config/nodemailer');

const NotyMiddleware = require('./model/notymiddleware');

const cookieParser = require('cookie-parser');

const flash = require('connect-flash');

const session = require('express-session');

const MongoStore = require('connect-mongodb-session')(session);
//liked session with mongodb

const app = express();

const port = process.env.PORT || 8000;

//get data from cookie
app.use(cookieParser());

//used for the notification to add the middleware
app.use(flash());

//Set the view engine to ejs and the path to access
app.set('view engine', 'ejs');

app.set('views', './views');

//Session created for the cookies
app.use(session({
    name: 'LoginWithPassport',
    secret: 'MastMola',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: new MongoStore(
        {
            uri: 'mongodb://localhost:27017/NodejsAuth',
            collection: 'mySessions',
        },
        function (err) {
            console.log(err || console.log("Cookie Stored Success"));
        }
    )
}));


app.use(NotyMiddleware.setFlash);
//Added MiddleWare for noty

app.use(express.static('./assets'));

app.use(express.urlencoded());

//Initializing Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
 
app.use('/',require('./routes/signIn'));
app.use('/', require('./routes/signUp'));
app.use('/', require('./routes/welcome'));
//Maintained Routes to be seen in routes folder

app.listen(port, function (){
    console.log('Listening!!');
}) 