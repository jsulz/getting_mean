var mongoose = require('mongoose');

//subdocument schemas that require the location schema below
//must be created/defined before the parent schema
var openingTimesSchema = new mongoose.Schema( {
    days: { type: String, required: true },
    opening: String,
    closing: String,
    closed: { type: Boolean, required: true }
} );

var reviewsSchema = new mongoose.Schema( {
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewText: { type: String, required: true },
    createdOn: { type: Date, "default": Date.now }
} );

//location schema
//location schema allows you to define how the model will look
//and also set up some basic validation of both required fields and general value parameters
var locationSchema = new mongoose.Schema( {
    name: { type: String, required: true },
    address: String,
    rating: { type: Number, "default": 0, min: 0, max: 5 },
    facilities: [String],
    coords: { type: [Number], index: '2dsphere' },
    openingTimes: [openingTimesSchema],
    reviews: [reviewsSchema]
} );

//create a mongoose model that we'll use in the app_api/controllers file when interacting with the API
mongoose.model( 'Location', locationSchema );
