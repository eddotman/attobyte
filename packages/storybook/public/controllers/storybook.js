'use strict';

angular.module('mean.storybook')
  .controller('StorybookWriteController', ['$scope', 'Global', 'Storybook', '$http',
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
])
  .controller('StorybookViewController', ['$scope', 'Global', 'Storybook', '$http', '$stateParams',
    function($scope, Global, Storybook, $http, $stateParams) {
      $scope.global = Global;
      $scope.package = {
          name: 'storybook'
      };

      $scope.bookId = $stateParams.bookId;
      $scope.bookPage = $stateParams.bookPage;

      $http.post('/viewBook', {
        bookId: $scope.bookId
      })
        .success(function(response) {
          $scope.book = response;
          $scope.page = $scope.book.pages[$scope.bookPage-1];
        });
    }
  ])
  .controller('StorybookListController', ['$scope', 'Global', 'Storybook', '$http',
    function($scope, Global, Storybook, $http) {
      $scope.global = Global;
      $scope.package = {
          name: 'storybook'
      };

      $scope.storybooks = [];
      $http.post('/listBooks')
        .success(function(response){
          $scope.storybooks = response;
        });

      $scope.readBook = function(id) {
        window.location = '/#!/storybook/view/' + id + '/1';
      };
    }
  ])
  .controller('StorybookEditController', ['$scope', 'Global', 'Storybook', '$http', '$stateParams',
    function($scope, Global, Storybook, $http, $stateParams) {
      $scope.global = Global;
      $scope.package = {
          name: 'storybook'
      };

      $scope.bookId = $stateParams.bookId;

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
        }
      };

      $http.post('/viewBook', {
        bookId: $scope.bookId
      })
        .success(function(response) {
          $scope.book = response;
        });

      $scope.edit = function() {
        console.log($scope.book);
        $http.post('/editBook', {
          bookId: $scope.bookId,
          book: $scope.book
        });
      };
    }
  ]);
