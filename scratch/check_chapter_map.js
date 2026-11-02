const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');
const idx = content.indexOf('const TOPIC_CHAPTER_MAP = {');
console.log(content.slice(idx, idx + 1000));

