var express = require('express');
var router = express.Router();
var placesController = require('../controllers/placesController')

/* GET home page. */
router.get('/:type/:location', placesController.getNearbyPlace);

module.exports = router;
