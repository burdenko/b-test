'use strict';

angular.
 module('login' ).
  component('login',{
   templateUrl:'login/login.template.html', 
    controller: ['$cookies', 'Logout', function ($cookies, Logout){
      
      if ($cookies.get("sessionid") != "trusted") { this.loginShow = false; window.location.href = "/#/login";} 
      else  this.loginShow = true;

      this.logout = function() {
        var date2 = new Date(0)
        $cookies.put("sessionid", "trusted",  {'expires': date2.toUTCString()});
        window.location.href = "/#/login";
        this.loginShow = false;
      }

      this.loginSite = function() {
        if (this.query != undefined) {
          var date = new Date;
          date.setDate(date.getDate() + 1);
          $cookies.put("sessionid", "trusted",  {'expires': date.toUTCString()});
          this.loginShow = true;
          }
        else alert ("Введите пароль!");
     }

    }]
  });

