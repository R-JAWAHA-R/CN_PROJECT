const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('unit2') && (l.includes('module') || l.includes('id:') || l.includes('id ='))) {
    console.log(i + ': ' + l.trim());
  }
});

