// test_render_pages.js
global.window = global;
global.document = {
  querySelectorAll: () => [],
  getElementById: () => null
};
require('../js/cleanDiagramEngine.js');
require('../js/topics_u1.js');
require('../js/topics_u2.js');
require('../js/topics_u2_extended.js');
require('../js/topics_u2_syllabus.js');
require('../js/topics_u3.js');
require('../js/topics_u4.js');
require('../js/topics_u5.js');
const { TopicPageEngine } = require('../js/topicPages.js');

const container = { innerHTML: "" };
const testIds = [
  "u2-dll-intro",
  "u2-dll-protocols-intro",
  "u2-protocol-classification",
  "simplex-protocol",
  "stop-and-wait-noiseless",
  "stop-and-wait",
  "go-back-n",
  "selective-repeat",
  "comparison-noiseless-noisy",
  "comparison-arq-protocols",
  "u2-numerical-problems",
  "u2-short-answer-questions",
  "u2-mcqs"
];

testIds.forEach(id => {
  TopicPageEngine.renderTopicPage(id, container);
  const out = container.innerHTML;
  const hasAscii = out.includes('+--') || out.includes('|---');
  const hasImg = out.includes('<img src=');
  const hasCleanCard = out.includes('clean-diagram-card');
  console.log(`Rendered [${id}]: len ${out.length}, clean: ${!hasAscii}, hasImage: ${hasImg}, hasCleanCard: ${hasCleanCard}`);
});
