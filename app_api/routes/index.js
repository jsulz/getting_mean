var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/review');

//locations API requests
router.get('/locations', ctrlLocations.locationsListByDistance);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.post('/locations', ctrlLocations.locationsCreate);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

//reviews API requests
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.post('locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.put('locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
