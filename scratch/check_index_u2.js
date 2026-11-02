const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf("id: 'unit2'");
console.log(html.slice(start - 50, start + 600));

