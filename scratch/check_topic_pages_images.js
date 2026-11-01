// scratch/check_topic_pages_images.js
const fs = require('fs');

const tp = fs.readFileSync('js/topicPages.js', 'utf8');
let idx = 0;
while ((idx = tp.indexOf('imageUrl', idx)) !== -1) {
  console.log('Match at', idx);
  console.log(tp.slice(Math.max(0, idx - 150), idx + 250));
  console.log('-------------------------------------------');
  idx += 10;
}
