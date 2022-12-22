const nodemailer = require('nodemailer');
//import the nodemailer

const env = require('../secret/environment');
//import the env variable having secret keys

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.email,
        pass: process.env.password,
    },
    tls: {
        rejectUnauthorized: false,
    }
});
//setting up the transporter to send the mail



module.exports = {
    transporter: transporter,
}
//exporting the transporter to be accessed further