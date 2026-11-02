const fs = require('fs');
const content = fs.readFileSync('js/unit2.js', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(200, 240).join('\n'));

