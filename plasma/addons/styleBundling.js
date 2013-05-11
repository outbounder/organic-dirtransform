module.exports = function(file, app, options, next) {
  var self = this;
  if(options.log)
    console.log("pagecode GET", url);

  app.get(url, function(req, res){
    self.plasma.emit({
      type: "BundleStyle",
      style: file
    }, function(c){
      res.setHeader("content-type","text/css");
      res.send(c.data);
    });
  });
  next();
}