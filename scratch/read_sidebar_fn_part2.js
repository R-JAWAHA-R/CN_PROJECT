const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('if (mod.chapters && mod.chapters.length > 0) {');
console.log(html.slice(start, start + 3000));

