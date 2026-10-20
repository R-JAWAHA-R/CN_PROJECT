const fs = require('fs');

const u3Ext = require('../js/topics_u3_extended.js');
console.log('TOPICS_U3_EXT keys count:', Object.keys(u3Ext).length);
console.log('Keys in TOPICS_U3_EXT:');
Object.keys(u3Ext).forEach(k => console.log('  -', k));

const u3 = require('../js/topics_u3.js');
const u3Keys = Object.keys(u3.TOPICS_U3 || u3);
console.log('\nTOPICS_U3 keys count:', u3Keys.length);
console.log('Keys in TOPICS_U3:');
u3Keys.forEach(k => console.log('  -', k));

// Overwrite check!
const overwrites = u3Keys.filter(k => Object.keys(u3Ext).includes(k));
console.log('\nKeys overwritten when TOPICS_U3_EXT merges into TOPICS_U3:');
console.log(overwrites);

// Now let's check the AST or syntax for duplicate keys in the object literal of topics_u3_extended.js
const code = fs.readFileSync('js/topics_u3_extended.js', 'utf8');
// Let's use acorn or babel or a parser to detect duplicate keys in object literal if available, or regex
// In ES5/ES6, duplicate keys in object literal: last one overwrites previous ones!
// Let's check regex for all direct properties under `const TOPICS_U3_EXT = {`
const lines = code.split('\n');
let inside = false;
let depth = 0;
const topKeys = [];
lines.forEach((line, idx) => {
    if (line.includes('const TOPICS_U3_EXT = {')) {
        inside = true;
        depth = 1;
        return;
    }
    if (inside) {
        if (depth === 1) {
            const m = line.match(/^\s*["']?([a-zA-Z0-9_-]+)["']?\s*:\s*\{/);
            if (m) {
                topKeys.push({ key: m[1], line: idx + 1 });
            }
        }
        const open = (line.match(/\{/g) || []).length;
        const close = (line.match(/\}/g) || []).length;
        depth += open - close;
        if (depth <= 0) inside = false;
    }
});

console.log('\nTop-level keys found by line:');
const seen = {};
topKeys.forEach(item => {
    if (seen[item.key]) {
        console.log(`DUPLICATE DETECTED IN topics_u3_extended.js: key "${item.key}" on line ${item.line} (previously on line ${seen[item.key]})`);
    } else {
        seen[item.key] = item.line;
    }
});
