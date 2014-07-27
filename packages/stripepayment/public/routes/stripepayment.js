'use strict';

angular.module('mean.stripepayment').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('stripepayment example page', {
            url: '/stripepayment/example',
            templateUrl: 'stripepayment/views/index.html'
        });
    }
]);
