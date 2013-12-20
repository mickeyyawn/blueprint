var utils = {

  s4: function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  },

  guid: function() {
    return utils.s4() + utils.s4() + '-' + utils.s4() + '-' + utils.s4() + '-' +
      utils.s4() + '-' + utils.s4() + utils.s4() + utils.s4();
  }

};var ObjectTemplate = (function () {
    
  var instanceCount = 0;  // private static
  var id;  // unique id for this instance

  var cls = function (name) {
    
    instanceCount++;
    var _name = (name === undefined) ? 'Unknown' : name;  //private
    id = utils.guid();

    this.getId = function () {

      return id;

    };

    this.getName = function () {

      return _name;

    };

    this.setName = function (value) {

      _name = value;

    };
  };

  // public static
  cls.instanceCount = function () {
    return instanceCount;
  };

  // public (shared across instances)
  cls.prototype.announce = function () {
    console.log('Hello!  My id: ' + id);
  };

  return cls;

})();
/*
var Task = (function(){
  this.id = 0;
  this.name ='';
  this.dueDate = {};
  
  return {
    id: 0,
    name:'',
    dueDate: {}
  }; 
})();
*/


var Task = function(){
  this.id = 0;
  this.name ='';
  this.dueDate = {};
  /*
  return {
    id: 0,
    name:'',
    dueDate: {}
  }; */
};


var TaskView = (function () {

  var cls = function (name) {

  };


  
  cls.prototype.render = function () {

    var tasksTemplate = $('#tasks-template').html();
    tasksTemplate = Handlebars.compile(tasksTemplate);
    Handlebars.registerPartial("task", $("#task-partial").html());
    var tasksHTML = tasksTemplate(blueprint);

    $('#content').append(tasksHTML);

  };

  cls.prototype.hide = function () {

    $('#bp-taskview').hide();

  };

  cls.prototype.show = function () {

  };


  return cls;

})();
var blueprint = {
  tasks:[],
  taskView:{}
};


$(document).ready(function() {


  var obj1 = new ObjectTemplate();

  obj1.announce();
  console.log('obj1 id: ' + obj1.getId());
  console.log('obj1 name: ' + obj1.getName());
  console.log('how many instances: ' + ObjectTemplate.instanceCount());

  var obj2 = new ObjectTemplate('custom name');

  obj2.announce();
  console.log('obj2 id: ' + obj2.getId());
  console.log('obj2 name: ' + obj2.getName());

  obj2.setName('this is my new name...');
  console.log('obj2 name: ' + obj2.getName());
  console.log('how many instances: ' + ObjectTemplate.instanceCount());


  var task1 = {
    id:utils.guid(),
    name:'task1',
    dueDate:moment()
  };

  var task2 = {
    id:utils.guid(),
    name:'task2, this is my cool task!',
    dueDate:moment()
  };

  for(var i=0;i<20;i++){
    var t = new Task();
    t.id = i;
    t.name = 'this is my name : ' + i;
    blueprint.tasks.push(t);
  }

  //blueprint.tasks.push(task1);
  //blueprint.tasks.push(task2);

  console.log(blueprint);

  blueprint.taskView = new TaskView();
  blueprint.taskView.render();

});