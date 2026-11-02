const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('render') && (l.includes('function') || l.includes(' = ') || l.includes(':'))) {
    if (l.length < 100) console.log(i + ': ' + l);
  }
});

