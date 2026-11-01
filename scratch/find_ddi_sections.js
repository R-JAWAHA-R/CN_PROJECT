// scratch/find_ddi_sections.js
const fs = require('fs');

const ext = fs.readFileSync('js/topics_u2_extended.js', 'utf8');
const idx = ext.indexOf('"dll-design-issues":');
const sub = ext.slice(idx, idx + 4000);
const sMatch = sub.match(/sections\s*:/);
console.log('sMatch:', sMatch);
if (sMatch) {
  console.log('Found sections at offset:', sMatch.index);
  console.log(sub.slice(sMatch.index, sMatch.index + 500));
}
