var fs = require("fs");

module.exports.exams = function(req, res) {
  res.render('exams', {
    title: 'exams',
    listMag: listmagstr(),
    listDac: listdac(),
    listMs: listms()
  });
}
var listmagstr = function() {
  let list = [];
  list = fs.readdirSync(abspath + "/department/model/exams/examsMagstr");
  return list;
}
var listdac = function() {
  let list = [];
  list = fs.readdirSync(abspath + "/department/model/exams/examsDac");
  return list;
}
var listms = function() {
  let list = [];
  list = fs.readdirSync(abspath + "/department/model/exams/examsMs");
  return list;
}
