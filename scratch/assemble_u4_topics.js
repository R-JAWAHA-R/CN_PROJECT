const fs = require('fs');
const path = require('path');

const { TOPIC1_ITEMS } = require('./build_u4_topic1.js');
const { TOPIC2_ITEMS } = require('./build_u4_topic2.js');
const { TOPIC3_ITEMS } = require('./build_u4_topic3.js');
const { TOPIC4_ITEMS } = require('./build_u4_topic4.js');
const { TOPIC5_ITEMS } = require('./build_u4_topic5.js');

const allTopics = Object.assign({}, TOPIC1_ITEMS, TOPIC2_ITEMS, TOPIC3_ITEMS, TOPIC4_ITEMS, TOPIC5_ITEMS);

// Add backward compatible aliases
allTopics['transport-layer'] = Object.assign({}, allTopics['u4-transport-services'], { id: 'transport-layer' });
allTopics['tcp'] = Object.assign({}, allTopics['u4-intro-tcp'], { id: 'tcp' });
allTopics['udp'] = Object.assign({}, allTopics['u4-intro-udp'], { id: 'udp' });
allTopics['udp-header'] = Object.assign({}, allTopics['u4-udp-segment-format'], { id: 'udp-header' });
allTopics['tcp-three-way-handshake'] = Object.assign({}, allTopics['u4-tcp-connection-establishment'], { id: 'tcp-three-way-handshake' });
allTopics['tcp-header'] = Object.assign({}, allTopics['u4-tcp-segment-header'], { id: 'tcp-header' });
allTopics['sequence-number'] = Object.assign({}, allTopics['u4-intro-tcp'], { id: 'sequence-number' });
allTopics['acknowledgement'] = Object.assign({}, allTopics['u4-tcp-segment-header'], { id: 'acknowledgement' });
allTopics['tcp-flow-control'] = Object.assign({}, allTopics['u4-tcp-sliding-window'], { id: 'tcp-flow-control' });
allTopics['tcp-congestion-control'] = Object.assign({}, allTopics['u4-tcp-congestion-control'], { id: 'tcp-congestion-control' });

const content = `// Unit IV Topics Database: Transport Layer (TCP, UDP, Congestion Control)
// Strictly Aligned with Behrouz A. Forouzan (Chapters 23 & 24) and Master Syllabus
// Exactly 5 Main Topics and 21 Subtopics with 17-Point Structural Learning Articles

const TOPICS_U4 = ${JSON.stringify(allTopics, null, 2)};

if (typeof window !== 'undefined') {
  window.TOPICS_U4 = TOPICS_U4;
  if (window.TOPIC_REPOSITORY) {
    Object.assign(window.TOPIC_REPOSITORY, TOPICS_U4);
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TOPICS_U4 };
}
`;

fs.writeFileSync(path.join(__dirname, '../js/topics_u4.js'), content, 'utf8');
console.log(`Successfully assembled ${Object.keys(allTopics).length} topics into js/topics_u4.js!`);

