const fs = require('fs');
const code = fs.readFileSync('js/topicPages.js', 'utf8');
console.log(code.slice(-300));

