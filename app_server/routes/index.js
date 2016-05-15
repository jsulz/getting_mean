var express = require('express');
var router = express.Router();
var locationsController = require('../controllers/locations');
var othersController = require('../controllers/others');

/* GET locations-based views */
/* Imported from controllers/locations.js */
router.get('/', othersController.angularApp);

module.exports = router;
