'use strict';

  angular.
  module('kontrAgent').
  config(['$urlRouterProvider', '$stateProvider',  function($urlRouterProvider, $stateProvider){
    
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('agent', {
        url: '/agent',
        component: 'agentList' 
      })
      .state('operation', {
        url: '/operation',
        template: '<operation-type></operation-type>' 
      })
     .state('transaction', {
        url: '/transaction',
        template: '<transaction-journal></transaction-journal>' 
      })
     .state('login', {
        url: '/login',
        template: '<login></login>' 
      });
  
  }
]);