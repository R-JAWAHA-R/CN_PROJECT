const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const pos = html.indexOf('if (mod.chapters && mod.chapters.length > 0) {', html.indexOf('function renderSidebar('));
console.log(html.slice(pos, pos + 3000));

