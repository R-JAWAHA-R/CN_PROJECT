const fs = require('fs');
const code = fs.readFileSync('js/unit2.js', 'utf8');
const lines = code.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('Protocols') || l.includes('TOPIC 2') || l.includes('Topic 2')) {
    console.log(`Line ${idx+1}: ${l.trim()}`);
  }
});

