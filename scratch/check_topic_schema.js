// scratch/check_topic_schema.js
const fs = require('fs');

const s = fs.readFileSync('js/topics_u2_syllabus.js', 'utf8');
const idx = s.indexOf('"u2-pure-aloha":');
console.log(s.slice(idx, idx + 1000));
console.log('--- BOTTOM OF u2-pure-aloha ---');
const nextIdx = s.indexOf('"u2-slotted-aloha":');
console.log(s.slice(nextIdx - 500, nextIdx));
