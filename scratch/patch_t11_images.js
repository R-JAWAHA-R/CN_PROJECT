const fs = require('fs');
const u2 = require('../js/topics_u2_syllabus.js');

const t11Map = {
  'u2-definitions-terminology': 'assets/images/topic11/unit2-key-terminology-glossary.svg',
  'u2-important-diagrams': 'assets/images/topic11/unit2-master-diagrams-summary.svg',
  'u2-comparison-tables': 'assets/images/topic11/unit2-protocols-comparison-matrix.svg',
  'u2-numerical-problems': 'assets/images/topic11/unit2-numerical-formulas-cheatsheet.svg',
  'u2-protocol-examples': 'assets/images/topic11/unit2-protocol-exchange-examples.svg',
  'u2-short-answer-questions': 'assets/images/topic11/unit2-short-answer-review.svg',
  'u2-long-answer-questions': 'assets/images/topic11/unit2-long-answer-architecture.svg',
  'u2-important-exam-questions': 'assets/images/topic11/unit2-exam-high-yield-map.svg',
  'u2-mcqs': 'assets/images/topic11/unit2-mcqs-concept-check.svg',
  'u2-practice-test': 'assets/images/topic11/unit2-practice-exam-assessment.svg'
};

for (const [id, localPath] of Object.entries(t11Map)) {
  if (u2[id]) u2[id].imageUrl = localPath;
}

const header = '// Unit 2 Comprehensive Syllabus Topics Repository\n';
const footer = '\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = TOPICS_U2_SYLLABUS;\n}\n';
fs.writeFileSync('js/topics_u2_syllabus.js', header + 'var TOPICS_U2_SYLLABUS = ' + JSON.stringify(u2, null, 2) + ';' + footer, 'utf8');
console.log('Topic 11 patched into topics_u2_syllabus.js');

