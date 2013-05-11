var path = require("path");

module.exports = function(file, dest, options, next) {
  var name = path.relative(options.targetsRoot, file).replace(options.targetExtname, "");
  dest[name] = require(file);
  next();
}