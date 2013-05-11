var path = require("path");

var relativePath = function(file, root) {
  return file.split("\\").join("/").replace(root.split("\\").join("/"), "");
}

module.exports = function(file, options) {
  var url = relativePath(file, options.targetsRoot).replace("_", ":");
  url = url.replace(options.targetExtname, "");
  url = url.replace(path.sep+options.indexName, "");
  if(options.mount)
    url = options.mount+url;
  if(url == "")
    url = "/"
  return url;
}