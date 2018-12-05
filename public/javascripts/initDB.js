var level = require('level');
var db = level('C:/Users/maxim/Downloads/diploma-master/diploma-master/department/model/db/person', {
  create_if_missing: true,
  valueEncoding: 'json'
});

var data1 = {
  name: 'Сергіенко Анастасія Валентинівна',
  degree: 'Без ступеню',
  status: 'Без вченого звання',
  position: 'Старший викладач',
  photo: '/img/Сергиенко.jpg'
};
var data2 = {
  name: 'Волощук Сергій Олексійович',
  degree: 'Без ступеню',
  status: 'Кандидат фізико-математичних наук',
  position: 'Доцент',
  photo: '/img/Волощук.jpg'
};


db.put('Сергіенко А.В.', data1);
db.put('Волощук С.О.', data2);

db.createReadStream()
  .on('data', function (entry) {
    console.log(entry);
})
