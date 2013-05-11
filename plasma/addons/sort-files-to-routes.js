var _ = require("underscore");

var sortFiles = function(files, options, skipPlaceholders) {
  var indexes = _.filter(files, function(file){ 
    return file.indexOf("index"+options.targetExtname) != -1 && (file.indexOf("_") === -1 || skipPlaceholders)
  }).sort(function(a, b){
    if(a.length > b.length) return 1;
    if(a.length < b.length) return -1;
    return 0;
  })
  placeholders = [];
  if(!skipPlaceholders) {
    placeholders = _.filter(files, function(file){ 
      return file.indexOf("_") != -1 
    });
    placeholders = sortFiles(placeholders, options, true);
  }
  var others = _.difference(files, indexes, placeholders);
  return [].concat(indexes, others, placeholders);
}

module.exports = sortFiles;