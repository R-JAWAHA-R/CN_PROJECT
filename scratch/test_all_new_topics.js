const p1_a = require('./build_part1_topics.js');
const p1_b = require('./build_part1_hamming_crc.js');
const p2_a = require('./build_part2_protocols.js');
const p2_b = require('./build_part2_sliding_window.js');
const p9 = require('./build_part9_bridges.js');

const allNewTopics = Object.assign({}, p1_a, p1_b, p2_a, p2_b, p9);
console.log('Total new topics generated:', Object.keys(allNewTopics).length);

const keys = Object.keys(allNewTopics);
console.log('Keys:', keys);

// Check that every topic has all 17 structural points
let missingFields = 0;
keys.forEach(k => {
  const t = allNewTopics[k];
  if (!t.id || !t.title || !t.oneLiner || !t.quickAnswer || !t.whyItMatters ||
      !t.prerequisitesList || !t.learningObjectives || !t.infobox ||
      !t.sections || !t.sections.overview || !t.sections.eli10 ||
      !t.sections.howItWorks || !t.sections.workedExamples ||
      !t.sections.advantagesLimitations || !t.sections.quiz ||
      !t.sections.references) {
    console.error('Missing fields in topic:', k);
    missingFields++;
  }
});

console.log('Missing fields count across all 29 topics:', missingFields);

