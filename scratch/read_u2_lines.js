const fs = require('fs');
const code = fs.readFileSync('js/unit2.js', 'utf8');
const lines = code.split('\n');
console.log(lines.slice(30, 70).join('\n'));

