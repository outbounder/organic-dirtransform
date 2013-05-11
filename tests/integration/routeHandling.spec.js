var organic = require("organic");
var DirTransformer = require("../../plasma/DirTransform");
var path = require("path");

describe("RouteHandling", function(){

  var plasma = new organic.Plasma();

  var dirTransformer = new DirTransformer(plasma, {
    "cwd": {
      "transformFilesList": "/plasma/addons/sort-files-to-routes",
      "transformFile": "/plasma/addons/routeHandling",
      "addons": {
        "urlizeFile": "/plasma/addons/urlize-file"
      }
    },
    "scanWithContextFrom": "SimpleContext",
    "log": true
  });

  dirTransformer.context = {
    testHelperFunc: function(next){
      next();
    }
  }

  var mockupApp = {
    routes: {get:{}, put:{}, post:{}, del: {}, all: {}},
    get: function(url, action){
      this.routes.get[url] = action;
    },
    put: function(url, action){
      this.routes.put[url] = action;
    },
    post: function(url, action){
      this.routes.post[url] = action;
    },
    del: function(url, action){
      this.routes.del[url] = action;
    },
    all: function(url, action){
      this.routes.all[url] = action;
    }
  }

  it("scans and mounts route handlers", function(next){
    dirTransformer.scanAndLoadInto({
      "targetsRoot": path.join(__dirname,"/../../tests/data/routeHandling"),
      "targetExtname": ".js",
      "indexName": "index"
    }, mockupApp, function(){
      expect(mockupApp.routes.get["/"]).toBeDefined();
      mockupApp.routes.get["/"]({},{}, function(){
        next();  
      })
    })
  })
})