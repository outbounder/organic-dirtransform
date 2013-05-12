module.exports = function(file, app, options, next) {
  var self = this;
  var url = this.urlizeFile(file, options, "/style.css", ".css");

  if(options.log)
    console.log("pagecode GET", url);

  app.get(url, function(req, res, next){
    self.plasma.emit({
      type: "BundleStyle",
      style: file
    }, function(c){
      if(c instanceof Error) return next(c);
      res.setHeader("content-type","text/css");
      res.send(c.data);
    });
  });
  next();
}