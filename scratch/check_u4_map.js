const fs = require('fs');
const tp = fs.readFileSync('js/topicPages.js', 'utf8');
const mapStart = tp.indexOf('const TOPIC_CHAPTER_MAP = {');
const mapEnd = tp.indexOf('};', mapStart);
const mapContent = tp.slice(mapStart, mapEnd + 2);
eval(mapContent.replace('const TOPIC_CHAPTER_MAP =', 'var map ='));
const u4Entries = Object.keys(map).filter(k => map[k].unitId === 'unit4');
console.log('Unit 4 entries in TOPIC_CHAPTER_MAP:', u4Entries);
u4Entries.forEach(k => console.log(k, '=>', map[k]));

