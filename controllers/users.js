var passport = require("passport")

// GET /signup
function getSignup(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage')})
}

// POST /signup
function postSignup(req, res) {
  passport.authenticate('local-signup', {
    successRedirect : '/home',
    failureRedirect : '/signup',
    failureFlash : true
  })(req, res);
}

// GET /login
function getLogin(req, res) { 
  res.render('login.ejs', { message: req.flash('loginMessage') });
}

// POST /login 
function postLogin(req, res) {
  passport.authenticate('local-login', {
    successRedirect : "/home",
    failureRedirect : "/login",
    failureFlash    : true
  })(req, res);
}

// GET /logout
function getLogout(req, res) {
  req.logout();
  res.redirect("/");
}


module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout
}