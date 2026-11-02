const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
const u3idx = lines.findIndex(l => l.includes('id: "unit3"') || l.includes("id: 'unit3'"));
console.log('Unit 3 line:', u3idx);
console.log(lines.slice(u3idx - 40, u3idx + 10).join('\n'));

