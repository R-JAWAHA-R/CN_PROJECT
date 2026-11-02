const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');
const lines = content.split('\n');
const idx = lines.findIndex(l => l.includes('TopicPageEngine'));
console.log('TopicPageEngine at line:', idx);
console.log(lines.slice(idx, idx + 10).join('\n'));
const endIdx = lines.findIndex(l => l.includes('window.TopicPageEngine'));
console.log('window.TopicPageEngine at line:', endIdx);

