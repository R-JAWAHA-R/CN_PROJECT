const fs = require('fs');
const u3 = require('../js/topics_u3.js');
const u3Ext = require('../js/topics_u3_extended.js');

const pairs = [
    ['shortest-path-algorithm', 'dijkstra'],
    ['distance-vector-routing', 'distance-vector'],
    ['ipv4-protocol', 'ipv4'],
    ['ipv6-protocol', 'ipv6']
];

pairs.forEach(([k1, k2]) => {
    const t1 = u3Ext[k1];
    const t2 = u3Ext[k2];
    const tOriginal = (u3.TOPICS_U3 || u3)[k2];
    console.log(`\n=== Comparing ${k1} vs ${k2} in TOPICS_U3_EXT ===`);
    console.log(`${k1} title: "${t1?.title}", readingTime: "${t1?.readingTime}"`);
    console.log(`${k2} (in EXT) title: "${t2?.title}", readingTime: "${t2?.readingTime}"`);
    console.log(`${k2} (in original U3) title: "${tOriginal?.title}", readingTime: "${tOriginal?.readingTime}"`);
    console.log(`Are EXT ${k1} and ${k2} titles/text identical? ${t1?.title === t2?.title}, oneLiner same? ${t1?.oneLiner === t2?.oneLiner}`);
});
