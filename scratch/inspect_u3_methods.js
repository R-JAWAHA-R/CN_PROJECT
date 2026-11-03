const fs = require('fs');
const u3 = fs.readFileSync('js/unit3.js', 'utf8');
const start = u3.indexOf('renderTreeHtml:');
console.log(u3.slice(start, start + 2500));

