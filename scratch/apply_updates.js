const fs = require('fs');

// 1. UPDATE js/topicPages.js: Add 29 keys to TOPIC_CHAPTER_MAP
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

if (!topicPagesCode.includes('"u2-intro-error-detection"')) {
  const target = '  "count-to-infinity": {\n      "chapNum": 4,\n      "chapTitle": "Topic 4 – Distance Vector and Link State Routing",\n      "unitId": "unit3",\n      "unit": "Unit 3: Network Layer"\n  }\n};';
  const replacement = '  "count-to-infinity": {\n      "chapNum": 4,\n      "chapTitle": "Topic 4 – Distance Vector and Link State Routing",\n      "unitId": "unit3",\n      "unit": "Unit 3: Network Layer"\n  },\n' + mapEntriesToAdd + '};';
  
  if (topicPagesCode.includes(target)) {
    topicPagesCode = topicPagesCode.replace(target, replacement);
    fs.writeFileSync('js/topicPages.js', topicPagesCode, 'utf8');
    console.log('Successfully updated js/topicPages.js with 29 new TOPIC_CHAPTER_MAP entries!');
  } else {
    console.error('Target not found in js/topicPages.js!');
  }
} else {
  console.log('js/topicPages.js already contains new map entries.');
}

// 2. UPDATE index.html: Include script tag
let indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('js/topics_u2_additional.js')) {
  const targetScript = '<script src="js/topics_u2_syllabus.js"></script>';
  const replacementScript = '<script src="js/topics_u2_syllabus.js"></script>\n    <script src="js/topics_u2_additional.js"></script>';
  indexHtml = indexHtml.replace(targetScript, replacementScript);
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('Successfully added js/topics_u2_additional.js script tag to index.html!');
} else {
  console.log('index.html already includes js/topics_u2_additional.js script tag.');
}

console.log('Step 1 and 2 completed.');

