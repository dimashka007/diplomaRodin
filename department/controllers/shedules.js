var mammoth = require("mammoth");
var fs = require('fs');
var cont;

module.exports.shedules = function(req, res) {
  cont = [];
  let task = Promise.all([getAllShedules()]);
  task.then(() => {
    res.render('shedules', {
      title: 'shedules',
      GraphCons: cont
    });
  })
};

const getAllShedules = async () => {
  let options = {
    styleMap: [
      "p[style-name='Section Title'] => h1:fresh",
      "p[style-name='Subsection Title'] => h2:fresh"
    ]
  };
  let files = fs.readdirSync(abspath + "/department/model/graphics/");
  for (i in files) {
    const text = (await mammoth.convertToHtml({
      path: abspath + "/department/model/graphics/" + files[i]
    })).value;
    cont.push(text);
  }
}
