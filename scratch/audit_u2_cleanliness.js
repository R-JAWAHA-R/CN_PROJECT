global.window = global;
global.document = { querySelectorAll: () => [], getElementById: () => null };
require('../js/cleanDiagramEngine.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');
const { TopicPageEngine } = require('../js/topicPages.js');

const allTopics = global.TOPIC_REPOSITORY || {};
console.log("Total topics in TOPIC_REPOSITORY:", Object.keys(allTopics).length);

const asciiTopics = [];
const missingImages = [];

for (const [id, topic] of Object.entries(allTopics)) {
  if (topic.unitId === 'unit2' || (topic.unit && topic.unit.includes('Unit 2'))) {
    const container = { innerHTML: "" };
    try {
      TopicPageEngine.renderTopicPage(id, container);
      const html = container.innerHTML;
      
      // Check for ASCII box art
      const hasAscii = html.includes('+---') || html.includes('|---') || html.includes('+===') || html.includes('|   ');
      const hasPre = html.includes('<pre class="font-mono text-xs');
      
      if (hasAscii || hasPre) {
        asciiTopics.push({ id, title: topic.title, hasAscii, hasPre });
      }
      
      const hasImg = html.includes('<img');
      if (!hasImg) {
        missingImages.push({ id, title: topic.title });
      }
    } catch (e) {
      console.error("FAIL rendering", id, e.message);
    }
  }
}

console.log("=== UNIT 2 AUDIT RESULTS ===");
console.log("Total Unit 2 topics with ASCII / <pre> diagrams:", asciiTopics.length);
asciiTopics.forEach(t => console.log(`  - [${t.id}] ${t.title} (ascii: ${t.hasAscii}, pre: ${t.hasPre})`));

console.log("Total Unit 2 topics missing images:", missingImages.length);
missingImages.slice(0, 10).forEach(t => console.log(`  - [${t.id}] ${t.title}`));
if (missingImages.length > 10) console.log(`  ... and ${missingImages.length - 10} more`);

