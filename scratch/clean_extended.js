const fs = require('fs');
const path = require('path');

const extPath = path.join(__dirname, '..', 'js', 'topics_u2_extended.js');
let content = fs.readFileSync(extPath, 'utf8');

// Replace any ASCII diagrams with clean empty string
let count = 0;
content = content.replace(/"diagram":\s*"\\[\s\S]*?[^\\]",/g, function(match) {
  if (match.includes('+--') || match.includes('|')) {
    count++;
    return '"diagram": "",';
  }
  return match;
});

// Also check raw string literals if any
content = content.replace(/`[\s\S]*?\+-----------------[\s\S]*?`/g, function(match) {
  count++;
  return '""';
});

fs.writeFileSync(extPath, content, 'utf8');
console.log(`Cleaned ${count} ASCII diagrams from topics_u2_extended.js`);

