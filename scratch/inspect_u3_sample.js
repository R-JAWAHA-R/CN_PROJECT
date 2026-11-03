const fs = require('fs');
global.window = {};
require('../js/topics_u3_extended.js');
const u3Ext = global.TOPICS_U3_EXTENDED || window.TOPICS_U3_EXTENDED || {};
const firstKey = Object.keys(u3Ext)[0];
console.log('Sample key from topics_u3_extended.js:', firstKey);
console.log('Keys of topic object:', Object.keys(u3Ext[firstKey]));
console.log('Sample topic preview:');
const sample = u3Ext[firstKey];
for (let k of Object.keys(sample)) {
  if (typeof sample[k] === 'string') {
    console.log(`  ${k}: ${sample[k].slice(0, 80)}...`);
  } else if (Array.isArray(sample[k])) {
    console.log(`  ${k}: Array(${sample[k].length})`);
  } else {
    console.log(`  ${k}: Object keys [${Object.keys(sample[k] || {}).join(', ')}]`);
  }
}

