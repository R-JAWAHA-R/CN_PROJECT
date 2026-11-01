// scratch/inspect_ddi_extended.js
const fs = require('fs');

const ext = fs.readFileSync('js/topics_u2_extended.js', 'utf8');
const idx = ext.indexOf('"dll-design-issues":');
console.log(ext.slice(idx, idx + 1200));
