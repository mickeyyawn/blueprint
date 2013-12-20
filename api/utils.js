var fs = require('fs');
var _ = require('underscore');

var fileAsString = module.exports.fileAsString = function (filePath) {

  return fs.readFileSync(filePath, 'utf8');

};

module.exports.filesAsString = function (arrayOfFilePaths) {

  var contents = '';

  _.each(arrayOfFilePaths, function(filePath){

    contents += fileAsString(filePath);

  });

  return contents;

};

module.exports.replaceFile = function (fileLocation, contents) {

  try {

    fs.unlinkSync(fileLocation);

  }
  catch (ENOENT){}

  fs.writeFileSync(fileLocation, contents, 'utf8');

};