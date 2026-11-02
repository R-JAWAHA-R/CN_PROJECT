const path = require('path');
global.window = global;
require('../js/conceptDatabase.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');

const list = ['error-detection', 'hamming-code', 'crc', 'sliding-window', 'u2-error-control'];
list.forEach(id => {
  const t = (global.TOPIC_REPOSITORY || {})[id];
  if (t) {
    console.log('=== ' + id + ' ===');
    console.log('Title:', t.title);
    console.log('Unit:', t.unit);
    console.log('ParentTopic:', t.parentTopic);
    console.log('OneLiner:', t.oneLiner);
    console.log('Sections keys:', Object.keys(t.sections || {}));
  } else {
    console.log(id + ' NOT FOUND in TOPIC_REPOSITORY');
  }
});

