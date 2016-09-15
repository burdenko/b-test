'use strict';

angular.
 module('agentList' ).
  component('agentList',{
   templateUrl:'agent-list/agent-list.template.html', 
    controller: ['Agent', '$cookies', 'Logout', function (Agent, $cookies, Logout){
      
     Logout.logoutInspection();
     this.logout = function() {   // выход из сессии, вынесен в отдельный сервис
        Logout.logoutUse();
      }

      var self = this;
       
       Agent.load({agentId:'agent-list1'},function(data) { //подгружаем данные из json файла
            self.agents = data;
            for (var j = 0; j < self.agents.length; j++) {                // Приводим дату рождения к типу Date
              self.agents[j].birthday = new Date(self.agents[j].birthday); 
            }
            self.rounding();
       });      

      
      this.addNewJson = function addNewJson(name) {  
        if ((name == 4) && (this.dateTo) && (this.dateFrom)) {
            Agent.load({agentId:'agent-list'+name},function(data) { //подгружаем данные из 3 json файла
              self.agents = data;
               for (var j = 0; j < self.agents.length; j++) {               
                 self.agents[j].birthday = new Date(self.agents[j].birthday); 
               }
            });
        }      
      }
      

      this.selectPangination = "5"; //НАЧАЛО работа с пагинацией
      this.punginationNumber = Agent.load({agentId:'pungination-number'});
      
      this.rounding = function () {
        this.round = Math.ceil(this.agents.length/this.selectPangination);
        if (this.round == 1) this.round =0;
        this.punginationStart(1);
      }
      
      this.punginationStart =  function (name) {
        this.punginationStartNomber=(name-1)*this.selectPangination ;
      }                             //КОНЕЦ работа с пагинацией


      this.sortFlag = undefined;
      this.sort = function (fieldSort) {
        this.sortFlag = this.sortFlag == fieldSort ? '-'+fieldSort : fieldSort;  // cортировка  по имени 
      };

      this.upFlag= function (fieldSort) {               // переключение класса для отображения стрелкии 
        if (this.sortFlag == '-'+fieldSort) return true;
        if (this.sortFlag == fieldSort) return false;
      };

      this.downFlag= function (fieldSort) {           // переключение класса для отображения стрелкии 
        if (this.sortFlag == fieldSort) return true;
        if (this.sortFlag == '-'+fieldSort) return false;
      };

      this.deleteAgent=function(id) {               // удаляем запись
        var yes = false;
        yes = confirm('Вы действительно хотите удалить эту запись?');
        if (yes == true)
          for (var i = 0; i < this.agents.length; i++) {
            if (this.agents[i] == id) this.agents.splice(i, 1);
          }
      };

      this.datePlus3=function(id) {           // добавляем к максимальной дате 2 дня
        if (id) {
          var now = new Date(id);  
          now.setDate(now.getDate() + 2);
          return now.toISOString().substring(0,10);
        }
      }

      this.addNewAgent = function() {                 // добавляем запись
        var maxElement = 0;

        for (var i = 0; i < this.agents.length; i++) {
          if (+this.agents[i].idagent > +maxElement) maxElement = +this.agents[i].idagent;
        }

        this.agents.push(
        {
          idagent: +maxElement+1,
          firstname: 'New', 
          lastname: '',
          email: '',
          phone:'',
          birthday: new Date("0000, 00"),
          edit: false
        });
      };
  
      this.transformationDate=function(id) {           // приводим дату рождения к виду 01.01.2001
        if (id.getDate()){
          var dd = id.getDate();
          if (dd < 10) dd = '0' + dd;

          var mm = id.getMonth() + 1;  
          if (mm < 10) mm = '0' + mm;

          var yy = id.getFullYear();

          return dd + '.' + mm + '.' + yy;}
      };

      this.hide=false;
     
      this.editAgent=function(id)	{         // включаем редактирование записи
        this.hide =! this.hide;
        id.edit =! id.edit;
      }

      this.saveAgent=function(id) {         
        this.hide =! this.hide;
        id.edit =! id.edit;
        Agent.save({agentId:'agent-list1'},this.agents);
      }
    }]
  });

