const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<script src=')) {
    console.log(i + ': ' + l.trim());
  }
});

