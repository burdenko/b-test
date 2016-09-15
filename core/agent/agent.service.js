'use strict';

angular.
  module('core.agent').
  factory('Agent', ['$resource',
    function($resource) {
      return $resource('json/:agentId.json', {agentId:'@id'}, {
        load: {
          method: 'GET',
          isArray: true
        },
        save: {
          method: 'PUT'
        }
      });
    }
  ]);
