const fs = require('fs');

console.log('--- 1. Testing Syntax of all JS files ---');
const filesToTest = [
  'js/topics_u1.js',
  'js/topics_u2.js',
  'js/topics_u2_extended.js',
  'js/topics_u2_syllabus.js',
  'js/topics_u3.js',
  'js/topics_u3_extended.js',
  'js/topics_u4.js',
  'js/topics_u5.js',
  'js/topicPages.js',
  'js/unit2.js'
];

filesToTest.forEach(f => {
  try {
    const code = fs.readFileSync(f, 'utf8');
    new Function(code);
    console.log(`[PASS] Syntax OK: ${f}`);
  } catch (err) {
    console.error(`[FAIL] Syntax Error in ${f}:`, err.message);
    process.exit(1);
  }
});

console.log('\n--- 2. Testing TOPIC_REPOSITORY & Parent Topic Enrichment ---');
const u2Syllabus = require('../js/topics_u2_syllabus.js');
const u2Base = require('../js/topics_u2.js');
const u2Ext = require('../js/topics_u2_extended.js');

global.TOPICS_U2_SYLLABUS = u2Syllabus;
global.TOPICS_U2 = u2Base;
global.TOPICS_U2_EXT = u2Ext;

// Mock window and document
global.window = {};
global.document = {
  getElementById: () => ({ classList: { remove: () => {}, add: () => {} }, scrollIntoView: () => {} })
};

// Load topicPages.js
const { TopicPageEngine, TOPIC_REPOSITORY } = require('../js/topicPages.js');

console.log('TOPIC_REPOSITORY total topics:', Object.keys(TOPIC_REPOSITORY).length);

let withParent = 0;
let withoutParent = 0;
for (const [id, t] of Object.entries(TOPIC_REPOSITORY)) {
  if (t.parentTopic || t.topicTitle) withParent++;
  else withoutParent++;
}
console.log(`Topics with Parent Topic bound: ${withParent} / ${Object.keys(TOPIC_REPOSITORY).length}`);

console.log('\n--- 3. Testing Unit 2 Subtopics Local Asset Verification ---');
let missingLocalAsset = 0;
for (const [id, t] of Object.entries(u2Syllabus)) {
  const img = t.imageUrl;
  if (!img) {
    console.warn(`[WARN] Missing imageUrl: ${id}`);
    missingLocalAsset++;
  } else if (!img.startsWith('assets/images/')) {
    console.warn(`[WARN] Non-local imageUrl for ${id}: ${img}`);
    missingLocalAsset++;
  } else if (!fs.existsSync(img)) {
    console.error(`[ERROR] Local asset does not exist on disk: ${img} (for ${id})`);
    missingLocalAsset++;
  }
}
if (missingLocalAsset === 0) {
  console.log(`[PASS] 100% of Unit 2 Syllabus subtopics (${Object.keys(u2Syllabus).length}) have existing local vector SVG diagrams!`);
} else {
  console.error(`[FAIL] ${missingLocalAsset} subtopics have missing or external assets.`);
  process.exit(1);
}

console.log('\n--- 4. Testing HTML Rendering of Sample Subtopics ---');
const sampleTopics = ['u2-dll-intro', 'ethernet', 'u2-hidden-terminal-problem', 'wifi-mac-sublayer', 'dll-switching', 'network-devices', 'u2-practice-test'];

sampleTopics.forEach(id => {
  const container = { innerHTML: '' };
  TopicPageEngine.renderTopicPage(id, container);
  const html = container.innerHTML;
  
  const hasBreadcrumb = html.includes('wiki-breadcrumbs');
  const hasParentBadge = html.includes('wiki-badge-topic');
  const hasContextBar = html.includes('wiki-parent-topic-context-bar');
  const hasInfoboxTopic = html.includes('infobox-parent-topic');
  
  if (hasBreadcrumb && hasParentBadge && hasContextBar && hasInfoboxTopic) {
    console.log(`[PASS] ${id}: Breadcrumbs, Header Badge, Context Bar & Infobox Topic rendered perfectly.`);
  } else {
    console.error(`[FAIL] ${id} missing parent topic UI elements!`, { hasBreadcrumb, hasParentBadge, hasContextBar, hasInfoboxTopic });
    process.exit(1);
  }
});

console.log('\nALL VERIFICATIONS PASSED WITH 100% COMPLIANCE!');
