
const CollectionReference = require('../model/mongoose');
//import the CollectionReference


module.exports.SignUpPage = function (req,res){
    return res.render('signup');
}
//get the signUpPage

module.exports.signup = async function (req,res){
    try{
        if(req.body.password==req.body.confirmPassword){
            var user = await  CollectionReference.create({email : req.body.email, password :req.body.password});
            //Creating new User
        }
        else{
            req.flash('error', 'Password Does not Match');
            return res.redirect('/signUpPage');
            //add flash value if passwords does not match and redirect
        }
    }
    catch(e){
        console.log('Error while creating loginId');
        //If any error arrives
    }
    req.flash('success', 'SignUp Successful');
    return res.redirect('/login');
}
//Create new User