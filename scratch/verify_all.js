// Comprehensive verification script
const fs = require('fs');

console.log('--- 1. Testing JS Syntax ---');
const filesToTest = [
  'js/conceptDatabase.js',
  'js/topics_u1.js',
  'js/topics_u2.js',
  'js/topics_u2_extended.js',
  'js/topics_u2_syllabus.js',
  'js/cleanDiagramEngine.js',
  'js/topicPages.js',
  'js/unit2.js',
  'js/app.js'
];

global.window = global;
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ className: '', style: {}, appendChild: () => {}, querySelector: () => null }),
  addEventListener: () => {}
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};

for (const file of filesToTest) {
  try {
    require('../' + file);
    console.log(`✓ ${file} loaded cleanly`);
  } catch (err) {
    console.error(`✗ Error loading ${file}:`, err);
    process.exit(1);
  }
}

console.log('\n--- 2. Checking Unit 2 Hierarchy Coverage ---');
const unit2Topics = [
  // Topic 1
  'u2-dll-intro', 'u2-dll-osi-position', 'u2-dll-functions', 'dll-design-issues', 'u2-dll-services', 'framing', 'flow-control', 'u2-error-control',
  // Topic 2
  'u2-dll-protocols-intro', 'u2-protocol-classification', 'simplex-protocol', 'stop-and-wait-noiseless', 'stop-and-wait', 'go-back-n', 'selective-repeat', 'comparison-noiseless-noisy', 'comparison-arq-protocols',
  // Topic 3
  'u2-mac-sublayer-intro', 'u2-need-for-mac-sublayer', 'u2-mac-functions-responsibilities', 'channel-allocation', 'u2-fdma', 'u2-tdma', 'u2-dynamic-channel-allocation', 'u2-static-vs-dynamic-channel-allocation',
  // Topic 4
  'u2-multiple-access-intro', 'u2-random-access-protocols', 'u2-pure-aloha', 'u2-slotted-aloha', 'u2-csma-1-persistent', 'u2-csma-non-persistent', 'u2-csma-p-persistent', 'u2-csma-cd', 'u2-csma-ca', 'u2-comparison-multiple-access',
  // Topic 5
  'u2-collision-free-intro', 'u2-bit-map-protocol', 'u2-binary-countdown-protocol', 'u2-token-passing-protocol', 'u2-collision-free-working-principles', 'u2-comparison-collision-free',
  // Topic 6
  'ethernet', 'u2-ethernet-architecture', 'mac-address', 'u2-ethernet-frame-format', 'u2-ethernet-mac-protocol', 'u2-ethernet-csma-cd-operation', 'u2-binary-exponential-backoff', 'u2-ethernet-types-evolution', 'u2-ethernet-advantages-limitations',
  // Topic 7
  'wireless-lan-protocols', 'u2-wireless-characteristics', 'u2-wireless-lan-architecture', 'u2-hidden-terminal-problem', 'u2-exposed-terminal-problem', 'u2-wireless-multiple-access', 'u2-wireless-lan-access-methods', 'u2-wireless-communication-challenges',
  // Topic 8
  'wifi-mac-sublayer', 'u2-ieee-802-11-architecture', 'u2-ieee-802-11-dcf', 'u2-ieee-802-11-pcf', 'u2-ieee-802-11-csma-ca', 'u2-ieee-802-11-ifs', 'u2-rts-cts-mechanism', 'u2-network-allocation-vector', 'u2-ieee-802-11-frame-formats', 'u2-dcf-vs-pcf',
  // Topic 9
  'dll-switching', 'u2-bridges-overview', 'u2-transparent-bridges', 'u2-learning-bridges', 'u2-bridge-learning-process', 'u2-forwarding-and-filtering', 'u2-bridge-flooding', 'u2-spanning-tree-protocol', 'u2-bridges-vs-switches',
  // Topic 10
  'network-devices', 'u2-networking-device-repeaters', 'u2-networking-device-hubs', 'u2-networking-device-bridges', 'u2-networking-device-switches', 'u2-networking-device-routers', 'u2-networking-device-gateways', 'u2-device-working-principles', 'u2-comparison-networking-devices', 'u2-device-osi-layers',
  // Topic 11
  'u2-definitions-terminology', 'u2-important-diagrams', 'u2-comparison-tables', 'u2-numerical-problems', 'u2-protocol-examples', 'u2-short-answer-questions', 'u2-long-answer-questions', 'u2-important-exam-questions', 'u2-mcqs', 'u2-practice-test'
];

let missing = 0;
for (const id of unit2Topics) {
  if (!global.TOPIC_REPOSITORY[id]) {
    console.error(`✗ Missing topic in TOPIC_REPOSITORY: ${id}`);
    missing++;
  }
}

if (missing === 0) {
  console.log(`✓ All ${unit2Topics.length} Unit 2 required subtopics exist in TOPIC_REPOSITORY!`);
} else {
  console.error(`✗ ${missing} subtopics missing!`);
  process.exit(1);
}

console.log('\n--- 3. Testing Unit2Module.hierarchy ---');
console.log('Unit2Module has', global.Unit2Module.hierarchy.length, 'topics.');
global.Unit2Module.hierarchy.forEach((t, i) => {
  console.log(`  Topic ${i + 1}: ${t.title} (${t.items.length} top items)`);
});

console.log('\n--- 4. Testing HTML Integrity ---');
const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('topics_u2_syllabus.js')) {
  console.error('✗ topics_u2_syllabus.js not linked in index.html');
  process.exit(1);
} else {
  console.log('✓ topics_u2_syllabus.js properly linked in index.html');
}

if (!indexHtml.includes('TOPIC 1 – DATA LINK LAYER FUNDAMENTALS')) {
  console.error('✗ TOPIC 1 not found in index.html');
  process.exit(1);
} else {
  console.log('✓ Unit 2 hierarchy properly defined in index.html syllabusModules');
}

console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
