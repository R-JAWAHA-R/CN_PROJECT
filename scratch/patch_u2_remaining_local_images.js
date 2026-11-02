const fs = require('fs');

const u2 = require('../js/topics_u2.js');

const remap = {
  "error-detection": "assets/images/topic1/error-control-taxonomy.svg",
  "parity": "assets/images/topic1/parity-generation-checking.svg",
  "checksum": "assets/images/topic1/internet-checksum-calculation.svg",
  "hamming-code": "assets/images/topic1/hamming-code-7-4-matrix.svg",
  "crc": "assets/images/topic1/crc-modulo-2-division.svg",
  "sliding-window": "assets/images/topic2/sliding-window-frame-sequence.svg"
};

for (const [id, localPath] of Object.entries(remap)) {
  if (u2[id]) {
    u2[id].imageUrl = localPath;
    if (u2[id].image) u2[id].image.url = localPath;
    if (u2[id].sections && u2[id].sections.image) u2[id].sections.image.url = localPath;
  }
}

const header = '// Unit 2: Data Link Layer Topics\nvar TOPICS_U2 = ' + JSON.stringify(u2, null, 2) + ';\n\n';
const footer = `if (typeof window !== "undefined") window.TOPICS_U2 = TOPICS_U2;
if (typeof global !== "undefined") global.TOPICS_U2 = TOPICS_U2;
if (typeof module !== "undefined" && module.exports) {
  module.exports = TOPICS_U2;
}
`;

fs.writeFileSync('js/topics_u2.js', header + footer, 'utf8');
console.log('Remapped 6 remaining wikimedia links in topics_u2.js to local SVGs');

