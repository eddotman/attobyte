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
          bookTitleImage: $scope.bookTitleImage,
          numPages: $scope.numPages,
          pages: $scope.pages
        })
          .success(function(response) {
            console.log(response);
          });
      };
    }
])
  .controller('StorybookViewController', ['$scope', 'Global', 'Storybook', '$http', '$stateParams', '$modal',
    function($scope, Global, Storybook, $http, $stateParams, $modal) {
      $scope.global = Global;
      $scope.package = {
          name: 'storybook'
      };

      $scope.bookId = $stateParams.bookId;
      $scope.bookPage = $stateParams.bookPage;
      $scope.answer = '';
      $scope.submitShow = true;

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
        answerTrim = answerTrim.replace(/[\u2018\u2019]/g, '\''); //Fixes curly quote issue
        var bookAnswerTrim = $scope.page.answer[0].replace(/ /g,'');
        if (answerTrim === bookAnswerTrim) {
          var nextPage = parseInt($scope.bookPage) + 1;
          $scope.submitShow = false;

          if (nextPage > $scope.book.numPages) {
            $scope.answerAlert.push({type:'success', href: '/#!/storybook/cta', msg: 'Great job - ', amsg:'You finished the book!'});
          } else {
            var nextUrl = '/#!/storybook/view/' + $scope.bookId + '/' + nextPage;
            $scope.answerAlert.push({type:'success', href: nextUrl, msg: 'Nice work!', amsg: 'Go to the next page.'});
          }
        } else {
          var wrongMsg =  'Sorry, your answer: "' + $scope.answer + '" is incorrect!';
          if (answerTrim.split('\'').length - 1 % 2 === 1 || answerTrim.split('[').length - 1 % 2 === 1  || answerTrim.split(']').length - 1 % 2 === 1 ) {
            wrongMsg += ' Have you double checked your brackets or quotes?';
          }
          $scope.answerAlert.push({type:'danger', href: false, msg: wrongMsg});
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
        if ($scope.book.numPages > 20) {$scope.book.numPages = 20;} //Max pages is 20
        if ($scope.book.numPages > $scope.book.pages.length) {
          for (var i = $scope.book.pages.length; i < $scope.book.numPages; i++) {
            $scope.book.pages.push({
              story : [],
              question : [],
              answer : []
            });
          }
        } else if ($scope.book.numPages < $scope.book.pages.length) {
          $scope.book.pages = $scope.book.pages.slice(0, $scope.book.numPages-1);
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
