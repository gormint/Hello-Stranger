module.exports = function(io){

  var express = require('express');
  var router = express.Router();
  var bodyParser = require('body-parser');
  // Used to manipulate POST methods
  var methodOverride = require('method-override');
  var passport = require("passport");
  var usersController = require('../controllers/users');
  var staticController = require('../controllers/statics');
  var eventsController = require('../controllers/events')(io);

  // Static
  router.route('/')
  // .get(staticController.lander);
    .get(usersController.getLogin);


  // User
  function authenticatedUser(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }

  router.route('/signup')
    .get(usersController.getSignup)
    .post(usersController.postSignup)

  router.route('/login')
    .get(usersController.getLogin)
    .post(usersController.postLogin)

  router.route("/logout")
    .get(usersController.getLogout)

  // after login user will come here
  router.route("/home")
    .get(authenticatedUser, staticController.home);

  // Event
  router.route('/events')
    .post(authenticatedUser, eventsController.create)
    .get(authenticatedUser, eventsController.index)

  return router;
}

