'use strict';

angular.module('mean.storybook').controller('StorybookController', ['$scope', 'Global', 'Storybook',
    function($scope, Global, Storybook) {
        $scope.global = Global;
        $scope.package = {
            name: 'storybook',
            test_data: 'test'
        };
    }
]);
