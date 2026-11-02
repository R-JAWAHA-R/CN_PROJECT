const fs = require('fs');

global.window = global;
global.localStorage = {
  getItem: () => '{}',
  setItem: () => { }
};
global.completedTopics = [];

// Load in exact index.html sequence
require('../js/conceptDatabase.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');
require('../js/topics_u2_additional.js');
require('../js/topics_u3.js');
require('../js/topics_u3_extended.js');
require('../js/topics_u4.js');
require('../js/topics_u5.js');
require('../js/cleanDiagramEngine.js');
const topicPagesModule = require('../js/topicPages.js');
global.TopicPageEngine = topicPagesModule.TopicPageEngine;
global.TOPIC_REPOSITORY = topicPagesModule.TOPIC_REPOSITORY;

require('../js/comparisons.js');
require('../js/learningPaths.js');
require('../js/knowledgeGraph.js');
require('../js/resources.js');
require('../js/unit1.js');
require('../js/unit2.js');
require('../js/unit3.js');
require('../js/unit4.js');
require('../js/unit5.js');

console.log('=== SYSTEM SIMULATION CHECK ===');
console.log('Total topics in TOPIC_REPOSITORY:', Object.keys(global.TOPIC_REPOSITORY || {}).length);

const newlyAddedTopics = [
  // Part 1: Error Detection and Correction Codes (7)
  'u2-intro-error-detection',
  'u2-intro-error-correction',
  'u2-redundancy-error-control',
  'u2-hamming-distance',
  'u2-detection-vs-correction',
  'u2-error-techniques',
  'u2-checksum',
  'checksum',
  // Part 1: Hamming Code (4)
  'u2-hamming-working-principle',
  'u2-hamming-code-calculation',
  'u2-hamming-detection-correction',
  'u2-hamming-numerical-problems',
  // Part 1: CRC (5)
  'u2-crc-intro',
  'u2-crc-working-principle',
  'u2-crc-generator-polynomial',
  'u2-crc-binary-division',
  'u2-crc-numerical-problems',
  // Part 2: Simplex Protocol and Variations (3)
  'u2-unrestricted-simplex',
  'u2-simplex-stop-and-wait',
  'u2-simplex-noisy-channels',
  // Part 2: Sliding Window Protocols (6)
  'u2-sliding-window-intro',
  'u2-sender-receiver-window',
  'u2-sliding-window-size',
  'u2-sliding-window-working-principle',
  'u2-piggybacking',
  'u2-sliding-window-vs-stop-and-wait',
  // Part 9: Uses and Applications of Bridges (5)
  'u2-bridges-purpose',
  'u2-bridges-network-segmentation',
  'u2-bridges-traffic-filtering',
  'u2-bridges-connecting-lan-segments',
  'u2-bridges-advantages-limitations'
];

console.log('Verifying all 29 newly requested topics exist in TOPIC_REPOSITORY:');
let allFound = true;
newlyAddedTopics.forEach((id) => {
  const t = global.TOPIC_REPOSITORY[id];
  if (!t) {
    console.error(`[MISSING] ${id}`);
    allFound = false;
  }
});
if (allFound) {
  console.log(`✓ All ${newlyAddedTopics.length} requested topics FOUND in TOPIC_REPOSITORY!`);
}

// Check original topics in Unit 2 Part 1, 2, 9 are intact
const originalTopics = [
  'u2-dll-intro', 'u2-dll-osi-position', 'u2-dll-functions', 'dll-design-issues',
  'u2-dll-services', 'framing', 'flow-control', 'u2-error-control',
  'u2-dll-protocols-intro', 'u2-protocol-classification', 'simplex-protocol',
  'stop-and-wait-noiseless', 'stop-and-wait', 'go-back-n', 'selective-repeat',
  'comparison-noiseless-noisy', 'comparison-arq-protocols',
  'dll-switching', 'u2-bridges-overview', 'u2-transparent-bridges', 'u2-learning-bridges',
  'u2-bridge-learning-process', 'u2-forwarding-and-filtering', 'u2-bridge-flooding',
  'u2-spanning-tree-protocol', 'u2-bridges-vs-switches'
];

console.log('Verifying original topics are preserved:');
let origFound = true;
originalTopics.forEach(id => {
  if (!global.TOPIC_REPOSITORY[id]) {
    console.error(`[ORIGINAL MISSING] ${id}`);
    origFound = false;
  }
});
if (origFound) {
  console.log(`✓ All ${originalTopics.length} original sample topics strictly PRESERVED!`);
}

// Test rendering each of the 29 topics using TopicPageEngine.renderTopicPage
console.log('Testing TopicPageEngine.renderTopicPage() for all 29 new topics:');
let renderErrors = 0;
newlyAddedTopics.forEach(id => {
  const fakeContainer = { innerHTML: '' };
  try {
    global.TopicPageEngine.renderTopicPage(id, fakeContainer);
    if (!fakeContainer.innerHTML || fakeContainer.innerHTML.includes('Topic Not Found')) {
      console.error(`[RENDER FAILED] ${id}`);
      renderErrors++;
    }
  } catch (e) {
    console.error(`[RENDER EXCEPTION] ${id}:`, e.message);
    renderErrors++;
  }
});

if (renderErrors === 0) {
  console.log('✓ All 29 new topics rendered successfully with TopicPageEngine!');
} else {
  console.error(`Total render errors: ${renderErrors}`);
}
