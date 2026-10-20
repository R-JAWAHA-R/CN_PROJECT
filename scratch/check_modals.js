const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Find modals
const modalMatches = [...index.matchAll(/id=['"]([a-zA-Z0-9_-]*modal[a-zA-Z0-9_-]*)['"]/gi)].map(m => m[1]);
console.log('Modals in index.html:', modalMatches);

// Find modal opener functions or lab functions
const funcMatches = [...index.matchAll(/function\s+([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]);
console.log('Functions in index.html:', funcMatches.filter(f => f.toLowerCase().includes('modal') || f.toLowerCase().includes('calc') || f.toLowerCase().includes('lab') || f.toLowerCase().includes('tool') || f.toLowerCase().includes('crc') || f.toLowerCase().includes('subnet')));

// Check openModal switch cases or implementation
const openModalMatch = index.match(/function\s+openModal\s*\(([\s\S]*?)\{[\s\S]*?switch\s*\([a-zA-Z0-9_]+\)\s*\{([\s\S]*?)\}/);
if (openModalMatch) {
    const cases = [...openModalMatch[2].matchAll(/case\s+['"]([a-zA-Z0-9_-]+)['"]/g)].map(m => m[1]);
    console.log('openModal cases:', cases);
} else {
    console.log('Could not parse openModal switch');
}

// Let's search for openModal in index.html
const lines = index.split('\n');
lines.forEach((l, i) => {
    if (l.includes('function openModal')) {
        console.log(`openModal defined at line ${i + 1}`);
    }
});
