const fs = require('fs');

let topicPagesCode = fs.readFileSync('js/topicPages.js', 'utf8');

const mapEntriesToAdd = `  "u2-intro-error-detection": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-intro-error-correction": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-redundancy-error-control": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-hamming-distance": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-detection-vs-correction": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-error-techniques": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-hamming-working-principle": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-hamming-code-calculation": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-hamming-detection-correction": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-hamming-numerical-problems": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-crc-intro": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-crc-working-principle": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-crc-generator-polynomial": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-crc-binary-division": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-crc-numerical-problems": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-unrestricted-simplex": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-simplex-stop-and-wait": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-simplex-noisy-channels": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-sliding-window-intro": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-sender-receiver-window": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-sliding-window-size": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-sliding-window-working-principle": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-piggybacking": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-sliding-window-vs-stop-and-wait": {
      "chapNum": 2,
      "chapTitle": "TOPIC 2 – DATA LINK LAYER PROTOCOLS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-bridges-purpose": {
      "chapNum": 9,
      "chapTitle": "TOPIC 9 – DATA LINK LAYER SWITCHING",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-bridges-network-segmentation": {
      "chapNum": 9,
      "chapTitle": "TOPIC 9 – DATA LINK LAYER SWITCHING",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-bridges-traffic-filtering": {
      "chapNum": 9,
      "chapTitle": "TOPIC 9 – DATA LINK LAYER SWITCHING",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-bridges-connecting-lan-segments": {
      "chapNum": 9,
      "chapTitle": "TOPIC 9 – DATA LINK LAYER SWITCHING",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-bridges-advantages-limitations": {
      "chapNum": 9,
      "chapTitle": "TOPIC 9 – DATA LINK LAYER SWITCHING",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
`;

const searchPattern = /("count-to-infinity":\s*\{[\s\S]*?\})\s*;\s*\/\/\s*Enrich TOPIC_REPOSITORY/;
const match = topicPagesCode.match(searchPattern);
if (match) {
  const replacement = match[1] + ',\n' + mapEntriesToAdd + '};\n// Enrich TOPIC_REPOSITORY';
  topicPagesCode = topicPagesCode.replace(match[0], replacement);
  fs.writeFileSync('js/topicPages.js', topicPagesCode, 'utf8');
  console.log('Successfully updated js/topicPages.js with 29 new TOPIC_CHAPTER_MAP entries!');
} else {
  console.error('Pattern match failed in js/topicPages.js!');
}

