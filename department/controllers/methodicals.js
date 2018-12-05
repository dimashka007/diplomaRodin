const level = require('level');
const uuidv1 = require('uuid/v1');

let data;
let person;

module.exports.methodicals = function(req, res) {
  data = [];
  person = [];

  let persons = level(abspath + '/department/model/db/person', {
    create_if_missing: true,
    valueEncoding: 'json'
  });
  let personStream = persons.createKeyStream();
  personStream.on('data', (key) => {
    person.push(key);
  });

  let db = level(abspath + '/department/model/db/disc', {
    create_if_missing: true,
    valueEncoding: 'json'
  });
  let stream = db.createValueStream();
  stream.on('data', function(value) {
    data.push(value);
  });

  personStream.on('end', () => {
    stream.on('end', () => {
      res.render('methodicals', {
        title: 'methodicals',
        data: data,
        persons:person
      });
      db.close();
    });
    persons.close();
  });
}

module.exports.methodicalsPOST = function(req, res){

  let disc = level(abspath + '/department/model/db/disc', {
    create_if_missing: true,
    valueEncoding: 'json'
  });

  disc.put(uuidv1(),{kurs:req.body.course,semestr:req.body.sem,name:req.body.disc, prof:req.body.name}).then(() => {
    disc.close();
    res.redirect('/methodicals');
  }).catch((e) => {console.log(e);});
}
