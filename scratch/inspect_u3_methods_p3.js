const fs = require('fs');
const u3 = fs.readFileSync('js/unit3.js', 'utf8');
const start = u3.indexOf('unit3-doc-item flex items-center');
console.log(u3.slice(start, start + 2500));

