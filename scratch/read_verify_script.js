const fs = require('fs');
const code = fs.readFileSync('scratch/verify_all.js', 'utf8');
console.log(code.substring(code.indexOf('Checking Unit 2 Hierarchy'), code.indexOf('Checking Unit 2 Hierarchy') + 800));

