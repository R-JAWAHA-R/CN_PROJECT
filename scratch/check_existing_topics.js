const fs = require('fs');
const path = require('path');

// Load topics repository simulation
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

console.log('Total topics in TOPIC_REPOSITORY:', Object.keys(global.TOPIC_REPOSITORY || {}).length);

const keysToCheck = [
  'error-detection', 'u2-error-control', 'hamming-code', 'crc', 'sliding-window',
  'simplex-protocol', 'stop-and-wait-noiseless', 'stop-and-wait', 'go-back-n', 'selective-repeat',
  'u2-bridges-overview', 'u2-networking-device-bridges'
];

keysToCheck.forEach(k => {
  const t = (global.TOPIC_REPOSITORY || {})[k];
  console.log(k + ': ' + (t ? 'FOUND (' + t.title + ')' : 'NOT FOUND'));
});

