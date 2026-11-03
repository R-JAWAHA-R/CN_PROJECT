const fs = require('fs');
const u4 = fs.readFileSync('js/topics_u4.js', 'utf8');
console.log('Length of js/topics_u4.js:', u4.length);
console.log('First 500 chars:');
console.log(u4.slice(0, 500));
const keys = [];
const regex = /["']?([a-zA-Z0-9_-]+)["']?\s*:\s*\{[\s\S]*?title\s*:/g;
let m;
while ((m = regex.exec(u4)) !== null) {
  keys.push(m[1]);
}
console.log('Keys in topics_u4.js:', keys);

