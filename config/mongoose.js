const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/NodejsAuth');
//stablish a connection

const db = mongoose.connection;
//connection to db

db.on('error', console.error.bind(console, "Error while connecting to DB"));

db.once('open', function () {
    console.log("Open and running DB");
});
//checking the state of connection