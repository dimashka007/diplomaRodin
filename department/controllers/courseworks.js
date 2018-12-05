var fs = require("fs");

module.exports.courseworks = function(req, res){
  res.render('courseworks' , {
    title:'courseworks',
    ListWorks: listworks()
  });
}

var listworks = function() {
  let list = [];
  list = fs.readdirSync(abspath + "/department/model/courseworks");
  return list;
}
