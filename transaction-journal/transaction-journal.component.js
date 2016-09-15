'use strict';

angular.
 module('transactionJournal' ).
  component('transactionJournal',{
   templateUrl:'transaction-journal/transaction-journal.template.html', 
    controller: ['Agent', '$cookies', 'Logout', function (Agent, $cookies, Logout){
      

      Logout.logoutInspection();
      this.logout = function() { 
        Logout.logoutUse();
      }
 
      
      var self = this;
      this.addNewJson = function addNewJson(name) {
        Agent.load({agentId:'transaction-journal'+name},function(data) { //подгружаем данные из json файла
             self.transactions = data;
             for (var j = 0; j < self.transactions.length; j++) {                // Приводим дату рождения к типу Date
               self.transactions[j].datetransaction=new Date(self.transactions[j].datetransaction);  
             }
        });   
  
        if (name == 1) this.inout = "Приход";
        if (name == 2) this.inout = "Расход";
      
        this.kontragents = Agent.load({agentId:'agent-list1'});
        this.operations = Agent.load({agentId:'operation-type'+name});
      }

      this.addNewJson(1); 

      this.deleteTransaction=function(id) {               // удаляем запись
        var yes=false;
        yes=confirm('Вы действительно хотите удалить эту запись?');
        if ( yes == true )
          for (var i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i] ==id) this.transactions.splice(i, 1);
          }
      };


      this.addNewTransaction=function() {                 // добавляем запись
        var maxElement = 0;

        for (var i = 0; i < this.transactions.length; i++) {
          if (+this.transactions[i].idtransaction>+maxElement) maxElement = +this.transactions[i].idtransaction;
        }

        this.transactions.push(
        {
          idtransaction: +maxElement+1,
          datetransaction: new Date("0000, 00"), 
          inout: this.inout,
          typeoperation:'',
          kontragent:'',
          sum:'',
          edit:false

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

      this.hide = false;

      this.editTransaction = function(id) {         // включаем редактирование записи
        this.hide = !this.hide;
        id.edit = !id.edit;
      }

      this.saveTransaction=function(id) {         
        this.hide =! this.hide;
        id.edit =! id.edit;
        Agent.save({agentId:'transaction-journal'+this.name}, this.transactions);
      }

    }]
  });

