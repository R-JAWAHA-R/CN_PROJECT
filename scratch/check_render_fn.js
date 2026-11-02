const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');
const idx = content.indexOf('function renderModernTopicPage');
console.log(content.slice(idx, idx + 1200));

