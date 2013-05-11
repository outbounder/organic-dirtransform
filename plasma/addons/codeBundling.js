module.exports = function(file, app, options, next) {
  var self = this;
  var url = this.urlizeFile(file, options);

  if(this.config.log)
    console.log("pagecode GET", url);

  app.get(url, function(req, res){
    self.plasma.emit({
      type: "BundleCode",
      code: file
    }, function(c){
      res.setHeader("content-type","text/javascript");
      res.send(c.data);
    });
  });
  next();
}