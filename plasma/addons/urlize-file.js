var path = require("path");

var relativePath = function(file, root) {
  return file.split("\\").join("/").replace(root.split("\\").join("/"), "");
}

module.exports = function(file, options, suffixIndexNamed, suffix) {
  var url = relativePath(file, options.targetsRoot).replace("_", ":");
  var isIndexNamed = url.indexOf(options.indexName) !== -1;
  url = url.replace(options.targetExtname, "");
  url = url.replace(path.sep+options.indexName, "");
  if(options.mount)
    url = options.mount+url;
  if(isIndexNamed)
    url += (suffixIndexNamed?suffixIndexNamed:"")
  else
    url += (suffix?suffix:"");
  if(url == "")
    url = "/"
  return url;
}