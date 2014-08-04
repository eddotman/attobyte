'use strict';

angular.module('mean.storybook').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
          .state('storybook example page', {
              url: '/storybook/example',
              templateUrl: 'storybook/views/index.html'
          })
          .state('view', {
              url: '/storybook/view',
              templateUrl: 'storybook/views/view.html'
          })
          .state('list', {
              url: '/storybook/list',
              templateUrl: 'storybook/views/list.html'
          });
    }
]);
