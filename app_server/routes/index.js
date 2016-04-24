var express = require('express');
var router = express.Router();
var locationsController = require('../controllers/locations');
var othersController = require('../controllers/others');

/* GET locations-based views */
/* Imported from controllers/locations.js */
router.get('/', locationsController.homelist);
router.get('/location', locationsController.locations);
router.get('/location/review/new', locationsController.addReview);


/* GET other views */
/* Imported from controllers/others.js */
router.get('/about', othersController.about);

module.exports = router;
