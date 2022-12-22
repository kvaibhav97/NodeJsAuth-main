module.exports.welcome = function(req,res){
    if(req.isAuthenticated()){
        req.flash('success', 'Successfully loggedIn');
        return res.render('welcome', { locals: res.locals, email: req.user.email });
    }
    return res.redirect('/login');
    
}
//go to welcome page only if the user is authenticated else redirect to login page

module.exports.logout = function(req,res){
    req.logOut();
    req.flash('success', 'You have logged Out');
    return res.redirect('/login');
}
//add a message for notification at the time of logging out