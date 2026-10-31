const fs = require('fs');
eval(fs.readFileSync('js/unit2.js', 'utf8'));
console.log(Object.keys(Unit2Module));
if (Unit2Module.hierarchy) console.log(Object.keys(Unit2Module.hierarchy));

