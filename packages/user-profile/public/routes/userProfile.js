'use strict';

angular.module('mean.user-profile').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('userProfile example page', {
            url: '/userProfile/example',
            templateUrl: 'user-profile/views/index.html'
        });
    }
]);
