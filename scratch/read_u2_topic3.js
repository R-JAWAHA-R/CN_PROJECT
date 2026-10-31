const fs = require('fs');
const code = fs.readFileSync('js/unit2.js', 'utf8');
const s = code.indexOf('TOPIC 3 – MEDIUM ACCESS CONTROL (MAC) SUBLAYER');
console.log(code.substring(s - 100, s + 1200));

