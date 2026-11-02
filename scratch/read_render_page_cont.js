const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(1220, 1330).join('\n'));

