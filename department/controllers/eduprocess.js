const level = require('level');

const jp = require('@evxn/jsonpath');


let person;
let username = '';

module.exports.teachlist = function(req, res) {
  person = [];

  let db = level(abspath + '/department/model/db/person', {
    valueEncoding: 'json'
  });
  let stream = db.createValueStream();
  stream.on('data', function(value) {
    person.push(value);
  });
  stream.on('end', () => {
    res.render('teachlist', {
      title: 'teachlist',
      persons: person
    });
    db.close();
  });

}

module.exports.eduprocess = function(req, res) {
  person = [];

  let db = level(abspath + '/department/model/db/person', {
    valueEncoding: 'json'
  });
  let ed = level(abspath + '/department/model/db/ed', {
    valueEncoding: 'json'
  });

  let stream = db.createKeyStream();

  stream.on('data', function(value) {
    person.push(value);
  });
  stream.on('end', () => {

    ed.get(username, (err, value) => {
      db.close();
      ed.close();

      let data = value ? value : {};

      res.render('eduprocess', {
        title: 'eduprocess',
        persons: person,
        username: username,
        ed: jp.query(data, "$[?(@.table == 'ed')]"),
        sci: jp.query(data, "$[?(@.table == 'sci')]"),
        org: jp.query(data, "$[?(@.table == 'org')]"),
        comm: jp.query(data, "$[?(@.table == 'comm')]"),
      });
    });
  });
}

module.exports.eduprocessInitName = function(req, res) {
  username = req.body.name;
  res.redirect('/eduprocess');

}

module.exports.eduprocessPOST = function(req, res) {
  let ed = level(abspath + '/department/model/db/ed', {
    valueEncoding: 'json'
  });
  ed.get(username, (err, value) => {
    if (err) {
      ed.put(username, [{
        table: req.body.table,
        quantity: req.body.quantity,
        time: req.body.time,
        done: ''
      }], function() {
        ed.close();
        res.redirect('/eduprocess');
      });
    } else {
      value.push({
        table: req.body.table,
        quantity: req.body.quantity,
        time: req.body.time,
        done: ''
      });
      if (req.body.quantity && req.body.time) {
        ed.put(username, value, function() {
          ed.close();
          res.redirect('/eduprocess');
        });
      } else {
        res.redirect('/eduprocess');
      }
    }
  });
}
