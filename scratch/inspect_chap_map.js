const fs = require('fs');
const tp = fs.readFileSync('js/topicPages.js', 'utf8');
const mapStart = tp.indexOf('const TOPIC_CHAPTER_MAP = {');
console.log(tp.slice(mapStart, mapStart + 1500));

