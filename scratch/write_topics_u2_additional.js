const fs = require('fs');

const p1_a = require('./build_part1_topics.js');
const p1_b = require('./build_part1_hamming_crc.js');
const p2_a = require('./build_part2_protocols.js');
const p2_b = require('./build_part2_sliding_window.js');
const p9 = require('./build_part9_bridges.js');

const allNewTopics = Object.assign({}, p1_a, p1_b, p2_a, p2_b, p9);

const outputHeader = `// =============================================================================
// Unit 2 – Data Link Layer Supplemental Curriculum (Forouzan 4th/6th Edition)
// Comprehensive educational content for 29 missing syllabus topics:
// - Part 1: Error Detection and Correction Codes, Hamming Code, Cyclic Redundancy Check (CRC)
// - Part 2: Simplex Protocol and Its Variations, Sliding Window Protocols
// - Part 9: Uses and Applications of Bridges
// =============================================================================

const TOPICS_U2_ADDITIONAL = ${JSON.stringify(allNewTopics, null, 2)};

// Merge into global and window registries
if (typeof window !== 'undefined') {
  window.TOPICS_U2_ADDITIONAL = TOPICS_U2_ADDITIONAL;
  if (window.TOPICS_U2_SYLLABUS) {
    Object.assign(window.TOPICS_U2_SYLLABUS, TOPICS_U2_ADDITIONAL);
  }
  if (window.TOPICS_U2) {
    Object.assign(window.TOPICS_U2, TOPICS_U2_ADDITIONAL);
  } else {
    window.TOPICS_U2 = Object.assign({}, TOPICS_U2_ADDITIONAL);
  }
  if (window.TOPIC_REPOSITORY) {
    Object.assign(window.TOPIC_REPOSITORY, TOPICS_U2_ADDITIONAL);
  }
}

if (typeof global !== 'undefined') {
  global.TOPICS_U2_ADDITIONAL = TOPICS_U2_ADDITIONAL;
  if (global.TOPICS_U2_SYLLABUS) {
    Object.assign(global.TOPICS_U2_SYLLABUS, TOPICS_U2_ADDITIONAL);
  }
  if (global.TOPICS_U2) {
    Object.assign(global.TOPICS_U2, TOPICS_U2_ADDITIONAL);
  } else {
    global.TOPICS_U2 = Object.assign({}, TOPICS_U2_ADDITIONAL);
  }
  if (global.TOPIC_REPOSITORY) {
    Object.assign(global.TOPIC_REPOSITORY, TOPICS_U2_ADDITIONAL);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOPICS_U2_ADDITIONAL;
}
`;

fs.writeFileSync('js/topics_u2_additional.js', outputHeader, 'utf8');
console.log('Successfully wrote js/topics_u2_additional.js with 29 topics!');

