var express = require('express');
var router = express.Router()

var staticController = require('../controllers/statics');

// Static
router.route('/')
  .get(staticController.lander);

// User

// Event

module.exports = router;