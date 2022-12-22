const nodeMailerConfig = require('../config/nodemailer');
//import the config file for nodemailer

const env = require('../secret/environment');
//import the object containing secret credentials

module.exports.sendMail = async function (email) {
    console.log('nodemailer Info File Called');
    await nodeMailerConfig.transporter.sendMail({
        from: process.env.email,
        to: email,
        subject: "Login to NodeJsAuth",
        html: `<p>Your account ${email} was just logged into the project.</p>`
    });
}
//function to send the mail