const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');
const idx = content.indexOf('const TOPIC_CHAPTER_MAP = {');
const end = content.indexOf('};', idx);
const mapCode = content.slice(idx, end + 2);
const map = (new Function(mapCode + '; return TOPIC_CHAPTER_MAP;'))();

const u2Keys = Object.keys(map).filter(k => map[k].unitId === 'unit2');
console.log('Total Unit 2 keys in TOPIC_CHAPTER_MAP:', u2Keys.length);
console.log('Sample u2 keys:', u2Keys.slice(0, 15));
console.log('Checking requested topics in map:');
const check = [
  'error-detection', 'hamming-code', 'crc', 'sliding-window',
  'u2-intro-error-detection', 'u2-hamming-distance', 'u2-crc-generator-polynomial'
];
check.forEach(k => console.log(k, map[k] || 'MISSING'));

