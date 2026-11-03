const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = html.match(/<script src="[^"]+"><\/script>/g);
console.log('Scripts loaded in index.html:');
console.log(scriptMatches.join('\n'));

