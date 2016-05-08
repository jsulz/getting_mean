var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

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
    sendJsonresponse(res, 200, { "status" : "success" } );
};

//PUT /api/locations/:locationid/reviews/:reviewid
module.exports.reviewsUpdateOne = function( req, res ) {
    sendJsonresponse(res, 200, { "status" : "success" } );
};

//DELETE /api/locations/:locationid/reviews/:reviewid
module.exports.reviewsDeleteOne = function( req, res ) {
    sendJsonresponse(res, 200, { "status" : "success" } );
};

var sendJsonresponse = function( res, status, content ) {
    res.status = 200;
    res.json(content);
};
