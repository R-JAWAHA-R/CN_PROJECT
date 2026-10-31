// test_topic3_render.js
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
const topic3Keys = [
  "u2-mac-sublayer-intro",
  "u2-need-for-mac-sublayer",
  "u2-mac-functions-responsibilities",
  "channel-allocation",
  "u2-fdma",
  "u2-tdma",
  "u2-dynamic-channel-allocation",
  "u2-static-vs-dynamic-channel-allocation"
];

console.log("=== Testing Topic 3 Subtopics Render ===");
topic3Keys.forEach(id => {
  TopicPageEngine.renderTopicPage(id, container);
  const out = container.innerHTML;
  const hasAscii = out.includes('+--') || out.includes('|---');
  const hasImg = out.includes('<img src=');
  const hasCleanCard = out.includes('clean-diagram-card');
  console.log(`[${id}]: len ${out.length}, clean: ${!hasAscii}, hasImage: ${hasImg}, hasCleanCard: ${hasCleanCard}`);
});

console.log("\n=== Testing Topic 11 Enrichment ===");
["u2-numerical-problems", "u2-short-answer-questions", "u2-long-answer-questions", "u2-mcqs"].forEach(id => {
  TopicPageEngine.renderTopicPage(id, container);
  const out = container.innerHTML;
  console.log(`[${id}]: len ${out.length}`);
});

