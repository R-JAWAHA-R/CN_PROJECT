// scratch/read_tp_image_block.js
const fs = require('fs');

const tp = fs.readFileSync('js/topicPages.js', 'utf8');
const idx = tp.indexOf('const resolvedImgUrl =');
console.log(tp.slice(idx - 100, idx + 800));
