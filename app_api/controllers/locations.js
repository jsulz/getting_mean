var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

//GET /api/locations
module.exports.locationsListByDistance = function( req, res ) {

    Loc.find( )
        .exec( function(err, locations ){
            if ( !locations ) {
                sendJsonresponse(res, 404, { "message" : "No locations found" } );
            }
            else if ( err ) {
                sendJsonresponse(res, 404, err);
            }
            sendJsonresponse(res, 200, locations);
        });

};

//GET /api/locations/:locationid
module.exports.locationsReadOne = function( req, res ) {
    //check to see if the request has parameters and that the parameters
    //include a reference to the locationid
    if ( req.params && req.params.locationid ) {
        Loc.findById( req.params.locationid )
            .exec( function( err, location ){
                //check to see if the request to the find the model by the id returned somthing
                //if not, bail
                if ( !location ) {
                    sendJsonresponse(res, 404, { "message" : "locationid not found" } );
                    return;
                }
                //maybe there was an error
                //catch it if so then bail
                else if ( err ) {
                    sendJsonresponse(res, 404, err );
                    return;
                }
                //we made it!
                //send the response and bail
                sendJsonresponse(res, 200, location );
            });
        }
    //if the first guard conditions failed, then bail
    else {
        sendJsonresponse(res, 404, { "message" : "No locationid in request" } );
    }
};

//POST /api/locations
module.exports.locationsCreate = function( req, res ) {
    sendJsonresponse(res, 200, { "status" : "success" } );
};

//PUT /api/locations/:locationid
module.exports.locationsUpdateOne = function( req, res ) {
    sendJsonresponse(res, 200, { "status" : "success" } );
};

//DELETE /api/locations/:locationid
module.exports.locationsDeleteOne = function( req, res ) {
    sendJsonresponse(res, 200, { "status" : "success" } );
};


var sendJsonresponse = function( res, status, content ) {
    res.status = status;
    res.json(content);
};
