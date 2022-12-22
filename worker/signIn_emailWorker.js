const queue = require('../config/kue');

// to import the function to send mail
const nodemailerSignIn = require('../mailer/login_mailer');

//process the jobs added to the queue
queue.process('emails', function (job, done) {
    console.log(job.data);
    nodemailerSignIn.sendMail(job.data.email);
    done();
})