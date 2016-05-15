(function(){

    var geolocation = function(){
        var getPosition = function( cbSuccess, cbError, cdNoGeo ){
            if ( navigator.geolocation ) {
                navigator.geolocation.getCurrentPosition( cbSuccess, cbError );
            } else {
                cbNoGeo();
            }
        };
        return {
            getPosition : getPosition
        };
    };

    var loc8rData = function ( $http ) {
        var locationByCoords = function ( lat, lng ) {
            return $http.get( '/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=100000000');
        };
        return {
            locationByCoords : locationByCoords
        };
    };

    var locationListCtrl = function( $scope, loc8rData, geolocation ) {
        $scope.message = "Checking your location";

        $scope.getData = function( position ) {
            var lat = position.coords.latitude,
                lng = position.coords.longitude;
            $scope.message = "Searching for nearby locations";
            loc8rData.locationByCoords( lat, lng )
                .success( function( data ){
                    $scope.message = data.length > 0 ? "" : "No locations found";
                    $scope.data = { locations : data };
                 })
                .error( function( err ){
                    $scope.message = "Sorry, something has gone wrong";
                    console.log(e);
                });
        };
        $scope.showError = function( error ) {
            $scope.apply( function(){
                $scope.message = error.message;
            });
        };

        $scope.noGeo = function() {
            $scope.apply( function(){
                $scope.message = "Geolocation not supported by this browser";
            });
        };
        geolocation.getPosition( $scope.getData, $scope.showError, $scope.noGeo );
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
            .service( 'loc8rData', loc8rData )
            .service( 'geolocation', geolocation );


})();
