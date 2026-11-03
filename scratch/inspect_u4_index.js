const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /id:\s*["']unit4["'][\s\S]*?(?=(id:\s*["']unit5["']|$))/;
const match = html.match(regex);
if (match) {
  console.log(match[0].slice(0, 2000));
} else {
  console.log('No unit4 match in syllabusModules');
}

