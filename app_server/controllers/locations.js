/* GET the homepage view */
module.exports.homelist = function( req, res ){
    res.render('locations-list', { title: 'Home' });
};

/* GET the location view */
module.exports.locations = function( req, res ){
    res.render('index', { title: 'Location info' });
};

/* GET the add review view */
module.exports.addReview = function( req, res ){
    res.render('index', { title: 'Add review' });
};
