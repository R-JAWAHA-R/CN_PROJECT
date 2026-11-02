const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');
const lines = content.split('\n');
const mapStart = lines.findIndex(l => l.includes('const TOPIC_CHAPTER_MAP = {'));
let mapEnd = -1;
for (let i = mapStart; i < lines.length; i++) {
  if (lines[i].startsWith('};')) {
    mapEnd = i;
    break;
  }
}
console.log('Map start line:', mapStart, 'Map end line:', mapEnd);
console.log('Lines before map end:');
console.log(lines.slice(mapEnd - 10, mapEnd + 2).join('\n'));

