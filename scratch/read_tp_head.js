const fs = require('fs');
const tp = fs.readFileSync('js/topicPages.js', 'utf8');
const lines = tp.split('\n');
console.log('Lines in topicPages.js:', lines.length);
for (let i = 0; i < 50; i++) {
  console.log(lines[i]);
}

