module.exports = function(){
  var self = this;
  return {
    "GET": function(req, res, next) {
      self.testHelperFunc(next);
    }
  }
}