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
