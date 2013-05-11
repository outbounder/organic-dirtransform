module.exports = function(file, app, options, next) {
  var context = this.context || app;
  var actions = require(file).call(context, this.config, this.plasma);
  if(!this.urlizeFile)
    throw new Error("urlizeFile addon not found attached");
  var rootUrl = this.urlizeFile(file, options);

  for(var key in actions) {
    var parts = key.split(" ");
    var method = parts.shift();
    var urlAddon = parts.pop();
    var url = rootUrl+(urlAddon?urlAddon:"");
    var actionHandler = actions[key];

    if(method == "*")
      app.all(url, actionHandler);
    else
    if(method == "DELETE")
      app.del(url, actionHandler);
    else
      app[method.toLowerCase()](url, actionHandler);

    if(options.log)
      console.log("action", method, url);
  }
  next();
};