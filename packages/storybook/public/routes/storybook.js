'use strict';

angular.module('mean.storybook').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
          .state('view', {
              url: '/storybook/view/{bookId}/{bookPage}',
              templateUrl: 'storybook/views/view.html'
          })
          .state('write', {
              url: '/storybook/write',
              templateUrl: 'storybook/views/write.html'
          })
          .state('list', {
              url: '/storybook/list',
              templateUrl: 'storybook/views/list.html'
          });
    }
]);
