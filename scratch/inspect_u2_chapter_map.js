const fs = require('fs');
global.window = global;
require('../js/conceptDatabase.js');
require('../js/topicPages.js');

const map = global.TOPIC_CHAPTER_MAP || {};
console.log('Total entries in TOPIC_CHAPTER_MAP:', Object.keys(map).length);

const u2Entries = Object.entries(map).filter(([k, v]) => v.unitId === 'unit2');
console.log('Unit 2 entries in TOPIC_CHAPTER_MAP:', u2Entries.length);
console.log('Sample Unit 2 mappings:');
u2Entries.slice(0, 10).forEach(([k, v]) => console.log(k, '-> chapNum:', v.chapNum, 'chapTitle:', v.chapTitle));

