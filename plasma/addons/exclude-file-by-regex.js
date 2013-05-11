module.exports = function(file, options){
  if(typeof options.excludePattern == "string")
    if(file.match(options.excludePattern))
      return true
  else
  if(Array.isArray(options.excludePattern))
    for(var i = 0; i<options.excludePattern.length; i++)
      if(file.match(options.excludePattern[i]))
        return true
}