'use strict';

angular.module('mean.storybook')
  .controller('StorybookController', ['$scope', 'Global', 'Storybook', '$http',
    function($scope, Global, Storybook, $http) {
        $scope.global = Global;
        $scope.package = {
            name: 'storybook'
        };

        $scope.bookName = null;
        $scope.numPages = 1;
        $scope.pages = [
          {
            story : [],
            question : [],
            answer : []
          }
        ];

        $scope.updatePages = function() {
          if ($scope.numPages > 20) {$scope.numPages = 20;} //Max pages is 20
          if ($scope.numPages > $scope.pages.length) {
            for (var i = $scope.pages.length; i < $scope.numPages; i++) {
              $scope.pages.push({
                story : [],
                question : [],
                answer : []
              });
            }
          } else if ($scope.numPages < $scope.pages.length) {
            $scope.pages = $scope.pages.slice(0, $scope.numPages-1);
          } else {
            // Do nothing
          }

        };

        $scope.write = function() {
          $http.post('/writeBook', {
            bookName: $scope.bookName,
            numPages: $scope.numPages,
            pages: $scope.pages
          })
            .success(function(response) {
              console.log(response);
            });
        };
    }
]);
