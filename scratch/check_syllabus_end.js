const fs = require('fs');
const content = fs.readFileSync('js/topics_u2_syllabus.js', 'utf8');
console.log(content.slice(content.length - 600));

