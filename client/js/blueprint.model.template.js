var ObjectTemplate = (function () {
    
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
