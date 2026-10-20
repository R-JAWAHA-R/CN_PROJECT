const fs = require('fs');
const code = fs.readFileSync('js/topics_u3_extended.js', 'utf8');
const lines = code.split('\n');
lines.forEach((l, i) => {
    const m = l.match(/^\s*['"]?(dijkstra|distance-vector|ipv4|ipv6|shortest-path-algorithm|distance-vector-routing|ipv4-protocol|ipv6-protocol)['"]?\s*:/);
    if (m) {
        console.log(`Line ${i + 1}: ${l.trim().slice(0, 80)}`);
    }
});
