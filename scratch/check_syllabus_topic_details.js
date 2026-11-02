const fs = require('fs');
global.window = global;
require('../js/conceptDatabase.js');
require('../js/topics_u2_syllabus.js');

const t = global.TOPICS_U2_SYLLABUS['u2-error-control'];
for (let k in t) {
  console.log(k, typeof t[k], Array.isArray(t[k]) ? 'array[' + t[k].length + ']' : (typeof t[k] === 'object' ? Object.keys(t[k]) : String(t[k]).slice(0, 50)));
}

