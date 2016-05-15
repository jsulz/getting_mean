var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

//GET /api/locations
module.exports.locationsListByDistance = function( req, res ) {
    var lng = parseFloat( req.query.lng );
    var lat = parseFloat( req.query.lat );
    var maxDistance = parseInt( req.query.maxDistance, 10 );
    var point = {
        type: "Point",
        coordinates: [ lng, lat ]
    };
    var geoOptions = {
        spherical: true,
        maxDistance : maxDistance,
        num: 10
    };

    if ( !lng || !lat || !maxDistance ) {
        sendJsonresponse(res, 404, { "message" : "Sorry, please provide all parameters"});
        return;
    }

    Loc.geoNear( point, geoOptions, function( err, results, stats ) {
        var locations = [];
        if ( err ) {
            sendJsonresponse(res, 404, err );
            return;
        } else {
            results.forEach( function ( doc ) {
                locations.push({
                    distance: doc.dis,
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            sendJsonresponse(res, 200, locations);
        }
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
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: [ parseFloat( req.body.lng), parseFloat( req.body.lat ) ],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        },
        {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]
    }, function ( err, location ) {
        if ( err ) {
            sendJsonresponse(res, 400, err);
            return;
        } else {
            sendJsonresponse(res, 201, location );
        }
    });
};

//PUT /api/locations/:locationid
module.exports.locationsUpdateOne = function( req, res ) {
    var locationId = req.params.locationid;
    if ( !locationId ) {
        sendJsonresponse(res, 404, { "message" : "Not found, locationid is required"} );
        return;
    }
    Loc.findById( locationId )
        .select( '-reviews -rating')
        .exec( function( err, location ){
            if ( !location ) {
                sendJsonresponse(res, 404, { "message" : "locationid not found" } );
                return;
            } else if (err) {
                sendJsonresponse(res, 404, err );
                return;
            }
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(",");
            location.coords = [ parseFloat( req.body.lng), parseFloat( req.body.lat ) ];
            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            },
            {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }];
            location.save( function( err, location ){
                if (err) {
                    sendJsonresponse(res, 404, err);
                    return;
                } else {
                    sendJsonresponse(res, 201, location);
                }
            } );
        });
};

//DELETE /api/locations/:locationid
module.exports.locationsDeleteOne = function( req, res ) {
    var locationId = req.params.locationid;
    if ( locationId ) {
        Loc.findByIdAndRemove( locationId )
            .exec( function( err, location ) {
                if ( err ) {
                    sendJsonresponse(res, 404, err);
                    return;
                }
                sendJsonresponse(res, 204, null);
            });
    } else {
        sendJsonresponse(res, 404, {"message": "no location found" });
    }
};


var sendJsonresponse = function( res, status, content ) {
    res.status(status);
    res.json(content);
};
