var utils = require('./utils');
var global = require('./global');
var uglify = require("uglify-js");
var htmlCache;
var pathToLayout =  global.rootDir + '/client/layout.html';


// order them least dependent to most dependent...
var JSfiles = ['./client/js/blueprint.utils.js',
               './client/js/blueprint.model.template.js',
               './client/js/blueprint.model.task.js',
               './client/js/blueprint.view.tasks.js',
               './client/js/blueprint.main.js'];

//
// minifies the Javascript files...
//

var minifyJSFiles = function (files) {

  var result = uglify.minify(files);

  return result.code;

};

var buildJS = function() {

  utils.replaceFile (global.rootDir + '/public/app-min.js', minifyJSFiles(JSfiles));
  utils.replaceFile (global.rootDir + '/public/app.js', utils.filesAsString(JSfiles));

};

var serveRootHTML = function(request){

  //
  // if we are in development, return the html off disk each
  // time, and return a non-minified js
  //


  if (process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT') {

    buildJS();
    htmlCache = utils.fileAsString(pathToLayout).replace('***JS***', 'app.js');

  }
  else {

    if (!htmlCache) {

      buildJS();
      htmlCache = utils.fileAsString(pathToLayout).replace('***JS***', 'app-min.js');

    }

  }

  request.reply(htmlCache);

};

module.exports.getRoot = {
  handler: serveRootHTML,
  description: 'root route, just serves the SPA',
  notes: 'no notes currently'
};


