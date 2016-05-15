var request = require('request');
var apiOptions = {
    server: "http://localhost:3000/"
};

if ( process.env.NODE_ENV == "production" ) {
    apiOptions.server = "http://limitless-ravine-96207.herokuapp.com/";
}

var renderHomepage = function( req, res, responseBody ){
    var message;
    if ( ! ( responseBody instanceof Array ) ) {
        message = 'API Lookup Error';
        responseBody = [];
    } else {
        if ( !responseBody.length ) {
            message = 'No places found nearby';
        }
    }
    res.render( 'locations-list', {
        title: 'Loc8r',
        pageHeader: {
            title: 'Loc8r',
            strapLine: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations : responseBody,
        message: message
    });
};

var _formattedDistance = function( distance ){
    var numericalDistance;
    if ( !distance ) { return 'Missing distance'; }
    if ( typeof distance !== 'number' ) { return 'Distance needs to be a number!' ; }
    if ( distance > 1 ) {
        numericalDistance = parseFloat(distance).toFixed( );
    } else {
        return '1m';
    }
    return numericalDistance;
};

var renderLocationpage = function( req, res, responseBody ) {
    var message;
    if ( !responseBody.reviews.length ) {
        message = "No reviews yet - you can be the first!";
    }
    res.render('location-info', {
        title: responseBody.name,
        pageHeader: {
            title: responseBody.name
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: responseBody,
        message: message
    });
};

var _showError = function( req, res, statusCode ){
    var title, content;
    if ( statusCode === 404 ) {
        title = '404, page not found';
        content = 'Aaahhhhh shit son, ain\'t nothing here!';
    } else {
        title = statusCode + ' somthing has fucked up.';
        content = 'And I think to myself, this is not my beautiful house!';
    }
    res.render( 'generic-text', {
        title: title,
        content: content
    });
};

var renderAddreviewpage = function( req, res, responseBody ) {
    res.render('location-review-form', {
        title: 'Review ' + responseBody.name + ' on Loc8r',
        pageHeader: 'Review ' + responseBody.name,
        error: req.query.err
    });
};

/* GET the homepage view */
module.exports.homelist = function( req, res ){
    var locationsOptions = {
        url: apiOptions.server + 'api/locations',
        method: 'GET',
        json: {},
        qs: {
            lng : -0.7992599,
            lat : 51.378091,
            maxDistance : 10000000
        }
    };
    request( locationsOptions, function ( err, response, body) {
        var i,
            data = body;
        if ( response.statusCode === 200 && data.length ) {
            for ( i = 0; i < data.length; i++ ) {
                data[i].distance = _formattedDistance(data[i].distance);
            }
        }
        renderHomepage( req, res, data );
    });

};

/* Get the locations view */
module.exports.locationInfo = function( req, res ){
    var locationId = req.params.locationid;
    var locationOptions = {
        url: apiOptions.server + 'api/locations/' + locationId,
        method: 'GET',
        json: {}
    };
    request( locationOptions, function( err, response, body ){
        var data = body;
        if ( response.statusCode === 200 ) {
            data.coords = {
                lng : data.coords[0],
                lat : data.coords[1]
            };
            renderLocationpage( req, res, body );
        } else {
            _showError( req, res, response.statusCode);
        }
    });
};

/* GET the add review view */
module.exports.addReview = function( req, res ){
    var locationId = req.params.locationid;
    var locationOptions = {
        url: apiOptions.server + 'api/locations/' + locationId,
        method: 'GET',
        json: {}
    };
    request( locationOptions, function( err, response, body ){
        var data = body;
        if ( response.statusCode === 200 ) {
            renderAddreviewpage( req, res, body );
        } else {
            _showError(req, res, response.statusCode);
        }
    });
};

/* Post the form data back to the database on the add review view */
module.exports.doAddReview = function( req, res ) {
    var requestOptions, path, locationid, postdata;
    locationid = req.params.locationid;
    path = apiOptions.server + 'api/locations/' + locationid + '/reviews';
    postdata = {
        author: req.body.name,
        rating: parseInt( req.body.rating, 10 ),
        reviewText: req.body.review
    };
    requestOptions = {
        url: path,
        method: 'POST',
        json: postdata,
    };
    request( requestOptions, function( err, response, body ){
        if ( response.statusCode === 201 ) {
            res.redirect('/location/' + locationid );
        } else if ( response.statusCode === 400 && body.name && body.name === 'ValidationError') {
            res.redirect( '/location/' + locationid + '/reviews/new?err=val');
        } else {
            _showError( req, res, response.statusCode);
        }
    });
};
