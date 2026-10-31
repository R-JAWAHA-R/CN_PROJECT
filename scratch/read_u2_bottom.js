const fs = require('fs');
const code = fs.readFileSync('js/topics_u2.js', 'utf8');
console.log(code.slice(-300));

