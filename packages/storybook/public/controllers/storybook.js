'use strict';

angular.module('mean.storybook')
  .controller('StorybookController', ['$scope', 'Global', 'Storybook', '$http',
    function($scope, Global, Storybook, $http) {
        $scope.global = Global;
        $scope.package = {
            name: 'storybook',
            test_data: 'test'
        };

        $scope.write = function() {
          $http.post('/writeBook')
            .success(function(response) {
              console.log(response);
            });
        };
    }
]);
