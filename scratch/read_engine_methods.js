const fs = require('fs');
const code = fs.readFileSync('js/cleanDiagramEngine.js', 'utf8');
const s1 = code.indexOf('renderStopAndWaitDiagram:');
const s2 = code.indexOf('renderSlidingWindowDiagram:');
const s3 = code.indexOf('renderChannelAllocationDiagram:');
console.log('=== StopAndWait ===\n' + code.substring(s1, s1 + 800));
console.log('=== SlidingWindow ===\n' + code.substring(s2, s2 + 800));

