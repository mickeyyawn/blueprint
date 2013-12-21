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

};