const fs = require('fs');
global.window = global;
require('../js/conceptDatabase.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');

console.log('Keys in window.TOPICS_U2_SYLLABUS:', Object.keys(global.TOPICS_U2_SYLLABUS || {}).length);
console.log('All keys in TOPICS_U2_SYLLABUS:', Object.keys(global.TOPICS_U2_SYLLABUS || {}));

