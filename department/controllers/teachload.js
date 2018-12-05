if (typeof require !== 'undefined') XLSX = require('xlsx');

let level = require('level');

let person;
let name = 'Сергіенко А.В.';
let username = '';

module.exports.getTeachload = function(req, res) {
  person = [];
  console.log(username);
  let db = level(abspath + '/department/model/db/person', {
    create_if_missing: true,
    valueEncoding: 'json'
  });
  let stream = db.createKeyStream();
  stream.on('data', function(key) {
    person.push(key)
  });
  stream.on('end', function() {
    res.render('teachload', {
      html: renederHtml(name),
      persons: person,
      username: username
    });
    db.close();
  });
};

module.exports.postTeachload = function(req, res) {

  if (req.body && req.body.name) {
    name = req.body.name;
    username = name;
  }else{
    username = '';
  }

  res.redirect('/teachload');
};

const renederHtml = function(name) {
  let workbook = XLSX.readFile(abspath + '/department/model/teachload/' + name + '.xlsx');
  let worksheet = workbook.Sheets['Лист1'];
  let page = XLSX.utils.sheet_to_html(worksheet, {
    raw: true
  });
  return page;
};
