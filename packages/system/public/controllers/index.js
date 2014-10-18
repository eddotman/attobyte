'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$http',
  function($scope, Global, $http) {
    $scope.global = Global;

    $scope.demo = function() {
      $http.post('/findBook', {
        bookName: 'Lists and DNA'
      })
        .success(function(response){
          $scope.bookId = response._id;
          window.location = '/#!/storybook/view/' + $scope.bookId  + '/1';
        });
    };

    $scope.storybooks = function() {
      window.location = '/#!/storybook/list';
    };
  }
]);
