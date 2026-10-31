// scratch/test_topic4_render.js
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

const t4Slugs = [
  'u2-multiple-access-intro',
  'u2-random-access-protocols',
  'u2-pure-aloha',
  'u2-slotted-aloha',
  'u2-csma-1-persistent',
  'u2-csma-non-persistent',
  'u2-csma-p-persistent',
  'u2-csma-cd',
  'u2-csma-ca',
  'u2-comparison-multiple-access'
];

console.log("Checking Topic 4 subtopics render output...");
t4Slugs.forEach(slug => {
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

console.log("\nALL TOPIC 4 SUBTOPICS RENDERED CLEANLY WITH ZERO ASCII ART!");
