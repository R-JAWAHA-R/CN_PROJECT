const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log('checksum in index.html:', html.includes('"checksum"'));
// check where it appears
let pos = 0;
while ((pos = html.indexOf('"checksum"', pos)) !== -1) {
  console.log('Found at pos', pos, ':', JSON.stringify(html.slice(pos - 30, pos + 40)));
  pos += 10;
}

