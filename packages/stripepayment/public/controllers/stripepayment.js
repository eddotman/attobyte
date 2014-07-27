'use strict';

angular.module('mean.stripepayment').controller('StripepaymentController', ['$scope', 'Global', 'Stripepayment',
    function($scope, Global, Stripepayment) {
        $scope.global = Global;
        $scope.package = {
            name: 'stripepayment'
        };
    }
]);
