'use strict';

angular.module('mean.storybook').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('storybook example page', {
            url: '/storybook/example',
            templateUrl: 'storybook/views/index.html'
        });
    }
]);
