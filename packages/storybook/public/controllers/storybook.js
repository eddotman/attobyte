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
      $scope.answer = '';

      $http.post('/viewBook', {
        bookId: $scope.bookId
      })
        .success(function(response) {
          $scope.book = response;
          $scope.page = $scope.book.pages[$scope.bookPage-1];
        });

      $scope.submitAnswer = function() {
        $scope.answerAlert = [];
        var answerTrim = $scope.answer.replace(/ /g,'');
        var bookAnswerTrim = $scope.page.answer[0].replace(/ /g,'');
        if (answerTrim === bookAnswerTrim) {
          var nextPage = parseInt($scope.bookPage) + 1;

          if (nextPage > $scope.book.numPages) {
            $scope.answerAlert.push({type:'success', href: '/#!/', msg: 'You finished the book!', amsg:'Return to the home page.'});
          } else {
            var nextUrl = '/#!/storybook/view/' + $scope.bookId + '/' + nextPage;
            $scope.answerAlert.push({type:'success', href: nextUrl, msg: 'Nice work!', amsg: 'Go to the next page.'});
          }
        } else {
          $scope.answerAlert.push({type:'danger', href: false, msg: 'Sorry, your answer: "' + $scope.answer + '" is incorrect! Please try again.'});
        }
      };
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
        $http.post('/editBook', {
          bookId: $scope.bookId,
          book: $scope.book
        });
      };
    }
  ]);
