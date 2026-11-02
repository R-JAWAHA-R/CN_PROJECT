const fs = require('fs');
global.window = global;
require('../js/conceptDatabase.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');
require('../js/topics_u3.js');
require('../js/topics_u3_extended.js');
require('../js/topics_u4.js');
require('../js/topics_u5.js');
require('../js/topicPages.js');

const keys = ['error-detection', 'hamming-code', 'crc', 'sliding-window', 'framing', 'flow-control', 'dll-design-issues'];

keys.forEach(k => {
  const t = global.TOPIC_REPOSITORY[k];
  console.log('--- ' + k + ' ---');
  if (t) {
    console.log('Title:', t.title);
    console.log('Chapter:', t.chapter);
    console.log('Has eli10:', !!t.eli10);
    console.log('Has workedExamples:', !!t.workedExamples);
    console.log('Keys:', Object.keys(t));
  } else {
    console.log('NOT FOUND');
  }
});

