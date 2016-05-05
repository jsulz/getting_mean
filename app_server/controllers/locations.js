/* GET the homepage view */
module.exports.homelist = function( req, res ){
    res.render('locations-list', { 
    	title: 'Loc8r',
    	pageHeader: {
    		title: 'Loc8r',
    		strapLine: 'Find places to work with wifi near you!'
    	} 
    });
};

/* GET the add review view */
module.exports.addReview = function( req, res ){
    res.render('location-review-form', { title: 'Add Revew' });
};

/* Get the locations view */
module.exports.locationInfo = function( req, res ){
    res.render('location-info', { title: 'Location info' });
};
