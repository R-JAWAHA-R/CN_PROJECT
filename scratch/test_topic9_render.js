// test_topic9_render.js
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
const { TopicPageEngine } = require('../js/topicPages.js');

const t9_subtopics = [
  { id: "dll-switching", title: "Introduction to Data Link Layer Switching" },
  { id: "u2-bridges-overview", title: "Bridges" },
  { id: "u2-transparent-bridges", title: "Transparent Bridges" },
  { id: "u2-learning-bridges", title: "Learning Bridges" },
  { id: "u2-bridge-learning-process", title: "Bridge Learning Process" },
  { id: "u2-forwarding-and-filtering", title: "Forwarding and Filtering" },
  { id: "u2-bridge-flooding", title: "Flooding" },
  { id: "u2-spanning-tree-protocol", title: "Spanning Tree Protocol (STP)" },
  { id: "u2-bridges-vs-switches", title: "Bridges vs Switches" }
];

console.log("=== VERIFYING TOPIC 9 SUBTOPICS ===");
let allPassed = true;

t9_subtopics.forEach((sub, idx) => {
  const container = { innerHTML: "" };
  try {
    TopicPageEngine.renderTopicPage(sub.id, container);
    const html = container.innerHTML;
    const hasAscii = html.includes('+--') || html.includes('|---') || html.includes('+===');
    const hasImg = html.includes('<img src=');
    const hasCleanCard = html.includes('clean-diagram-card');

    if (html.length < 5000 || hasAscii || !hasImg || !hasCleanCard) {
      console.error(`[FAIL] ${sub.id}: len=${html.length}, ascii=${hasAscii}, img=${hasImg}, clean=${hasCleanCard}`);
      allPassed = false;
    } else {
      console.log(`[PASS] Subtopic ${idx + 1}: "${sub.title}" (${sub.id})`);
      console.log(`       Length: ${html.length} chars | Clean Diagram: YES | Image: YES | Zero ASCII: YES`);
    }
  } catch (e) {
    console.error(`[CRASH] ${sub.id}: ${e.message}`);
    allPassed = false;
  }
});

console.log("\n=== VERIFYING TOPIC 11 REVISION & ASSESSMENT ENRICHMENT ===");
const u2 = global.TOPIC_REPOSITORY;
const shortText = u2['u2-short-answer-questions'].sections.overview;
const longText = u2['u2-long-answer-questions'].sections.overview;
const mcqCount = u2['u2-mcqs'].sections.quiz.length;

const hasQ93 = shortText.includes('Q93. Define a bridge.');
const hasQ102 = shortText.includes('Q102. What is a MAC address aging timer?');
const hasQ32 = longText.includes('Q32. Explain the working of a transparent bridge');
const hasQ37 = longText.includes('Q37. Explain how switches build and maintain MAC address tables');

console.log(`Short-Answer Questions Q93-Q102 present: ${hasQ93 && hasQ102}`);
console.log(`Long-Answer Questions Q32-Q37 present: ${hasQ32 && hasQ37}`);
console.log(`Practice MCQs total count: ${mcqCount} (Expected >= 100)`);

if (!allPassed || !hasQ93 || !hasQ102 || !hasQ32 || !hasQ37 || mcqCount < 100) {
  console.error("❌ SOME CHECKS FAILED!");
  process.exit(1);
} else {
  console.log("\n🎉 ALL CHECKS PASSED PERFECTLY FOR UNIT 2 TOPIC 9!");
}

