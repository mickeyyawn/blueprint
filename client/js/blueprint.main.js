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