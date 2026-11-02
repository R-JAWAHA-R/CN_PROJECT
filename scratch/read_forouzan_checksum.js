const fs = require('fs');
const txt = fs.readFileSync('scratch/forouzan_ch10_errors.txt', 'utf8');
const idx = txt.indexOf('CHECKSUM');
console.log(txt.slice(idx, idx + 4000));

