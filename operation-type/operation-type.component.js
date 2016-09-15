'use strict';

angular.
 module('operationType' ).
  component('operationType',{
   templateUrl:'operation-type/operation-type.template.html', 
    controller: ['Agent', '$cookies', 'Logout',  function (Agent, $cookies, Logout){
      
     Logout.logoutInspection();
      this.logout = function() { 
        Logout.logoutUse();
      }
      
      this.name=1;
      
      this.addNewJson = function addNewJson(name) {  
        this.operations = Agent.load({agentId:'operation-type'+name});
        this.name=name;
      }

      this.addNewJson(1); 

      this.deleteOperation=function(id) {               // удаляем запись
        var yes = false;
        yes = confirm('Вы действительно хотите удалить эту запись?');
        if (yes == true)
          for (var i = 0; i < this.operations.length; i++) {
            if (this.operations[i] == id) this.operations.splice(i, 1);
          }
      };


      this.addNewOperation=function() {                 // добавляем запись
        var maxElement=0;

        for (var i = 0; i < this.operations.length; i++) {
          if (+this.operations[i].idoperation > +maxElement) maxElement = +this.operations[i].idoperation;
        }

        this.operations.push(
        {
          idoperation: +maxElement+1,
          name: 'Новая операция', 
          edit:false
        });
      };

      this.editOperation=function(id) {         // включаем редактирование записи
        this.hide = !this.hide;
        id.edit = !id.edit;
      }

    this.saveOperation=function(id) {         
        this.hide =! this.hide;
        id.edit =! id.edit;
        Agent.save({agentId:'operation-type'+this.name}, this.operations);
      }

    }]
  });

