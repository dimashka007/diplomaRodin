var fs = require("fs");

module.exports.protocols = function(req, res){
  res.render('protocols' , {
    title:'protocols',
    ProtList: protList()
  });
}

var protList = function() {
  let list = [];
  list = fs.readdirSync(abspath + "/department/model/protocols");
  return list;
}
