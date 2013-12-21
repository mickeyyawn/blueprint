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

})();