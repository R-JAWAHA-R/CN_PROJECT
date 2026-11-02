const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');
const idx = content.indexOf('"count-to-infinity"');
console.log(JSON.stringify(content.slice(idx, idx + 250)));

