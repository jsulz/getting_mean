/* GET the homepage view */
module.exports.homelist = function( req, res ){
    res.render('locations-list', {
    	title: 'Loc8r',
    	pageHeader: {
    		title: 'Loc8r',
    		strapLine: 'Find places to work with wifi near you!'
    	},
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: [{
            name: "Gazing",
            address: "53 Carney Lane",
            rating: 5,
            facilities: ["Finding", "Closing", "Exciting"],
            distance: "300m",
        }, {
            name: "Seeing",
            address: "1324 North 43rd Street",
            rating: 3,
            facilities: ["Rewinding", "Trying", "Escaping"],
            distance: "200m",
        }, {
            name: "Moving",
            address: "502 East Front Street",
            rating: 3,
            facilities: ["Moving", "Shaking", "Grinding"],
            distance: "1m",
        }]
    });
};

/* GET the add review view */
module.exports.addReview = function( req, res ){
    res.render('location-review-form', { title: 'Add Revew' });
};

/* Get the locations view */
module.exports.locationInfo = function( req, res ){
    res.render('location-info', {
        title: 'Starcups',
        pageHeader: {
            title: 'Starcups'
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {
                lat: 51.455041,
                lng: -0.9690884
            },
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }]
        }
    });
};