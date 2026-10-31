const fs = require('fs');
const code = fs.readFileSync('js/unit2.js', 'utf8');
console.log(code.slice(0, 500));

