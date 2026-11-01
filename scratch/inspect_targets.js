// scratch/inspect_targets.js
const fs = require('fs');

const u2 = fs.readFileSync('js/topics_u2.js', 'utf8');
const u2ext = fs.readFileSync('js/topics_u2_extended.js', 'utf8');

console.log('--- topics_u2.js framing ---');
const fIdx = u2.indexOf('"framing":');
console.log(u2.slice(fIdx, fIdx + 300));

console.log('--- topics_u2.js flow-control ---');
const fcIdx = u2.indexOf('"flow-control":');
console.log(u2.slice(fcIdx, fcIdx + 300));

console.log('--- topics_u2_extended.js dll-design-issues ---');
const ddiIdx = u2ext.indexOf('"dll-design-issues":');
console.log(u2ext.slice(ddiIdx, ddiIdx + 300));
