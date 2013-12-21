var blueprint = {
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

