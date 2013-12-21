
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


