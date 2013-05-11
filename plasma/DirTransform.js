var util = require("util");
var Organel = require("organic").Organel;
var glob = require("glob");
var async = require("async");

module.exports = function DirTransform(plasma, config){
  Organel.call(this, plasma);

  var self = this;
  
  if(config.cwd)
    for(var key in config.cwd) {
      if(key == "addons") { // addons filepaths should be process.cwd() prefixable too
        config.addons = {};
        for(var addonsKey in config.cwd.addons)
          config.addons[addonsKey] = process.cwd()+config.cwd.addons[addonsKey];
      } else
      if(key == "target") {
        config.target["targetsRoot"] = process.cwd()+config.cwd.target["targetsRoot"];
      } else
        config[key] = process.cwd()+config.cwd[key];
    }
  
  this.config = config;

  if(this.config.exclude)
    this.exclude = require(this.config.exclude);
  if(this.config.transformFilesList)
    this.transformFilesList = require(this.config.transformFilesList);
  if(this.config.transformFile)
    this.transformFile = require(this.config.transformFile);
  if(this.config.addons)
    for(var key in this.config.addons)
      this[key] = require(this.config.addons[key]);

  if(this.config.reactOn)
    this.on(this.config.reactOn, function(c){
      var dest = c.data.app || c.data || c; /* .app because of ExpressHttpPages XXX */
      this.scanAndLoadInto(this.config.target, dest, function(){
        self.output = dest;
        self.emit("DirTransform", self);
      })
      return false; // do not aggregate reactOn incoming chemicals.
    })
}

util.inherits(module.exports, Organel);

module.exports.prototype.scanAndLoadInto = function(options, dest, callback) {
  var self = this;
  if(this.config.log)
    options.log = this.config.log;
  glob(options.targetsRoot+"/**/*"+options.targetExtname, function(err, files){
    
    if(self.transformFilesList) files = self.transformFilesList.call(self, files, options);

    async.forEach(files, function(file, next){
      if(self.exclude && self.exclude(file, options)) return next();
      self.transformFile.call(self, file, dest, options, next);
    }, function(){
      if(callback) callback();  
    });
  });
}