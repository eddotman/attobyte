'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
    
    $scope.demo = function() {
      window.location = '/#!/storybook/view/53e645855e4ce9e51f6b9dce/1';
    };
  }
]);
