var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main');

/* GET home page. */
/* Imported from controllers/main.js */
router.get('/', mainController.index);

module.exports = router;
