//defined a database connection and all variables
//used a string to associate the db uri and open a connection
var mongoose = require('mongoose');
var dbURI = 'mongodb://127.0.0.1:27017/Loc8r';
if ( process.env.NODE_ENV === 'production' ) {
    dbURI = 'mongodb://jsulz:trojans45@ds017432.mlab.com:17432/loc8r';
}
var gracefulShutdown;

mongoose.connect(dbURI);

//three event listeners for connecting to the database
mongoose.connection.on('connected', function(){
    console.log('Mongoose is connected on ' + dbURI );
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose had a ' + err + ' error.');
});

mongoose.connection.on('disonnected', function(){
    console.log('Mongoose is disconnected from ' + dbURI );
});

//function to listen to all of the various means that the db connection can be terminated
gracefulShutdown = function( msg, callback ){
    mongoose.connection.close( function(){
        console.log( 'Mongoose disconnected through ' + msg );
        callback();
    });
};

//Three event listeners that check node processes for termination or restart signals and call
//our gracefulShutdown function
process.once( 'SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
        process.kill( process.pid, 'SIGUSR2');
    });
});

process.on( 'SIGINT', function(){
    gracefulShutdown('app termination', function(){
        process.exit(0);
    });
});

process.on( 'SIGTERM', function(){
    gracefulShutdown('Heroku app shutdown', function(){
        process.exit(0);
    });
});

require('./locations');
