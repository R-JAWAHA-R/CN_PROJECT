const fs = require('fs');

let code = fs.readFileSync('js/topicPages.js', 'utf8');

const target = '"u2-intro-error-detection": {';
const additions = `"u2-checksum": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "checksum": {
      "chapNum": 1,
      "chapTitle": "TOPIC 1 – DATA LINK LAYER FUNDAMENTALS",
      "unitId": "unit2",
      "unit": "Unit 2 – Data Link Layer"
  },
  "u2-intro-error-detection": {`;

if (!code.includes('"u2-checksum":')) {
  code = code.replace(target, additions);
  fs.writeFileSync('js/topicPages.js', code, 'utf8');
  console.log('Added u2-checksum and checksum to TOPIC_CHAPTER_MAP in js/topicPages.js');
} else {
  console.log('Already in TOPIC_CHAPTER_MAP');
}

