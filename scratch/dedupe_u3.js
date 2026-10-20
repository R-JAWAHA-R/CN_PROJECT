const fs = require('fs');

let content = fs.readFileSync('js/topics_u3_extended.js', 'utf8');
const isCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// Replace key at line 179: "shortest-path-algorithm" -> "dijkstra"
content = content.replace(
    '"shortest-path-algorithm": {\n    "id": "shortest-path-algorithm"',
    '"dijkstra": {\n    "id": "dijkstra"'
);

// Replace key at line 336: "distance-vector-routing" -> "distance-vector"
content = content.replace(
    '"distance-vector-routing": {\n    "id": "distance-vector-routing"',
    '"distance-vector": {\n    "id": "distance-vector"'
);

// Replace key at line 1127: "ipv4-protocol" -> "ipv4"
content = content.replace(
    '"ipv4-protocol": {\n    "id": "ipv4-protocol"',
    '"ipv4": {\n    "id": "ipv4"'
);

// Replace key at line 1287: "ipv6-protocol" -> "ipv6"
content = content.replace(
    '"ipv6-protocol": {\n    "id": "ipv6-protocol"',
    '"ipv6": {\n    "id": "ipv6"'
);

const firstDijkstra = content.indexOf('"dijkstra": {');
const secondDijkstra = content.indexOf('"dijkstra": {', firstDijkstra + 1);

console.log('firstDijkstra index:', firstDijkstra);
console.log('secondDijkstra index:', secondDijkstra);

if (secondDijkstra !== -1) {
    const closeBrace = content.lastIndexOf('};\n\n// Merge with existing TOPICS_U3');
    console.log('closeBrace index:', closeBrace);
    if (closeBrace !== -1) {
        const before = content.slice(0, secondDijkstra).trimEnd();
        const cleanBefore = before.endsWith(',') ? before.slice(0, -1) : before;
        const after = content.slice(closeBrace + 1);
        
        const aliasCode = `
// Backward-compatibility aliases for legacy topic IDs
TOPICS_U3_EXT["shortest-path-algorithm"] = TOPICS_U3_EXT["dijkstra"];
TOPICS_U3_EXT["distance-vector-routing"] = TOPICS_U3_EXT["distance-vector"];
TOPICS_U3_EXT["ipv4-protocol"] = TOPICS_U3_EXT["ipv4"];
TOPICS_U3_EXT["ipv6-protocol"] = TOPICS_U3_EXT["ipv6"];
`;
        let newContent = cleanBefore + '\n};\n' + aliasCode + after;
        if (isCRLF) {
            newContent = newContent.replace(/\n/g, '\r\n');
        }
        fs.writeFileSync('js/topics_u3_extended.js', newContent, 'utf8');
        console.log('Successfully de-duplicated topics_u3_extended.js!');
    }
}
