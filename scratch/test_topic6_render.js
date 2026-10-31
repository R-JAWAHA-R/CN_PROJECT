// scratch/test_topic6_render.js
global.window = global;
global.document = {
  getElementById: () => ({ innerHTML: '', style: {} }),
  querySelectorAll: () => [],
  createElement: () => ({ className: '', style: {}, appendChild: () => {}, querySelector: () => null }),
  addEventListener: () => {}
};
global.localStorage = { getItem: () => null, setItem: () => {} };

require('../js/conceptDatabase.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');
require('../js/cleanDiagramEngine.js');
const { TOPIC_REPOSITORY, TopicPageEngine } = require('../js/topicPages.js');

const t6Slugs = [
  'ethernet',
  'u2-ethernet-architecture',
  'mac-address',
  'u2-ethernet-frame-format',
  'u2-ethernet-mac-protocol',
  'u2-ethernet-csma-cd-operation',
  'u2-binary-exponential-backoff',
  'u2-ethernet-types-evolution',
  'u2-ethernet-advantages-limitations'
];

console.log("Checking Topic 6 subtopics render output...");
t6Slugs.forEach(slug => {
  const topic = TOPIC_REPOSITORY[slug];
  if (!topic) {
    console.error(`FAIL: Topic ${slug} not found in TOPIC_REPOSITORY!`);
    process.exit(1);
  }
  const mockContainer = { innerHTML: '' };
  TopicPageEngine.renderTopicPage(slug, mockContainer);
  const html = mockContainer.innerHTML;
  
  // Check for ASCII art (+--- or |   |)
  if (/\+---+|\|   \|/.test(html)) {
    console.error(`FAIL: Found ASCII box art in ${slug}!`);
    process.exit(1);
  }

  // Check for clean diagram
  const hasCleanDiagram = html.includes('clean-diagram-card');
  // Check for image
  const hasImg = html.includes('wiki-img-box') || html.includes('<img');

  console.log(`✓ ${slug}: Title="${topic.title}", Diagrams=${hasCleanDiagram ? 'YES' : 'NO'}, Images=${hasImg ? 'YES' : 'NO'}, Size=${html.length} chars`);
});

console.log("\nChecking Topic 11 (Revision & Assessment) updates...");
['u2-numerical-problems', 'u2-short-answer-questions', 'u2-long-answer-questions', 'u2-mcqs'].forEach(slug => {
  const mockContainer = { innerHTML: '' };
  TopicPageEngine.renderTopicPage(slug, mockContainer);
  console.log(`✓ ${slug}: Rendered Size=${mockContainer.innerHTML.length} chars`);
});

console.log("\nALL TOPIC 6 CHECKS PASSED WITH FLYING COLORS!");

