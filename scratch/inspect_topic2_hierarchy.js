const fs = require('fs');
const code = fs.readFileSync('js/unit2.js', 'utf8');
const startIdx = code.indexOf('id: "topic-2"');
if (startIdx !== -1) {
  console.log(code.substring(startIdx - 10, startIdx + 1200));
} else {
  console.log('topic-2 not found');
}

