const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('function renderSidebar(');
console.log(html.slice(start, start + 3000));

