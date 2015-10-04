var express = require('express');
var router = express.Router();


var staticController = require('../controllers/statics');
var eventsController = require('../controllers/events');

// Static
router.route('/')
  .get(staticController.lander);

// User

// Event
router.route("/events")
  .get(eventsController.index);

module.exports = router;