// scratch/test_topic5_render.js
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

const t5Slugs = [
  'u2-collision-free-intro',
  'u2-bit-map-protocol',
  'u2-binary-countdown-protocol',
  'u2-token-passing-protocol',
  'u2-collision-free-working-principles',
  'u2-comparison-collision-free'
];

console.log("Checking Topic 5 subtopics render output...");
t5Slugs.forEach(slug => {
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

console.log("\nALL TOPIC 5 CHECKS PASSED WITH FLYING COLORS!");

