const fs = require('fs');
const content = fs.readFileSync('js/topicPages.js', 'utf8');
console.log(content.slice(content.length - 400));

