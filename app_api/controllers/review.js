var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

//helper function for reviewsCreate - /api/locations/:locationid/reviews POST call
var doAddReview = function( req, res, location ) {

    if ( !location ) {
        sendJsonresponse(res, 404, { "message" : "location not found "} );
    } else {
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        location.save( function( err, location ){
            var thisReview;
            if (err) {
                console.log(err);
                sendJsonresponse(res, 400, err);
            }
            if ( err ) {
                sendJsonresponse(res, 400, err);
            } else {
                updateAverageRating( location._id );
                thisReview = location.reviews[ location.reviews.length - 1 ];
                sendJsonresponse(res, 201, thisReview);
            }
        });
    }

};

//helper function to update the average rating of a location collection
var updateAverageRating = function( locationid ){

    Loc.findById( locationid )
        .select( 'rating reviews' )
        .exec( function( err, location ) {
            doSetAverageRating( location );
        });

};

var doSetAverageRating = function( location ) {

    var i, reviewCount, ratingAverage, ratingTotal;
    if ( location.reviews && location.reviews.length > 0 ) {
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for ( i = 0; i < reviewCount; i++ ) {
            ratingTotal = ratingTotal + location.reviews[i].rating;
        }
        ratingAverage = parseInt( ratingTotal / reviewCount, 10 );
        location.save( function( err ){
            if (err) {
                console.log(err);
            } else {
                console.log( "Average rating updated to ", ratingAverage );
            }
        });
    }
};


//GET /api/locations/:locationid/reviews/:reviewid
module.exports.reviewsReadOne = function( req, res ) {

    if ( req.params && req.params.locationid && req.params.reviewid) {
        Loc.findById( req.params.locationid )
            .select('name reviews')
            .exec( function( err, location ){
                var response, review;
                if ( !location ) {
                    sendJsonresponse(res, 404, { "message" : "locationid not found" } );
                    return;
                }
                else if ( err ) {
                    sendJsonresponse(res, 404, err );
                    return;
                }
                if ( location.reviews && location.reviews.length > 0 ) {
                    review = location.reviews.id( req.params.reviewid );
                    if ( !review ) {
                        sendJsonresponse(res, 404, { "message" : "reviewid not found" } );
                    }
                    else {
                        response = {
                            location : {
                                name : location.name,
                                id : req.params.locationid
                            },
                            review : review
                        };
                        sendJsonresponse(res, 200, response);
                    }
                }
                else {
                    sendJsonresponse(res, 404, { "message" : "No reviews found" } );
                }
            });
        }
    //if the first guard conditions failed, then bail
    else {
        sendJsonresponse(res, 404, { "message" : "No locationid in request" } );
    }
};

//POST /api/locations/:locationid/reviews
module.exports.reviewsCreate = function( req, res ) {
    var locationId = req.params.locationid;
    if ( locationId ) {
        Loc.findById( locationId )
            .select( 'reviews' )
            .exec( function( err, results ) {
                if ( err ) {
                    sendJsonresponse(res, 400, err );
                } else {
                    doAddReview( req, res, results );
                }
            });
    } else {
        sendJsonresponse(res, 404, { "message" : "locationid not found "} );
    }
};

//PUT /api/locations/:locationid/reviews/:reviewid
module.exports.reviewsUpdateOne = function( req, res ) {
    var locationId = req.params.locationid;
    var reviewId = req.params.reviewid;
    if ( !locationId || !reviewId ) {
        sendJsonresponse(res, 404, { "message" : "Need locationid and reviewid to make request"});
    }
    Loc.findById( locationId )
        .select( 'reviews' )
        .exec( function( err, location ) {
            var thisReview;
            if ( !location  ) {
                sendJsonresponse(res, 404, { "message" : "location not found"} );
                return;
            } else if ( err ) {
                sendJsonresponse(res, 404, err);
                return;
            } if ( location.reviews && location.reviews.length > 0 ) {
                thisReview = location.reviews.id( reviewId );
                if ( !thisReview ) {
                    sendJsonresponse(res, 404, { "message" : "review not found"});
                } else {
                    thisReview.author = req.body.author;
                    thisReview.rating = req.body.rating;
                    thisReview.reviewText = req.body.reviewText;
                    location.save( function( err, location ){
                        if ( err ) {
                            sendJsonresponse(res, 404, err );
                        } else {
                            updateAverageRating( location._id );
                            sendJsonresponse(res, 201, location);
                        }
                    });
                }

            } else {
                sendJsonresponse(res, 404, { "message" : "no review to update " } );
            }

        });
};

//DELETE /api/locations/:locationid/reviews/:reviewid
module.exports.reviewsDeleteOne = function( req, res ) {
    var locationId = req.params.locationid;
    var reviewId = req.params.reviewid;
    if ( !locationId || !reviewId ) {
        sendJsonresponse(res, 404, {"message" : "need location and reviewid to make request"});
    }
    Loc.findById( locationId )
        .select( 'reviews' )
        .exec( function( err, location ){
            if ( !location ) {
                sendJsonresponse(res, 404, {"message":"no location found"});
            } else if ( err ) {
                sendJsonresponse(res, 404, err);
            }
            if ( location.reviews && location.reviews.length > 0 ) {
                location.reviews.id( reviewId ).remove();
                location.save( function( err, location ){
                    if (err) {
                        sendJsonresponse(res, 404, err);
                    } else {
                        updateAverageRating(location._id);
                        sendJsonresponse(res, 204, null);
                    }
                } );
            } else {
                sendJsonresponse(res, 404, {"message" : "no reviews to update"});
            }
        });
};

var sendJsonresponse = function( res, status, content ) {
    res.status(status);
    res.json(content);
};
