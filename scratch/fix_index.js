const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(
  '{ id: "u2-error-techniques", "u2-checksum", title: "Error Detection and Correction Techniques", type: "document" },',
  '{ id: "u2-error-techniques", title: "Error Detection and Correction Techniques", type: "document" },'
);
fs.writeFileSync('index.html', content, 'utf8');
console.log('Fixed index.html successfully!');

