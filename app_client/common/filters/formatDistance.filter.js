(function(){

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
    angular.module( 'loc8rApp' )
            .filter( 'formatDistance', formatDistance );
})();
