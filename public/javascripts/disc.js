var level = require('level');
const uuidv1 = require('uuid/v1');

var db = level('C:/Users/maxim/Downloads/diploma-master/diploma-master/department/model/db/disc', {
  create_if_missing: true,
  valueEncoding: 'json'
});
 var data = [
  {kurs:'1',semestr:'1',name:"Сучасні інформаційні технології в економіці", prof:"Сергіенко А.В."},
    

  {kurs:'1',semestr:'2',name:"Інформаційні системи в обліку та аудиті", prof:"Волощук С.О."},
  

  {kurs:'2',semestr:'1',name:"Теорія ймовірностей, ймовірнісні процеси та математична статистика", prof:"Сергіенко А.В."},
  

  {kurs:'2',semestr:'2',name:"Програмне забезпечення інформаційних систем", prof:"Сергіенко А.В."},
  

  {kurs:'3',semestr:'1',name:"Кросплатформене програмування", prof:"Волощук С.О."},
  

  {kurs:'3',semestr:'2',name:"Технології промислового розроблення програм", prof:"Сергіенко А.В."},
  

  {kurs:'4',semestr:'1',name:"Unix-подібні операційні системи", prof:"Сергіенко А.В."},
  {kurs:'4',semestr:'1',name:"Програмування та підтримка WEB", prof:"Сергіенко А.В."},
  {kurs:'4',semestr:'1',name:"Захист інформації", prof:"Волощук С.О."},
  

  {kurs:'4',semestr:'2',name:"Інформаціний менеджмент", prof:"Волощук С.О."},
];

for(i in data){
  db.put(uuidv1(), data[i]);
}

var data1 = [];
db.createReadStream()
  .on('data', function (entry) {
    data1.push(entry);
}).on('end', function(){
  console.log(JSON.stringify(data1));
})
