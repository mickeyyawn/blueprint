var utils = {

  s4: function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  },

  guid: function() {
    return utils.s4() + utils.s4() + '-' + utils.s4() + '-' + utils.s4() + '-' +
      utils.s4() + '-' + utils.s4() + utils.s4() + utils.s4();
  },

  isSomething: function(obj){
    return ((obj !== undefined) && (obj !== {}) && (obj !== '') && (obj !== null));
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

// need array of tasks ?
// need validation ?
// need save functionality ? 
// should it know how to talk to server??





var TaskModel = (function () {
    
  var instanceCount = 0;  // private static
  var id;  // unique id for this instance

  var Task = function() {

    this.id = 0;
    this.name = '';
    this.dueDate = moment();

  };

  var cls = function (name, bus) {
    
    instanceCount++;
    var _name = (name === undefined) ? 'Unknown' : name;  //private
    var _bus = bus;
    var _tasks = [];

    id = utils.guid();

    //
    // private method used to validate
    // a task when saving...
    //


    var validate = function (task) {

      var validation = {field:'', error:''};
      var validationFailures = [];

      if((task.name.length === 0) ||
         (task.name.length > 200)) {
        validation.field = 'name';
        validation.error = 'Name must be between 1 and 200 characters in length';
        validationFailures.push(validation);
      }

    };

    this.getId = function () {

      return id;

    };

    //
    // just a testing method.  this 
    // should only be used for a demo
    //

    this.initTwenty = function () {

      for(var i=0;i<20;i++){
        var t = new Task();
        t.id = utils.guid();
        t.name = 'this is my name : ' + i;
        _tasks.push(t);
      }

      //
      // pretend that was a short running ajax
      // call, we now have our data initialized
      // and need to tell the world we are ready to 
      // go.  publish the event...
      //

      postal.publish({channel:'blueprint', topic: 'tasks.retrieved', data: _tasks});
      
    };


    /*
    this.getTasks = function () {

      return _tasks;

    }; */

    this.setName = function (value) {

      _name = value;

    };
  };

  /*

  // public static
  cls.instanceCount = function () {
    return instanceCount;
  };

  */

  // public (shared across instances)
  cls.prototype.createTask = function () {
    return new Task();
  };

  

  return cls;

})();


var TaskController = (function () {

  //var _messageBus = messageBus;

  var cls = function () {


    /*

    postal.subscribe({
      channel  : 'blueprint',
      topic    : 'task.new',
      callback : addNewTask
    });

*/


  };

  var dueDateAsStringHandler = function() {

    return moment(this.dueDate).format("MMM Do YYYY h:mm:ss a");

  };


  var addNewTaskHandler = function() {

    console.log('user is wanting to add new task, in controller...');

    /*
    postal.publish({
      channel : "blueprint",
      topic   : "task.new",
      data    : {
        name : "Dr. Who"
      }
    });

*/
    renderEditTaskUI();

  };

  var addNewTask = function() {
  

  };

  var hideTasks = function () {
  
    $('#bp-taskview').hide();

  };


  var renderTasksUI = function(tasks) {

    Handlebars.registerHelper('dueDateAsString', dueDateAsStringHandler);

    var tasksTemplate = $('#tasks-template').html();
    tasksTemplate = Handlebars.compile(tasksTemplate);
    Handlebars.registerPartial("task", $("#task-partial").html());
    var tasksHTML = tasksTemplate({tasks:tasks});

    $('#content').append(tasksHTML);

    $('#add-new-task-button').click(addNewTaskHandler);

  };

  var renderEditTaskUI = function(task) {

    hideTasks();

    var editTaskTemplate = $('#task-edit-template').html();
    editTaskTemplate = Handlebars.compile(editTaskTemplate);
    var tasksHTML = editTaskTemplate();

    $('#content').append(tasksHTML);

    //$('#add-new-task-button').click(addNewTaskHandler);


  };


  cls.prototype.showTasks = function(tasks) {

    renderTasksUI(tasks);

  };

  cls.prototype.hide = hideTasks();

  cls.prototype.show = function () {

    $('#bp-taskview').show();

  };

  return cls;

})();var blueprint = {
  models:{},
  taskController:{},
  bus:{}
};

$(document).ready(function() {

  blueprint.taskController = new TaskController();

  postal.subscribe({
    channel  : 'blueprint',
    topic    : 'tasks.retrieved',
    callback : blueprint.taskController.showTasks
  });

  blueprint.models.tasks = new TaskModel('tasks', blueprint.bus);
  blueprint.models.tasks.initTwenty();

});







  

  /*
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
  */

