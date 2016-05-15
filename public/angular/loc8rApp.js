(function(){
    var loc8rData = function ( $http ) {
        return $http.get( '/api/locations?lng=-0.79&lat=51.3&maxDistance=100000000');
    };

    var locationListCtrl = function( $scope, loc8rData ) {
        $scope.message = "Searching for nearby locations";
        loc8rData
            .success( function( data ){
                $scope.message = data.length > 0 ? "" : "No locations found";
                $scope.data = { locations : data };
             })
            .error( function( err ){
                $scopt.message = "Sorry, something has gone wrong";
                console.log(e);
            });
    };

    var _numerical = function( num ) {
        return !isNaN( parseFloat( num ) && isFinite( num ) );
    };

    var formatDistance = function( ){
        return function( distance ) {
            var numericalDistance;
            if ( !distance ) {
                return 'Missing distance'; }
            if ( _numerical( distance ) ) {
                distance = parseInt(distance, 10);
            }
            if ( distance > 1 ) {
                numericalDistance = parseFloat(distance).toFixed( ) + 'm';
            } else {
                return '>1m';
            }
            return numericalDistance;
        };
    };

    var ratingStars = function(){
        return {
            scope: {
                thisRating : '=rating'
            },
            templateUrl: '/angular/rating-stars.html'
        };
    };

    angular.module( 'loc8rApp', [] );
    angular.module('loc8rApp')
            .controller( 'locationListCtrl', locationListCtrl )
            .filter( 'formatDistance', formatDistance )
            .directive( 'ratingStars', ratingStars )
            .service( 'loc8rData', loc8rData );


})();
