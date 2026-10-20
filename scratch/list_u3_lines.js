const fs = require('fs');
const code = fs.readFileSync('js/topics_u3_extended.js', 'utf8');
const lines = code.split('\n');
const reserved = ['infobox', 'sections', 'compareWith', 'practice'];
lines.forEach((l, i) => {
    const m = l.match(/^\s*['"]([a-zA-Z0-9_-]+)['"]\s*:\s*\{/);
    if (m && !reserved.includes(m[1])) {
        console.log(`Line ${i + 1}: ${m[1]}`);
    }
});
