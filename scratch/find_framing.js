const fs = require('fs');
const files = fs.readdirSync('js').filter(f => f.endsWith('.js'));
files.forEach(f => {
  const content = fs.readFileSync('js/' + f, 'utf8');
  if (content.includes('"framing"') || content.includes("'framing'")) {
    console.log(`Found in js/${f}`);
  }
});

