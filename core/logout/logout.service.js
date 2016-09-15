'use strict';

angular.
  module('core.logout').
  factory('Logout', ['$cookies', '$location',
    function($cookies, $location) {
      return {

     
        
        logoutInspection: function() {   
          if ($cookies.get("sessionid") != "trusted") $location.path("/");       // Проверка авторизации
        },

        logoutUse: function() {                                                      //Выход из сессии
          var date2 = new Date(0)
          $cookies.put("sessionid", "trusted",  {'expires': date2.toUTCString()});
          window.location.href = "/";
        } 
      }

    }
  ]);
