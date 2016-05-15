(function(){

    var locationListCtrl = function( $scope ) {
        $scope.data = {
            locations: [
                {
                    name: 'B.A. Barakas',
                    address: '1324 Drewery Lane',
                    rating: 3,
                    facilities: ['hot', 'Hot', 'HOT', 'HOT!!'],
                    distance: '0.248592',
                    _id: '572e6c147f02e65b97873493'
                },
                {
                    name: 'George McDucky',
                    address: 'All the Small Things',
                    rating: 4,
                    facilities: ['cold', 'Cold', 'COLD', 'COLD!!'],
                    distance: '1.2453423',
                    _id: '572e6c147f02e65b46873493'
                },
                {
                    name: 'Joshua Lynch',
                    address: 'There is not enough fake addresses in my head',
                    rating: 3,
                    facilities: ['orange', 'yellow', 'green', 'blue'],
                    distance: '0.2453423',
                    _id: '572e6c134f02e65b97873493'
                },
                {
                    name: 'Fly Like an Eagle',
                    address: 'Philly Where I Spend Most of My Days',
                    rating: 3,
                    facilities: ['make', 'it', 'better'],
                    distance: '3.248592',
                    _id: '572e6c147fe2e65b97873493'
                },
                {
                    name: 'LCD Soundsystem',
                    address: 'New York I love You',
                    rating: 2,
                    facilities: ['but you\'re bringing me down'],
                    distance: '4.248592',
                    _id: '572e6c14fe02e65b97873493'
                }
            ]
        };
    };

    angular.module( 'loc8rApp', [] );
    angular.module('loc8rApp')
            .controller( 'locationListCtrl', locationListCtrl );

})();
