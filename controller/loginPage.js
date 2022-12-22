const CollectionReference = require('../model/mongoose');
//import collection reference for the db

const queue = require('../config/kue');
//import config file for queue

const worker = require('../worker/signIn_emailWorker');
//import worker file to add the configuration of a worker


module.exports.LoginPage = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/welcome');
    }
    return res.render('login');
}
// go to the welcome page if user already logged in else login page

module.exports.SendDetails = function (req,res){
    try{
        let job = queue.create('emails', { email: req.body.email }).save(function (err) {
            if (err) {
                return console.log('Error in job creation');

            }
            console.log(job.id);
        });
    }
    catch(e){

    }
    return res.redirect('/welcome');
}
// create a job to send mail to the logged in user