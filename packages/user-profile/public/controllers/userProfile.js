'use strict';

angular.module('mean.user-profile').controller('UserProfileController', ['$scope', 'Global', 'UserProfile',
    function($scope, Global, UserProfile) {
        $scope.global = Global;
        $scope.package = {
            name: 'user-profile'
        };
    }
]);
